import { useState, useEffect } from "react";
import { getCategory } from "../../api/product.api";
import { Link } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategory();
        setCategory(res?.data?.category || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <section className="category-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">Shop By Category</h2>

        <div className="row">
          {category.map((cat) => (
            <Link
            key={cat._id}
              to={`/product/${cat.name}`}
              className="product-detail-link d-block col-md-4 col-12 "
            >
              <div>
                <div className="category-card text-center">
                  <div className="video-wrapper">
                    <video
                      src={cat.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                  </div>

                  <h5 className="mt-3 category-name">{cat.name}</h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
