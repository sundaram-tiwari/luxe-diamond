const Users = () => {
  return (
    <div>
      <h3 className="mb-4 fw-bold">Users</h3>

      <table className="table table-bordered">
        <thead className="bg-dark text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Aditi Sharma</td>
            <td>aditi@email.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;