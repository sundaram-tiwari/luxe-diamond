import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { addProduct, getCategories } from "../../api/admin.api";

const AddProducts = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    category: "",
    name: "",
    productSku: "",
    slug: "",
    description: "",
    material: "Gold",
    diamond: {
      carat: "",
      price_IJ_SI: "",
      price_GH_SI: "",
      price_GH_VS: "",
      price_EF_VVS: "",
    },
    stone: { price: "" },
    goldWeight22k: "",
    goldWeight18k: "",
    goldWeight14k: "",
    makingCharges: "",
    discount: 0,
    productBasePrice: 0,
    productBuyPrice: 0,
    images: [],
    video: null,
    isRecommended: true,
    isMostSelling: true,
    status: true,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.category);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product.name) {
      const slug = product.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setProduct((prev) => ({ ...prev, slug }));
    }
  }, [product.name]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct({
      ...product,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [parent]: {
        ...product[parent],
        [name]: Number(value),
      },
    });
  };

  const calculatePrice = () => {
    const goldWeight = Number(product.goldWeight14k || 0);
    const goldRate = 4000;
    const goldTotal = goldWeight * goldRate;
    const diamondTotal =
      Number(product.diamond.price_IJ_SI) ||
      Number(product.diamond.carat || 0) * 30000;
    const stonePrice = Number(product.stone.price || 0);
    const making = Number(product.makingCharges || 0);
    const subtotal = goldTotal + diamondTotal + stonePrice + making;
    const gst = subtotal * 0.03;
    const total = subtotal + gst;
    const discountAmount = (total * product.discount) / 100;

    return {
      base: Math.round(total),
      buy: Math.round(total - discountAmount),
      goldTotal,
      diamondTotal,
      stonePrice,
    };
  };

  const price = calculatePrice();

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      productBasePrice: price.base,
      productBuyPrice: price.buy,
    }));
  }, [
    product.goldWeight14k,
    product.diamond.price_IJ_SI,
    product.diamond.carat,
    product.stone.price,
    product.makingCharges,
    product.discount,
  ]);

  const submitHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append normal fields
      Object.keys(product).forEach((key) => {
        if (key === "images" || key === "video") return;
        if (typeof product[key] === "object") {
          formData.append(key, JSON.stringify(product[key]));
        } else {
          formData.append(key, product[key]);
        }
      });

      // Append images
      product.images.forEach((img) => formData.append("images", img));

      // Append video
      if (product.video) {
        formData.append("video", product.video);
      }

      await addProduct(formData);
      alert("Product Created Successfully");

      // Reset form
      setProduct({
        category: "",
        name: "",
        productSku: "",
        slug: "",
        description: "",
        material: "Gold",
        diamond: {
          carat: "",
          price_IJ_SI: "",
          price_GH_SI: "",
          price_GH_VS: "",
          price_EF_VVS: "",
        },
        stone: { price: "" },
        goldWeight22k: "",
        goldWeight18k: "",
        goldWeight14k: "",
        makingCharges: "",
        discount: 0,
        productBasePrice: 0,
        productBuyPrice: 0,
        images: [],
        video: null,
        isRecommended: true,
        isMostSelling: true,
        status: true,
      });
    } catch (err) {
      console.log(err);
      alert("Error uploading product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {loading && <Loader />}
      <div className="profile-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="profile-inner">
                <div className="row gy-3">
                  <h4 className="text-center mb-3">ADD PRODUCT</h4>

                  {/* Category */}
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-control bg-transparent"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <label>Category</label>
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        className="form-control bg-transparent"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                      />
                      <label>Product Name</label>
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        className="form-control bg-transparent"
                        name="productSku"
                        value={product.productSku}
                        onChange={handleChange}
                      />
                      <label>Product SKU</label>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control bg-transparent"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        style={{ height: "100px" }}
                      />
                      <label>Description</label>
                    </div>
                  </div>

                  {/* Gold Weights */}
                  <h5>Gold</h5>
                  {["14k", "18k", "22k"].map((k) => (
                    <div className="col-md-4" key={k}>
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control bg-transparent"
                          name={`goldWeight${k}`}
                          value={product[`goldWeight${k}`]}
                          onChange={handleChange}
                        />
                        <label>{k} Weight</label>
                      </div>
                    </div>
                  ))}

                  {/* Diamond Prices */}
                  <h5>Diamond</h5>
                  {["IJ_SI", "GH_SI", "GH_VS", "EF_VVS"].map((type) => (
                    <div className="col-md-3" key={type}>
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control bg-transparent"
                          name={`price_${type}`}
                          value={product.diamond[`price_${type}`]}
                          onChange={(e) => handleNestedChange(e, "diamond")}
                        />
                        <label>{type}</label>
                      </div>
                    </div>
                  ))}

                  {/* Images */}
                  <h5 className="mt-4">Images</h5>
                  <div className="col-12">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      name="images"
                      className="form-control bg-transparent"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setProduct({ ...product, images: files });
                      }}
                    />
                  </div>

                  {/* Video */}
                  <h5 className="mt-4">Video</h5>
                  <div className="col-12">
                    <input
                      type="file"
                      accept="video/mp4"
                      name="video"
                      className="form-control bg-transparent"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setProduct({ ...product, video: file });
                      }}
                    />
                  </div>

                  {/* Preview Images */}
                  <div className="col-12 d-flex flex-wrap gap-2 mt-2">
                    {product.images?.map((img, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                        <span
                          onClick={() => {
                            const updated = product.images.filter(
                              (_, i) => i !== index
                            );
                            setProduct({ ...product, images: updated });
                          }}
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            background: "red",
                            color: "#fff",
                            borderRadius: "50%",
                            cursor: "pointer",
                            fontSize: "12px",
                            padding: "2px 6px",
                          }}
                        >
                          ✕
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Prices */}
                  <h5 className="mt-4">Price</h5>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        className="form-control bg-transparent"
                        value={product.productBasePrice}
                        readOnly
                      />
                      <label>Base Price (14K + IJ_SI)</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        className="form-control bg-transparent"
                        value={product.productBuyPrice}
                        readOnly
                      />
                      <label>Final Price</label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="col-12 text-center mt-3">
                    <button
                      className="btn primary-btn"
                      onClick={submitHandler}
                    >
                      Create Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProducts;