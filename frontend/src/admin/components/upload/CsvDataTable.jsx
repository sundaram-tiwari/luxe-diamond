import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../../api/admin.api";

export default function CsvDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const rowsPerPage = 15;

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

  const pagesToShow = 5;

  const startPage =
    Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;

  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductDelete = async (productSku) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(productSku);

      alert("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p.productSku !== productSku));
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
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
                      className="fa-solid fa-trash text-danger bg-transparent border-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProductDelete(row.productSku)}
                    ></button>
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

            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button
                  className={`page-link ${
                    currentPage === page ? "bg-dark text-white border-dark" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            {endPage < totalPages && (
              <>
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>

                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </li>
              </>
            )}

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
