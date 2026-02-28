import { useEffect } from "react";
import FilterSidebar from "../../components/common/FilterSIdebar";
import ProductCard from "../../components/products/ProductCard";
import { getProducts } from "../../api/product.api";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const {category} = useParams();
   const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchNewArrivals = async () => {
        try {
          const res = await getProducts(category);
          setProducts(res?.data?.products);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchNewArrivals();
    }, [category]);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-3 col-md-4 mb-4">
          <FilterSidebar />
        </div>

        <div className="col-lg-9 col-md-8">
          <div className="row">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;