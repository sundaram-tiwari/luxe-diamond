const priceRanges = [
  { label: "₹20,000 and below", min: 0, max: 20000 },
  { label: "₹20,000 - ₹30,000", min: 20000, max: 30000 },
  { label: "₹30,000 - ₹50,000", min: 30000, max: 50000 },
  { label: "₹50,000 - ₹75,000", min: 50000, max: 75000 },
  { label: "₹75,000 and above", min: 75000, max: Infinity },
];
const FilterSidebar = ({
  sortOption,
  setSortOption,
  selectedPrices,
  setSelectedPrices,
  handleClearAll
}) => {
  const handlePriceChange = (range) => {
    const exists = selectedPrices.find(
      (r) => r.min === range.min && r.max === range.max,
    );

    if (exists) {
      setSelectedPrices(
        selectedPrices.filter(
          (r) => r.min !== range.min || r.max !== range.max,
        ),
      );
    } else {
      setSelectedPrices([...selectedPrices, range]);
    }
  };
  return (
    <div className="card border-0 shadow-sm p-4 filter-sidebar">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">Filters</h5>
        <button className="btn btn-link text-dark p-0 small" onClick={handleClearAll}>Clear All</button>
      </div>

      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Sort By</h6>
        <select
          className="form-select bg-light"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="best">Best Selling</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      <div className="mb-4">
        <h6 className="fw-semibold mb-3">Price</h6>

        {priceRanges.map((range, index) => (
          <div className="form-check mb-2" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedPrices.some(
                (r) => r.min === range.min && r.max === range.max,
              )}
              onChange={() => handlePriceChange(range)}
            />
            <label className="form-check-label text-muted">{range.label}</label>
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
            <label className="form-check-label text-muted">{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
