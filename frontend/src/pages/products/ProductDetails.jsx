import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../api/product.api";
import Loader from "../../components/common/Loader";
import { addToCart } from "../../utils/cart";

export default function ProductDetails() {
  const { category, productSlug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("14");
  const [selectedDiamond, setSelectedDiamond] = useState("IJ-SI");
  const [selectedSize, setSelectedSize] = useState("12");
  const [isSizeOpen, setIsSizeOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductDetails(category, productSlug);
        const data = res.data.product;

        setProduct(data);
        setSelectedColor(data.defaultColor);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, productSlug]);

  if (loading) return <Loader />;
  if (!product) return null;

  const rawMedia = product.imageUrl?.[selectedColor] || [];

  const isVideo = (file) => file?.endsWith(".mp4");

  const videos = rawMedia.filter((file) => isVideo(file));

  const modelImages = rawMedia.filter((file) => file.includes("_Model_"));

  const normalImages = rawMedia.filter(
    (file) => !isVideo(file) && !file.includes("_Model_"),
  );

  const mediaList = [...videos, ...normalImages, ...modelImages];

  const goldWeight =
    selectedMetal === "14"
      ? product.goldWeight14k
      : selectedMetal === "18"
        ? product.goldWeight18k
        : product.goldWeight22k;

  const goldPricePerGram =
    selectedMetal === "14" ? 6000 : selectedMetal === "18" ? 7500 : 9000;

  const goldTotal = goldWeight * goldPricePerGram;
  const diamondTotal = product.diamond.carat * 80000;
  const making = product.makingCharges;

  const subtotal = goldTotal + diamondTotal + making;
  const gst = subtotal * 0.03;
  const total = subtotal + gst;

  return (
    <div className="container py-5 d-flex flex flex-column flex-lg-row justify-content-center align-items-start gap-4 position-relative">
      <div className="row gx-lg-5">
        <div className="col-lg-8">
          <div className="row g-4">
            {mediaList.map((media, index) => (
              <div key={index} className="col-6">
                {isVideo(media) ? (
                  <video
                    src={media}
                    autoPlay
                    muted
                    loop
                    className="w-100 rounded object-fit-cover product-media"
                  />
                ) : (
                  <img
                    src={media}
                    alt={product.name}
                    className="w-100 rounded object-fit-cover product-media"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <h1 className="font-cormorant-sc text-black font-medium text-lg text-lg-2xl text-xl-3xl">
            {product.name}
          </h1>

          <div className="d-none d-lg-block text-muted small mb-5">
            {product.description}
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <h4 className="fw-bold">₹{total.toFixed(0)}</h4>
            <del className="text-muted">₹{(total * 1.05).toFixed(0)}</del>
            <span className="fw-bold text-success">
              You save ₹{(total * 0.05).toFixed(0)}
            </span>
          </div>

          <div className="border rounded-3 p-4 mb-4">
            <div className="w-100 mb-4">
              <div className="d-flex align-items-center pb-2">
                <div className="text-label me-3">Metal</div>
              </div>

              <div className="d-flex gap-3 overflow-auto scrollbar-none">
                {["14", "18", "22"].map((crt) => (
                  <label key={crt} className="custom-check-label">
                    <input
                      type="radio"
                      className="custom-check"
                      name="metalQuality"
                      value={crt}
                      checked={selectedMetal === crt}
                      onChange={() => setSelectedMetal(crt)}
                    />
                    <div>{crt}K Gold</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="w-100 mb-4">
              <div className="d-flex align-items-center pb-2">
                <div className="text-label me-3">Metal Color</div>
              </div>

              <div className="d-flex gap-3 overflow-auto scrollbar-none">
                {product.color.map((color) => (
                  <label key={color} className="custom-check-label">
                    <input
                      type="radio"
                      className="custom-check"
                      name="metalColor"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                    />

                    <div className="d-flex flex-column align-items-center gap-1 text-capitalize">
                      <span className={`color-circle ${color}`} />
                      {color}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="w-100 mb-4">
              <div className="d-flex align-items-center pb-2">
                <div className="text-label me-3">Diamond Quality</div>
              </div>

              <div className="d-flex gap-3 overflow-auto scrollbar-none">
                {["IJ-SI", "GH-SI", "GH-VS", "EF-VVS"].map((quality) => (
                  <label key={quality} className="custom-check-label">
                    <input
                      type="radio"
                      className="custom-check"
                      name="diamondQuality"
                      value={quality}
                      checked={selectedDiamond === quality}
                      onChange={() => setSelectedDiamond(quality)}
                    />
                    <div>{quality}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="size-dropdown position-relative">
              <label
                className="size-dropdown-check-label px-4 mb-2 d-flex justify-content-between align-items-center"
                onClick={() => setIsSizeOpen(!isSizeOpen)}
              >
                <div className="selected-size-text">{selectedSize}</div>

                <svg
                  className={`toggle ${isSizeOpen ? "rotate" : ""}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>

              {isSizeOpen && (
                <div className="dropdown shadow-sm">
                  <div className="dropdown-body">
                    {Array.from({ length: 20 }, (_, i) => 8 + i).map((size) => (
                      <label key={size} className="custom-check-label px-4">
                        <input
                          type="radio"
                          className="custom-check"
                          name="size"
                          value={size}
                          checked={selectedSize === size.toString()}
                          onChange={() => {
                            setSelectedSize(size.toString());
                            setIsSizeOpen(false);
                          }}
                        />
                        <div>{size}</div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="d-flex gap-2 mb-4">
            <button
              className="btn btn-dark w-100 py-2"
              onClick={() => {
                 addToCart(product, selectedColor, selectedSize);
                alert("Added to cart"); 
              }}
            >
              Add to Cart
            </button>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://api.whatsapp.com/send?text=Hi! I need info about ${product.name}`}
              className="btn btn-success"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>

          <div className="border rounded-3 p-4">
            <h6 className="mb-3">Price Breakup</h6>

            <div className="d-flex justify-content-between">
              <span>
                {selectedMetal}K Gold ({goldWeight} gm)
              </span>
              <span>₹{goldTotal.toFixed(0)}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Natural Diamonds ({product.diamond.carat} Ct)</span>
              <span>₹{diamondTotal.toFixed(0)}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Making Charges</span>
              <span>₹{making}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>GST (3%)</span>
              <span>₹{gst.toFixed(0)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   if (!product) return null;

//   const defaultColor = product.defaultColor;

//   const media = product?.imageUrl?.[defaultColor] || [];

//   const images = media.filter(
//     (url) =>
//       (url.endsWith(".webp") ||
//         url.endsWith(".jpg") ||
//         url.endsWith(".png")) &&
//       !url.includes("_Model_")
//   );

//   const video =
//     product?.videoUrl?.[defaultColor] ||
//     media.find((url) => url.endsWith(".mp4"));

//   const imageToShow = images[activeIndex] || images[0];

//   const productUrl = `/product/${product.category?.name}/${product.slug}`;

//   return (
//     <div className="col-6 col-lg-4 col-xl-3 p-1 p-md-2 m-0">
//       <div className="product-card h-100">
//         <div className="image-wrapper position-relative">
//           <Link to={productUrl} onClick={() => console.log("clicked")} className="product-detail-link d-block">
//             {imageToShow ? (
//               <img
//                 src={imageToShow}
//                 alt={product.name}
//                 className="w-100 product-main-image"
//               />
//             ) : video ? (
//               <video
//                 className="w-100 product-main-image"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               >
//                 <source src={video} type="video/mp4" />
//               </video>
//             ) : (
//               <img
//                 src="/assets/img/logo.png"
//                 alt="fallback"
//                 className="w-100"
//               />
//             )}
//           </Link>

//           {images.length > 1 && (
//             <div className="image-slider d-none d-sm-flex">
//               {images.map((_, i) => (
//                 <div
//                   key={i}
//                   onMouseEnter={() => setActiveIndex(i)}
//                   className="thumb-hover-area"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="product-content text-center">
//           <div className="colors">
//             {product.color?.map((color, i) => (
//               <span key={i} className={`${color}-color color-dot`} />
//             ))}
//           </div>

//           <Link to={productUrl} className="product-name">
//             {product.name}
//           </Link>

//           <div className="product-price">
//             ₹ {product.productBasePrice}
//           </div>

//           <div className="add-to-bag-box">
//             <Link to={productUrl} className="add-to-bag">
//               Add to Cart
//             </Link>

//             <div className="vertical-divide"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
