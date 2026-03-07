import { useState } from "react";

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    name: "Admin",
    email: "admin@luxediamond.com",
    phone: "",
    bio: "",
    switch: true,
    gender: "male",
    checkbox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="col-lg-6">
      <div className="card p-4 bg-light text-dark">
        <h3 className="mb-4 fw-bold">Profile</h3>

        <form onSubmit={handleSubmit}>

          <div className="form-floating w-100 mb-3">
            <input
              type="text"
              className="form-control bg-transparent"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating w-100 mb-3">
            <input
              type="email"
              className="form-control bg-transparent"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="form-floating w-100 mb-3">
            <input
              type="tel"
              className="form-control bg-transparent"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone</label>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
          </div>

          <div className="form-check form-switch mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switch"
              name="switch"
              checked={formData.switch}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="switch">
              Enable Notifications
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-lg gradient-btn text-white text-uppercase w-100 rounded-pill"
          >
            Update Profile
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminProfile;