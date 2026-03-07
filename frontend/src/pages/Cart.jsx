import { useState, useEffect } from "react";
import { getCart, saveCart } from "../utils/cart";
import { Link } from "react-router-dom";
import { getCalculatedPrice } from "../api/product.api";

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => getCart());
  const [cartPrices, setCartPrices] = useState([]);
  const [openIndexes, setOpenIndexes] = useState(cartItems.map((_, i) => i));

  const updateQuantity = (index, qty) => {
    const updated = [...cartItems];
    updated[index].quantity = Number(qty);
    setCartItems(updated);
    saveCart(updated);
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    saveCart(updated);
    setOpenIndexes((prev) => prev.filter((i) => i !== index));
  };

  const subtotal = cartPrices.reduce(
    (acc, item) =>
      acc +
      ((item?.metal?.price || 0) +
        (item?.diamond?.price || 0) +
        (item?.stonePrice || 0)) *
        (item?.quantity || 1),
    0,
  );


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
        setCartPrices(res.data.items);
      } catch (error) {
        console.error("Price calculation failed", error);
      }
    };

    if (cartItems.length) fetchPrices();
  }, [cartItems]);

  return (
    <div className="container-xl">
      <div className="row p-0 m-0 justify-content-center align-items-center">
        <div className="col-12 col-xl-10">
          <div className="d-flex flex-column justify-content-center align-items-center py-5 my-4">
            <h1 className="mb-2 text-black font-semibold line-height-1.5 pt-1">
              Review your bag.
            </h1>
            <div className="text-gray-800-dark font-semibold line-height-1.5 pb-1">
              Get free shipping and free returns on all orders.
            </div>
          </div>

          <div className="divide"></div>

          {cartItems.length > 0 ? (
            <div id="cart-table" className="divide-y">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item-wrapper py-4">
                  ₹
                  {(
                    ((cartPrices[index]?.metal?.price || 0) +
                      (cartPrices[index]?.diamond?.price || 0) +
                      (cartPrices[index]?.stonePrice || 0)) *
                    (cartPrices[index]?.quantity || 1)
                  ).toFixed(0) || "Calculating..."}
                  <div className="d-flex flex-column flex-md-row align-items-start gap-4">
                    <div className="cart-product-image-wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-product-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/img/diamond.png";
                        }}
                      />
                    </div>

                    <div className="flex-grow-1 w-100">
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-2">
                        <h2 className="cart-title m-0">{item.name}</h2>

                        <div className="d-flex align-items-center gap-4">
                          <select
                            className="cart-product-qty"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(index, e.target.value)
                            }
                          >
                            {[1, 2, 3, 4, 5].map((q) => (
                              <option key={q} value={q}>
                                {q}
                              </option>
                            ))}
                          </select>

                          <div className="cart-price">
                            ₹
                            {(
                              ((cartPrices[index]?.metal?.price || 0) +
                                (cartPrices[index]?.diamond?.price || 0) +
                                (cartPrices[index]?.stonePrice || 0)) *
                              (cartPrices[index]?.quantity || 1)
                            ).toFixed(0)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 position-relative">
                        <div
                          className="spec-toggle"
                          onClick={() =>
                            setOpenIndexes((prev) =>
                              prev.includes(index)
                                ? prev.filter((i) => i !== index)
                                : [...prev, index],
                            )
                          }
                        >
                          Specifications
                          <span
                            className={`arrow ${
                              openIndexes.includes(index) ? "rotate" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </div>

                        {openIndexes.includes(index) && (
                          <div className="spec-details mt-2">
                            <div>
                              <strong>SKU:</strong> {item.productSku}
                            </div>
                            {item.size && (
                              <div>
                                <strong>Size:</strong> {item.size}
                              </div>
                            )}
                            <div>
                              <strong>Metal:</strong> {item.metal}K
                            </div>
                            <div>
                              <strong>Diamond Quality:</strong>{" "}
                              {item.diamondQuality}
                            </div>
                          </div>
                        )}

                        <div
                          className="remove-btn"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart-wrapper d-flex flex-column justify-content-center align-items-center text-center mb-5">
              <div className="empty-cart-icon mb-4">
                <img
                  src="/assets/img/diamond.png"
                  alt="Empty Cart"
                  style={{ opacity: "0.6" }}
                />
              </div>

              <h2 className="mb-3 fw-semibold text-black">Your Bag is Empty</h2>

              <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
                Looks like you haven't added anything yet. Explore our timeless
                diamond collections and find something beautiful.
              </p>

              <Link to="/product/Rings">
                <button className="btn btn-dark px-5 py-3 rounded-pill">
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}

          <div className="divide"></div>

          {cartItems.length > 0 && (
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-center py-4 my-4 gap-4">
              <div className="flex-grow-1 w-100 d-flex flex-column gap-2">
                <div className="d-flex justify-content-between text-gray-800-dark">
                  <span>Subtotal ({cartItems.length} Items)</span>
                  <span>₹{subtotal.toFixed(0)}/-</span>
                </div>

                <div className="divide my-3"></div>

                <div className="d-flex justify-content-between text-black font-semibold">
                  <h3>Total</h3>
                  <span>₹{subtotal.toFixed(0)}/-</span>
                </div>

                <div className="row m-0 p-0 justify-content-end align-items-center mt-3">
                  <Link to="/checkout">
                    <button className="btn btn-dark col-12 col-sm-6 py-3">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
