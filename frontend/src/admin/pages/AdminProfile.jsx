import { useState } from "react";

const Profile = () => {
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
          
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control bg-tranparent"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone</label>
          </div>

          {/* <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Enter your bio"
              id="bio"
              name="bio"
              style={{ height: "100px" }}
              value={formData.bio}
              onChange={handleChange}
            />
            <label htmlFor="bio">Bio</label>
          </div> */}

          {/* Checkbox */}
          {/* <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkbox"
              name="checkbox"
              checked={formData.checkbox}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="checkbox">
              Default checkbox
            </label>
          </div> */}

          {/* Radio */}
          <div className="mb-3">
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

          {/* Switch */}
          <div className="form-check form-switch mb-3">
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
              Enable notifications
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-lg btn-dark text-uppercase w-100 rounded-3 fw-bold"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile;