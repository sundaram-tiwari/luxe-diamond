import { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Admin",
    email: "admin@luxediamond.com",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="container-fluid">
      <h3 className="fw-bold mb-4">Admin Profile</h3>

      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Change Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-dark">
            Update Profile
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile;