const FilterSidebar = () => {
  return (
    <div className="card border-0 shadow-sm p-4 filter-sidebar">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">Filters</h5>
        <button className="btn btn-link text-dark p-0 small">
          Clear All
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Sort By</h6>
        <select className="form-select">
          <option>Best Selling</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-3">Price</h6>

        {[
          "₹20,000 and below (0)",
          "₹20,000 - ₹30,000 (2)",
          "₹30,000 - ₹50,000 (10)",
          "₹50,000 - ₹75,000 (18)",
          "₹75,000 and above (23)",
        ].map((item, index) => (
          <div className="form-check mb-2" key={index}>
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label text-muted">
              {item}
            </label>
          </div>
        ))}
      </div>

      {/* Weight Range Filter */}
      <div>
        <h6 className="fw-semibold mb-3">Weight Ranges</h6>

        {[
          "0-2 g (3)",
          "2-5 g (29)",
          "5-10 g (23)",
          "10-20 g (3)",
          "20-30 g (0)",
          "> 30 g (0)",
        ].map((item, index) => (
          <div className="form-check mb-2" key={index}>
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label text-muted">
              {item}
            </label>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FilterSidebar;