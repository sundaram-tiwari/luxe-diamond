const Dashboard = () => {
  return (
    <div>
      <h3 className="mb-4 fw-bold">Dashboard</h3>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="p-4 bg-light border text-center">
            <h6>Total Users</h6>
            <h2>120</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 bg-light border text-center">
            <h6>Total Products</h6>
            <h2>45</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 bg-light border text-center">
            <h6>Total Orders</h6>
            <h2>230</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;