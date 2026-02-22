const Products = () => {
  return (
    <div>
      <h3 className="mb-4 fw-bold">Products</h3>

      <table className="table table-bordered">
        <thead className="bg-dark text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Diamond Ring</td>
            <td>₹49,999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Products;