import React, { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { getCalculatedPrice } from "../api/product.api";

const Checkout = () => {
  const [cartItems] = useState(() => getCart());
  const [priceData, setPriceData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

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

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const payload = {
          items: cartItems.map((item) => ({
            productSku: item.productSku,
            metal: item.metal,
            diamondQuality: item.diamondQuality,
            size: item.size ? Number(item.size) : 12,
            quantity: item.qty ? Number(item.qty) : 1,
          })),
        };

        const res = await getCalculatedPrice(payload);

        setPriceData(res.data.items);
        setCartTotal(res.data.cartTotal);
      } catch (error) {
        console.log("Price calculation failed", error);
      }
    };

    if (cartItems.length) fetchPrices();
  }, [cartItems]);

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-light container py-5">
      <div className="row">
        <div className="col-lg-7 mb-4">
          <h4 className="mb-3">Where should we send your order?</h4>

          <div className="bg-white border rounded-3 p-3">
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control bg-light"
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
                  className="form-control bg-light"
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
                  className="form-control bg-light"
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
                  className="form-control bg-light"
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
                  className="form-control bg-light"
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
                  className="form-control bg-light"
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
                  className="form-control bg-light"
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
                  className="form-control bg-light"
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
            {priceData.map((item) => {
              const cartItem = cartItems.find(
                (p) => p.productSku === item.productSku,
              );

              return (
                <div key={item.productSku} className="d-flex mb-4">
                  <div className="cart-image-wrapper position-relative me-3 mt-2">
                    <div className="cart-image-wrapper">
                      <img src={cartItem?.image} alt={item.name} />
                      <div className="item-qty">{item.quantity}</div>
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">{item.name}</span>
                      <span>₹ {item.unitPrice.toLocaleString()}</span>
                    </div>

                    <div className="small text-muted mt-1">
                      <div>
                        <strong>Metal:</strong> {item.metal}K Gold
                      </div>

                      <div>
                        <strong>Color:</strong> {cartItem?.color}
                      </div>

                      <div>
                        <strong>Diamond Quality:</strong>{" "}
                        {item.diamondQuality.replace("_", " ")}
                      </div>

                      <div>
                        <strong>Size:</strong> {item.size}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white border rounded-3 p-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Cart Subtotal</span>
              <span>₹ {cartTotal}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>₹ {cartTotal}</span>
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
