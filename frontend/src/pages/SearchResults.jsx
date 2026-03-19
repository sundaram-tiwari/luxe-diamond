import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import { searchProducts } from "../api/product.api";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        setError(null);
        const response = await searchProducts(query);
        setProducts(response.data.products);
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to search products";
        setError(errorMessage);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results-page">
      {loading && <Loader />}

      <div className="container py-5">
        <h2 className="mb-4">
          Search Results for: <strong>"{query}"</strong>
        </h2>

        {error && (
          <div className="alert alert-info" role="alert">
            {error}
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="row g-4">
            {products.map((product) => {
              const media = product?.imageUrl?.[product?.defaultColor] || [];
              const productImages = media.filter(
                (url) =>
                  (url.endsWith(".webp") ||
                    url.endsWith(".jpg") ||
                    url.endsWith(".jpeg") ||
                    url.endsWith(".png")) &&
                  !url.includes("video")
              );

              const firstImage = productImages[0];

              return (
                <div key={product._id} className="col-md-6 col-lg-3">
                  <Link
                    to={`/product/${product?.category?.name}/${product?.slug}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="product-card h-100">
                      {firstImage && (
                        <img
                          src={firstImage}
                          alt={product.name}
                          className="img-fluid rounded"
                          style={{
                            height: "250px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      )}
                      <div className="product-info mt-3">
                        <h6 className="product-name text-truncate">
                          {product.name}
                        </h6>
                        <p className="product-sku text-muted small">
                          SKU: {product.productSku}
                        </p>
                        <p className="product-price fs-5 fw-bold">
                          ₹{product.productBuyPrice?.toFixed(0)}
                        </p>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-dark w-100">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="text-center py-5">
            <p className="fs-5 text-muted">No products found for "{query}"</p>
            <Link to="/product/all" className="btn btn-dark mt-3">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
