import { useEffect, useState } from "react";
import { getUserProfile, updateUserAddress, updateUserProfile } from "../../api/user.api";
import Loader from "../../components/common/Loader";

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
  });

  const [shipping, setShipping] = useState({
    receiverName: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    country: "",
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        const res = await getUserProfile();
        const user = res.data.user;

        setProfile(user);

        if (user.addresses && user.addresses.length > 0) {
          setShipping(user.addresses[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const updateProfileHandler = async () => {
    try {
      setLoading(true);

      const res = await updateUserProfile(profile);
      const user = res.data.user;

      setProfile(user);

      if (user.addresses && user.addresses.length > 0) {
        setShipping(user.addresses[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateAddressHandler = async () => {
    try {
      setLoading(true);

      const res = await updateUserAddress(shipping);
      const address = res.data.address;

      setShipping(address);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      {loading && <Loader />}

      <div className="profile-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="profile-inner">
                <div className="row gy-3">
                  <div className="col-12">
                    <div className="profile-avatar text-center">
                      <label htmlFor="avatar">
                        <input type="file" className="d-none" id="avatar" />
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
                        name="newPassword"
                        placeholder="New Password"
                        value={profile.newPassword}
                        onChange={handleProfileChange}
                      />
                      <label>New Password</label>
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    <button className="btn primary-btn" onClick={()=> updateProfileHandler()}>Save Change</button>
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
                      name="receiverName"
                      placeholder="Receiver Name"
                      value={shipping.receiverName}
                      onChange={handleShippingChange}
                    />
                    <label>Receiver Name</label>
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

                {/* <div className="col-md-6">
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
                </div> */}

                <div className="col-12">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="addressLine1"
                      placeholder="Address"
                      value={shipping.addressLine1}
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
                      name="pincode"
                      placeholder="PINCODE"
                      value={shipping.pincode}
                      onChange={handleShippingChange}
                    />
                    <label>PINCODE Code</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      className="form-control bg-transparent"
                      name="country"
                      placeholder="Country"
                      value={shipping.country}
                      onChange={handleShippingChange}
                    />
                    <label>Country</label>
                  </div>
                </div>

                <div className="col-12">
                  <button className="btn primary-btn w-100" onClick={()=> updateAddressHandler()}>
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
