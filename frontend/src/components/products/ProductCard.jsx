import { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../utils/cart";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  let selectedColor = product.defaultColor;
  let selectedSize = product.defaultSize;
  let selectedVideo = null;

  if (product?.imageUrl) {
    for (const colorKey of Object.keys(product.imageUrl)) {
      const colorMedia = product.imageUrl[colorKey];

      const foundVideo =
        product?.videoUrl?.[colorKey] ||
        colorMedia?.find((url) => url.endsWith(".mp4"));

      if (foundVideo) {
        selectedColor = colorKey;
        selectedVideo = foundVideo;
        break;
      }
    }
  }
  const media = product?.imageUrl?.[selectedColor] || [];

  const images = media.filter(
    (url) =>
      (url.endsWith(".webp") || url.endsWith(".jpg") || url.endsWith(".png")) &&
      !url.includes("_Model_"),
  );

  const mainImage = images[0];
  const hoverImage = images[1] || images[0];
  return (
    <div className="col-6 col-lg-4 col-xl-3 p-1 p-md-2 m-0">
      <div
        className="product-card h-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="image-wrapper position-relative">
          <Link
            to={`/product/${product.category?.name}/${product.slug}`}
            className="product-detail-link d-block"
          >
            {isHovered && selectedVideo ? (
              <video
                className="w-100 product-main-image"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={selectedVideo} type="video/mp4" />
              </video>
            ) : (
              <img
                src={isHovered ? hoverImage : mainImage}
                alt={product.name}
                className="w-100 product-main-image"
              />
            )}
          </Link>
        </div>

        <div className="product-content text-center">
          <div className="colors">
            {product.color?.map((color, i) => (
              <span key={i} className={`${color}-color color-dot`} />
            ))}
          </div>

          <Link
            to={`/product/${product.category?.name}/${product.slug}`}
            className="product-name"
          >
            {product.name}
          </Link>

          <div className="product-price">₹ {product.productBasePrice}</div>

          <div className="add-to-bag-box">
            <Link
              to={`/product/${product.category?.name}/${product.slug}`}
              className="add-to-bag"
            >
              Add to Cart
            </Link>

            <div className="vertical-divide"></div>

            {product.whatsappLink && (
              <a
                href={product.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp text-black"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
