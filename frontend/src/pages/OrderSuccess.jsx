import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h3>No order found</h3>
        <Link to="/" className="btn btn-dark mt-3">
          Go Home
        </Link>
      </div>
    );
  }

  const subtotal = order.items.reduce(
    (sum, item) =>
      sum +
      (item.metal.price + item.diamond.price + item.stonePrice) * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">

          <div className="text-center mb-5">
            <img
              src="/assets/img/thankyou.png"
              alt="success"
              style={{ width: "120px" }}
              className="mb-3"
            />

            <h4 className="fw-bold">Thank you! Your order has been received.</h4>

            <div className="mt-3">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ₹{order.orderTotal}</p>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="fw-bold text-uppercase mb-3">Order Details</h4>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items.map((item) => {
                    const price =
                      (item.metal.price +
                        item.diamond.price +
                        item.stonePrice) *
                      item.quantity;

                    return (
                      <tr key={item.productSku}>
                        <td>
                          <div className="d-flex flex-column">
                            <strong>{item.name}</strong>
                            <small>SKU: {item.productSku}</small>
                            <small>Size: {item.size}</small>
                          </div>
                        </td>

                        <td className="text-end">
                          ₹{price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr>
                    <td className="fw-bold">Subtotal</td>
                    <td className="text-end">₹{subtotal}</td>
                  </tr>

                  <tr>
                    <td className="fw-bold">Total</td>
                    <td className="text-end fw-bold">
                      ₹{order.orderTotal}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Shipping Details</h5>

                  <p><strong>Name:</strong> {order.address.receiverName}</p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {order.address.addressLine1}, {order.address.city}
                  </p>
                  <p><strong>State:</strong> {order.address.state}</p>
                  <p><strong>Pincode:</strong> {order.address.pincode}</p>
                  <p><strong>Phone:</strong> {order.address.phone}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 bg-light">
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <p className="fw-bold mb-2">
                    Need help? Call our customer service
                  </p>
                  <h5 className="fw-bold">9000000000</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/" className="btn btn-dark px-4">
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;