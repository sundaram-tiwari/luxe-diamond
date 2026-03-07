import { useState } from "react";

const Profile = () => {

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main>
      <div className="profile-wrapper">
        <div className="container">
          <div className="row justify-content-center">

            <div className="col-lg-10">
              <div className="profile-inner">
                <div className="row gy-3">

                  <div className="col-12">
                    <div className="profile-avatar text-center">
                      <label htmlFor="avatar">
                        <input type="file" className="d-none" id="avatar"/>
                        <img
                          src="/assets/img/avatar.png"
                          alt="avatar"
                          className="img-fluid"
                        />
                      </label>
                      <h6>{profile.firstName || "User Name"}</h6>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-transparent"
                        name="firstName"
                        placeholder="First Name"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                      />
                      <label>First Name</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-transparent"
                        name="lastName"
                        placeholder="Last Name"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                      />
                      <label>Last Name</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control bg-transparent"
                        name="email"
                        placeholder="Email"
                        value={profile.email}
                        onChange={handleProfileChange}
                      />
                      <label>Email</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-transparent"
                        name="phone"
                        placeholder="Phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                      />
                      <label>Phone</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control bg-transparent"
                        name="password"
                        placeholder="Password"
                        value={profile.password}
                        onChange={handleProfileChange}
                      />
                      <label>Password</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control bg-transparent"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={profile.confirmPassword}
                        onChange={handleProfileChange}
                      />
                      <label>Confirm Password</label>
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    <button className="btn primary-btn">
                      Save Change
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Shipping Address */}
      <div className="pb-5 pt-3">
        <div className="container">

          <h4 className="mb-3 text-center">SHIPPING ADDRESS</h4>

          <div className="row justify-content-center">
            <div className="col-lg-8">

              <div className="row gy-3">

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="firstName"
                      placeholder="First Name"
                      value={shipping.firstName}
                      onChange={handleShippingChange}
                    />
                    <label>First Name</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="lastName"
                      placeholder="Last Name"
                      value={shipping.lastName}
                      onChange={handleShippingChange}
                    />
                    <label>Last Name</label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="address"
                      placeholder="Address"
                      value={shipping.address}
                      onChange={handleShippingChange}
                    />
                    <label>Address</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="city"
                      placeholder="City"
                      value={shipping.city}
                      onChange={handleShippingChange}
                    />
                    <label>City</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="state"
                      placeholder="State"
                      value={shipping.state}
                      onChange={handleShippingChange}
                    />
                    <label>State</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="zip"
                      placeholder="ZIP"
                      value={shipping.zip}
                      onChange={handleShippingChange}
                    />
                    <label>ZIP Code</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="phone"
                      placeholder="Phone"
                      value={shipping.phone}
                      onChange={handleShippingChange}
                    />
                    <label>Phone</label>
                  </div>
                </div>

                <div className="col-12">
                  <button className="btn primary-btn w-100">
                    Save Shipping Address
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </main>
  );
};

export default Profile;