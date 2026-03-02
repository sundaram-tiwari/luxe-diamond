import { useEffect } from "react";
import FilterSidebar from "../../components/common/FilterSIdebar";
import ProductCard from "../../components/products/ProductCard";
import { getProducts } from "../../api/product.api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState(() => {
    const saved = localStorage.getItem("sortOption");
    return saved ? JSON.parse(saved) : "best";
  });

  const [selectedPrices, setSelectedPrices] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const res = await getProducts(category);
        setProducts(res?.data?.products || []);
        setVisibleCount(12);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, [category]);

  useEffect(() => {
    localStorage.setItem("sortOption", JSON.stringify(sortOption));
  }, [sortOption]);

  const filterProducts = products.filter((product) => {
    if (selectedPrices.length === 0) return true;

    return selectedPrices.some(
      (range) =>
        product.productBasePrice >= range.min &&
        product.productBasePrice <= range.max,
    );
  });
  const sortedProducts = [...filterProducts].sort((a, b) => {
    switch (sortOption) {
      case "low":
        return a.productBasePrice - b.productBasePrice;

      case "high":
        return b.productBasePrice - a.productBasePrice;

      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);

      case "best":
      default:
        return b.isMostSelling - a.isMostSelling;
    }
  });

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleClearAll = () => {
    setSelectedPrices([]);
    setSortOption("best");
    setVisibleCount(12);
  };

  return (
    <>
    {loading && <Loader />}
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-3 col-md-4 mb-4">
          <FilterSidebar
            sortOption={sortOption}
            setSortOption={setSortOption}
            selectedPrices={selectedPrices}
            setSelectedPrices={setSelectedPrices}
            handleClearAll={handleClearAll}
          />
        </div>

        <div className="col-lg-9 col-md-8">
          <div className="row">
            {sortedProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {visibleCount < sortedProducts.length && (
            <div className="text-center mt-4">
              <button
                className="btn btn-dark px-4 py-2"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Products;
