import { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/product.api";

export default function CsvDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res?.data?.products || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = products.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table text-dark fs-14">
          <thead className="table-dark">
            <tr>
              <th>Sr No</th>
              <th>Product SKU</th>
              <th>Name</th>
              <th>Category</th>
              <th>Material</th>
              <th>Gold 18k</th>
              <th>Gold 14k</th>
              <th>Making Charges</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              currentRows.map((row, index) => (
                <tr key={index}>
                  <th>{indexOfFirstRow + index + 1}</th>
                  <td>{row.productSku || "-"}</td>
                  <td>{row.name || "-"}</td>
                  <td>{row.category.name || "-"}</td>
                  <td>{row.material || "-"}</td>
                  <td>{row.goldWeight18k || "-"}</td>
                  <td>{row.goldWeight14k || "-"}</td>
                  <td>{row.makingCharges || "-"}</td>
                  <td>{row.quantity || "-"}</td>
                  <td>{row.active ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="cursor-pointer fa-solid fa-trash bg-transparent border-0"
                    >
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center fw-bold" colSpan="5">
                  no data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {products.length > 0 && totalPages > 1 && (
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
}
