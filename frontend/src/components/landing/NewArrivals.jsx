import { useEffect, useState, useRef } from "react";
import { getNewArrivals } from "../../api/product.api";
import { Link, useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    checkScroll();
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center mb-5">New Arrivals</h2>

        <div className="scroll-section-wrapper">
          {canScrollLeft && (
            <button
              className="scroll-arrow scroll-arrow-left"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}

          <div
            className="arrivals-scroll-container"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="arrivals-scroll-wrapper">
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
                  <div key={product._id} className="arrival-card">
                    <div className="card border-0 text-center h-100">
                      <Link
                        to={`/product/${product.category?.name}/${product.slug}`}
                        className="product-detail-link d-block"
                      >
                        {imageToShow ? (
                          <img
                            src={imageToShow}
                            className="card-img-top"
                            alt={product.name}
                            draggable="false"
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
                      </Link>
                      <div className="card-body">
                        <h6 className="text-truncate">{product.name}</h6>
                        <p className="fw-bold text-success">₹{product.productBuyPrice}</p>
                        <button
                          className="btn btn-outline-dark btn-sm w-100"
                          onClick={() => navigate(`/product/${product.category?.name}/${product.slug}`)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {canScrollRight && (
            <button
              className="scroll-arrow scroll-arrow-right"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </div>
      </div>

      <style>{`
        .scroll-section-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .scroll-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .scroll-arrow:hover {
          background: #333;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        .scroll-arrow-left {
          left: -25px;
        }

        .scroll-arrow-right {
          right: -25px;
        }

        .arrivals-scroll-container {
          overflow-x: auto;
          overflow-y: hidden;
          padding: 10px 0;
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
          cursor: grab;
          flex: 1;
        }

        .arrivals-scroll-container.grabbing {
          cursor: grabbing;
        }

        .arrivals-scroll-container::-webkit-scrollbar {
          height: 8px;
        }

        .arrivals-scroll-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .arrivals-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }

        .arrivals-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .arrivals-scroll-wrapper {
          display: flex;
          gap: 20px;
          min-width: min-content;
        }

        .arrival-card {
          flex: 0 0 250px;
          min-width: 250px;
        }

        .arrival-card .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 1;
          filter: none;
        }

        .arrival-card .product-detail-link {
          opacity: 1;
          filter: none;
          display: block;
        }

        .arrival-card .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .arrival-card .card-img-top {
          height: 250px;
          object-fit: cover;
          border-radius: 8px 8px 0 0;
          opacity: 1;
          filter: none;
          image-rendering: high-quality;
          -webkit-image-rendering: high-quality;
          image-rendering: crisp-edges;
        }

        .arrival-card .card-body {
          padding: 15px;
        }

        .arrival-card h6 {
          font-size: 14px;
          font-weight: 600;
          margin: 10px 0;
        }

        .arrival-card p {
          margin: 5px 0;
          font-size: 16px;
        }

        @media (max-width: 992px) {
          .scroll-arrow {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .scroll-arrow-left {
            left: -20px;
          }

          .scroll-arrow-right {
            right: -20px;
          }
        }

        @media (max-width: 768px) {
          .arrival-card {
            flex: 0 0 180px;
            min-width: 180px;
          }

          .arrival-card .card-img-top {
            height: 180px;
          }

          .arrival-card h6 {
            font-size: 12px;
          }

          .scroll-arrow {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }

          .scroll-arrow-left {
            left: -18px;
          }

          .scroll-arrow-right {
            right: -18px;
          }
        }

        @media (max-width: 576px) {
          .arrival-card {
            flex: 0 0 150px;
            min-width: 150px;
          }

          .arrival-card .card-img-top {
            height: 150px;
          }

          .arrival-card .btn {
            font-size: 11px;
            padding: 5px 10px !important;
          }

          .scroll-arrow {
            width: 32px;
            height: 32px;
            font-size: 12px;
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default NewArrivals;
