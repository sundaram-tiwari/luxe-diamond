import { useState } from "react";

export default function CsvDataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const hasData = data && data.length > 0;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table text-dark fs-14">
          <thead className="table-dark">
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Name</th>
              <th scope="col">Active</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">UpdatedAt</th>
            </tr>
          </thead>

          <tbody>
            {hasData ? (
              currentRows.map((row, index) => (
                <tr key={index}>
                  <th scope="row">{indexOfFirstRow + index + 1}</th>
                  <td>{row.name || "-"}</td>
                  <td>{row.active ? "Yes" : "No"}</td>
                  <td>{row.createdAt || "-"}</td>
                  <td>{row.updatedAt || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center text-uppercase fw-bold text-dark"
                  colSpan="5"
                >
                  no data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasData && totalPages > 1 && (
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
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
                disabled={currentPage === totalPages}
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
