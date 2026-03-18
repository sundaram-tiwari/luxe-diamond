import { useState } from "react";
import Loader from "../../components/common/Loader";
import { addProduct } from "../../api/admin.api";

const AddProducts = () => {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    category: "",
    subCategory: "",
    productSku: "",
    name: "",
    description: "",
    slug: "",

    dimension: {
      height: "",
      width: ""
    },

    material: "Gold",

    diamond: {
      carat: "",
      quantity: "",
      shape: "",
      price_IJ_SI: "",
      price_GH_SI: "",
      price_GH_VS: "",
      price_EF_VVS: ""
    },

    stone: {
      carat: "",
      quantity: "",
      shape: "",
      price: "",
      color: "",
      type: ""
    },

    goldWeight22k: "",
    goldWeight18k: "",
    goldWeight14k: "",

    makingCharges: "",
    quantity: 1,

    productBasePrice: "",
    productBuyPrice: "",
    discount: 0,

    isRecommended: true,
    isMostSelling: true,
    status: true,
  });

  // Generic handler
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // Nested handler
  const handleNestedChange = (e, parent) => {
    setProduct({
      ...product,
      [parent]: {
        ...product[parent],
        [e.target.name]: e.target.value
      }
    });
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      await addProduct(product);
      alert("Product Created Successfully");
    } catch (err) {
      console.log(err);
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

                  {/* Basic Info */}
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input className="form-control bg-transparent"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                      />
                      <label>Product Name</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input className="form-control bg-transparent"
                        name="productSku"
                        placeholder="SKU"
                        value={product.productSku}
                        onChange={handleChange}
                      />
                      <label>SKU</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input className="form-control bg-transparent"
                        name="slug"
                        placeholder="Slug"
                        value={product.slug}
                        onChange={handleChange}
                      />
                      <label>Slug</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <textarea className="form-control bg-transparent"
                        name="description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChange}
                      />
                      <label>Description</label>
                    </div>
                  </div>

                  {/* Dimension */}
                  <h5>Dimensions</h5>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input className="form-control bg-transparent"
                        name="height"
                        placeholder="Height"
                        value={product.dimension.height}
                        onChange={(e) => handleNestedChange(e, "dimension")}
                      />
                      <label>Height</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input className="form-control bg-transparent"
                        name="width"
                        placeholder="Width"
                        value={product.dimension.width}
                        onChange={(e) => handleNestedChange(e, "dimension")}
                      />
                      <label>Width</label>
                    </div>
                  </div>

                  {/* Diamond */}
                  <h5>Diamond</h5>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <input className="form-control bg-transparent"
                        name="carat"
                        placeholder="Carat"
                        value={product.diamond.carat}
                        onChange={(e) => handleNestedChange(e, "diamond")}
                      />
                      <label>Carat</label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <input className="form-control bg-transparent"
                        name="quantity"
                        placeholder="Quantity"
                        value={product.diamond.quantity}
                        onChange={(e) => handleNestedChange(e, "diamond")}
                      />
                      <label>Quantity</label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <input className="form-control bg-transparent"
                        name="shape"
                        placeholder="Shape"
                        value={product.diamond.shape}
                        onChange={(e) => handleNestedChange(e, "diamond")}
                      />
                      <label>Shape</label>
                    </div>
                  </div>

                  {/* Pricing */}
                  <h5>Pricing</h5>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <input type="number" className="form-control bg-transparent"
                        name="productBasePrice"
                        placeholder="Base Price"
                        value={product.productBasePrice}
                        onChange={handleChange}
                      />
                      <label>Base Price</label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <input type="number" className="form-control bg-transparent"
                        name="productBuyPrice"
                        placeholder="Buy Price"
                        value={product.productBuyPrice}
                        onChange={handleChange}
                      />
                      <label>Buy Price</label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <input type="number" className="form-control bg-transparent"
                        name="discount"
                        placeholder="Discount"
                        value={product.discount}
                        onChange={handleChange}
                      />
                      <label>Discount (%)</label>
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="col-md-4">
                    <label>
                      <input type="checkbox"
                        checked={product.isRecommended}
                        onChange={() =>
                          setProduct({ ...product, isRecommended: !product.isRecommended })
                        }
                      /> Recommended
                    </label>
                  </div>

                  <div className="col-md-4">
                    <label>
                      <input type="checkbox"
                        checked={product.isMostSelling}
                        onChange={() =>
                          setProduct({ ...product, isMostSelling: !product.isMostSelling })
                        }
                      /> Most Selling
                    </label>
                  </div>

                  <div className="col-md-4">
                    <label>
                      <input type="checkbox"
                        checked={product.status}
                        onChange={() =>
                          setProduct({ ...product, status: !product.status })
                        }
                      /> Active
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="col-12 text-center mt-3">
                    <button className="btn primary-btn" onClick={submitHandler}>
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