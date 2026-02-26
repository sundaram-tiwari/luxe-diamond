import { useEffect } from "react";
import FilterSidebar from "../../components/common/FilterSIdebar";
import ProductCard from "../../components/products/ProductCard";
import { getProducts } from "../../api/product.api";
import { useState } from "react";

const Products = () => {
   const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchNewArrivals = async () => {
        try {
          const res = await getProducts();
          setProducts(res?.data?.products);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchNewArrivals();
    }, []);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-3 col-md-4 mb-4">
          <FilterSidebar />
        </div>

        <div className="col-lg-9 col-md-8">
          <div className="row">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
