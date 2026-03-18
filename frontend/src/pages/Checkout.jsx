import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { getCalculatedPrice } from "../api/product.api";
import { createOrder } from "../api/order.api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems] = useState(() => getCart());
  const [priceData, setPriceData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [billing, setBilling] = useState({
    receiverName: "",
    email: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const gstRate = 0.03;
  const basePrice = cartTotal / (1 + gstRate);
  const gstAmount = cartTotal - basePrice;

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
        setCartTotal(res.data.cartTotal); // includes GST
      } catch (error) {
        console.log("Price calculation failed", error);
      }
    };

    if (cartItems.length) fetchPrices();
  }, [cartItems]);

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!billing.receiverName || !billing.phone || !billing.address) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        items: cartItems.map((item) => ({
          productSku: item.productSku,
          metal: item.metal,
          diamondQuality: item.diamondQuality,
          size: item.size ? Number(item.size) : 12,
          quantity: item.qty ? Number(item.qty) : 1,
        })),

        address: {
          receiverName: billing.receiverName,
          phone: billing.phone,
          addressLine1: billing.address,
          city: billing.city,
          state: billing.state,
          pincode: billing.pincode,
        },
      };

      const res = await createOrder(payload);

      localStorage.removeItem("cart");
      alert("Order created successfully");

      navigate("/order-success", {
        state: {
          order: res.data,
        },
      });
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light container py-5">
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-lg-7 mb-4">
          <h4 className="mb-3">Where should we send your order?</h4>

          <div className="bg-white border rounded-3 p-3">
            <div className="row">
              {[
                { label: "Receiver Name", name: "receiverName" },
                { label: "Email", name: "email" },
                { label: "Address", name: "address" },
                { label: "State", name: "state" },
                { label: "City", name: "city" },
                { label: "Pincode", name: "pincode" },
                { label: "Mobile No.", name: "phone" },
              ].map((field, index) => (
                <div key={index} className="col-12 mb-3">
                  <label className="form-label">{field.label}</label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    name={field.name}
                    value={billing[field.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn btn-dark w-100 mt-4 py-2"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>

        <div className="col-lg-5">
          <div className="bg-white border rounded-3 p-3 mb-4 mt-5">
            {priceData.map((item) => {
              const cartItem = cartItems.find(
                (p) => p.productSku === item.productSku
              );

              const itemPrice =
                (item?.metal?.price || 0) +
                (item?.diamond?.price || 0) +
                (item?.makingPrice || 999) +
                (item?.stonePrice || 0);

              return (
                <div key={item.productSku} className="d-flex mb-4">
                  <img
                    src={cartItem?.image}
                    alt={item.name}
                    width="70"
                    className="me-3"
                  />

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span>{item.name}</span>
                      <span>
                        ₹ {itemPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="small text-muted">
                      <div>Metal: {item?.metal?.quality}K Gold</div>
                      <div>Color: {cartItem?.color}</div>
                      <div>
                        Diamond:{" "}
                        {item?.diamond?.type?.replace("_", " ") || "N/A"}
                      </div>
                      <div>Size: {item.size}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white border rounded-3 p-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal (Excl. GST)</span>
              <span>
                ₹ {basePrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>GST (3%)</span>
              <span>
                ₹ {gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total (Incl. GST)</span>
              <span>
                ₹ {cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;