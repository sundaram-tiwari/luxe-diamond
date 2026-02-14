import { products } from "../../data/dummyData";

const BestSellers = () => {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">
          Best Sellers
        </h2>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 col-6">
              <div className="card border-0 text-center">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5>{product.name}</h5>
                  <p className="fw-bold">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <button className="btn btn-dark btn-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
