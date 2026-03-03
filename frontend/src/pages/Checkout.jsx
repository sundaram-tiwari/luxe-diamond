import React, { useState } from "react";
import { getCart } from "../utils/cart";

const Checkout = () => {
  const [cartItems] = useState(() => getCart());

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-light container py-5">
      <div className="row">
        <div className="col-lg-7 mb-4">
          <h4 className="mb-3">Where should we send your order?</h4>

          <div className=" bg-light bg-white border rounded-3 p-3">
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  value={billing.firstName}
                  onChange={handleChange}
                  />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  name="lastName"
                  value={billing.lastName}
                  onChange={handleChange}
                  />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  name="email"
                  value={billing.email}
                  onChange={handleChange}
                  />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="form-control"
                  name="address"
                  value={billing.address}
                  onChange={handleChange}
                  />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  placeholder="State"
                  className="form-control"
                  name="state"
                  value={billing.state}
                  onChange={handleChange}
                  />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="form-control"
                  name="city"
                  value={billing.city}
                  onChange={handleChange}
                  />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Pincode / ZIP</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  className="form-control"
                  name="pincode"
                  value={billing.pincode}
                  onChange={handleChange}
                  />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Mobile No.</label>
                <input
                  type="text"
                  placeholder="Mobile No."
                  className="form-control"
                  name="phone"
                  value={billing.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button className="btn btn-dark w-100 mt-4 py-2">
            Proceed to Payment
          </button>
        </div>

        <div className="col-lg-5">
          <div className="bg-white border rounded-3 p-3 mb-4 mt-5">
            {cartItems.map((item) => (
              <div key={item.id} className="d-flex mb-4">
                <div className="position-relative me-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="80"
                    className="rounded"
                  />
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-dark rounded-pill">
                    {item.qty}
                  </span>
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <span className="fw-medium">{item.name}</span>
                    <span>₹ {item.price}</span>
                  </div>

                  <div className="small text-muted mt-1">
                    <div>
                      <strong>Metal:</strong> {item.metal}
                    </div>
                    <div>
                      <strong>Color:</strong> {item.color}
                    </div>
                    <div>
                      <strong>Diamond Quality:</strong> {item.diamondQuality}
                    </div>
                    <div>
                      <strong>Size:</strong> {item.size}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="bg-white border rounded-3 p-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Cart Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>₹ {subtotal}</span>
            </div>
          </div>

          <div className="row mt-4 text-center">
            <h5 className="col-12 text-uppercase fw-normal mb-4">
              LUX DIAMOND PROMISE
            </h5>

            <div className="col-6 col-sm-3 mb-4">
              <div className="d-flex flex-column align-items-center">
                <img
                  src="/assets/img/promise_1.webp"
                  alt="Free Shipping"
                  className="mb-3"
                  width="60"
                />
                <div className="small">
                  Free Shipping <br /> Pan India
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-3 mb-4">
              <div className="d-flex flex-column align-items-center">
                <img
                  src="/assets/img/promise_3.webp"
                  alt="Certified Jewellery"
                  className="mb-3"
                  width="60"
                />
                <div className="small">
                  100% Certified <br /> Jewellery
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-3 mb-4">
              <div className="d-flex flex-column align-items-center">
                <img
                  src="/assets/img/promise_2.webp"
                  alt="15 Day Return"
                  className="mb-3"
                  width="60"
                />
                <div className="small">
                  Free 15 Day <br /> Return
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-3 mb-4">
              <div className="d-flex flex-column align-items-center">
                <img
                  src="/assets/img/promise_4.webp"
                  alt="Lifetime Exchange"
                  className="mb-3"
                  width="60"
                />
                <div className="small">
                  Lifetime Exchange <br /> & Buybacks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
