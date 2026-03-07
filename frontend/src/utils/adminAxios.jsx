import axios from "axios";

const adminAxios = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((req) => {
    if (error) {
      req.reject(error);
    } else {
      req.resolve(token);
    }
  });

  failedQueue = [];
};

adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle refresh token
adminAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh-token")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return adminAxios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await adminAxios.post("/auth/refresh-token");

        const newAccessToken = res.data.data.accessToken;

        localStorage.setItem("adminToken", newAccessToken);

        adminAxios.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;

        processQueue(null, newAccessToken);

        return adminAxios(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default adminAxios;