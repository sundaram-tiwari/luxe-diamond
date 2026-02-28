import { useEffect } from "react";
import { useState } from "react";
import { getAllUsers } from "../../api/admin.api";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res?.data?.users || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="table-responsive">
         <div>
          <h3 className="mb-4 fw-bold">Users</h3>
        </div>
        <table className="table text-dark fs-14">
          <thead className="table-dark">
            <tr>
              <th>Sr No</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Email Verification</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              currentRows.map((row, index) => (
                <tr key={index}>
                  <th>{indexOfFirstRow + index + 1}</th>
                  <td>{row.firstName || "-"}</td>
                  <td>{row.lastName || "-"}</td>
                  <td>{row.email || "-"}</td>
                  <td>{row.phone || "-"}</td>
                  <td>{row.isEmailVerified? "Done" : "Pending"}</td>
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

      {users.length > 0 && totalPages > 1 && (
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

export default Users;
