import { useEffect, useState } from "react";
import { getNewArrivals } from "../../api/product.api";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await getNewArrivals();
        setProducts(res?.data?.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center mb-5">New Arrivals</h2>

        <div className="row g-4">
          {products.map((product) => {
            const media = product?.imageUrl?.[product?.defaultColor] || [];

            const productImages = media.filter(
              (url) =>
                (url.endsWith(".webp") ||
                  url.endsWith(".jpg") ||
                  url.endsWith(".png")) &&
                !url.includes("_Model_"),
            );
            const productVideos = media.filter((url) => url.endsWith(".mp4"));

            const imageToShow = productImages[0];
            const videoToShow = productVideos[0];

            if (!imageToShow && !videoToShow) return null;

            return (
              <div key={product._id} className="col-md-3 col-6">
                <div className="card border-0 text-center">
                  {imageToShow ? (
                    <img
                      src={imageToShow}
                      className="card-img-top"
                      alt={product.name}
                    />
                  ) : (
                    <video
                      src={videoToShow}
                      className="card-img-top"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}

                  <div className="card-body">
                    <h5>{product.name}</h5>
                    <p className="fw-bold">₹{product.productBasePrice}</p>
                    <button className="btn btn-outline-dark btn-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
