import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/admin.api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res?.data?.orders || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = orders.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="table-responsive">

        <div>
          <h3 className="mb-4 fw-bold">Orders</h3>
        </div>

        <table className="table text-dark fs-14">

          <thead className="table-dark">
            <tr>
              <th>Sr No</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>City</th>
              <th>Total Items</th>
              <th>Products</th>
              <th>Order Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              currentRows.map((order, index) => (
                <tr key={order._id}>

                  <td>{indexOfFirstRow + index + 1}</td>

                  <td>{order._id}</td>

                  <td>{order?.address?.receiverName || "-"}</td>

                  <td>{order?.address?.phone || "-"}</td>

                  <td>{order?.address?.city || "-"}</td>

                  <td>{order?.items?.length}</td>

                  <td>
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.name} (x{item.quantity})
                      </div>
                    ))}
                  </td>

                  <td>₹{order.orderTotal?.toFixed(2)}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center fw-bold" colSpan="8">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}

      {orders.length > 0 && totalPages > 1 && (
        <nav>
          <ul className="pagination">

            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className={`page-link ${
                    currentPage === index + 1
                      ? "bg-dark text-white border-dark"
                      : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
      )}
    </>
  );
};

export default Orders;