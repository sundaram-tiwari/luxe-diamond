import { useState, useEffect } from "react";
import { getProductBySku, updateProduct, getCategories } from "../../../api/admin.api";

export default function EditProductModal({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getProductBySku(product.productSku);
        setFormData(res?.data?.product || product);

        const catRes = await getCategories();
        setCategories(catRes?.data?.categories || []);
      } catch (err) {
        console.log(err);
        setFormData(product);
        const catRes = await getCategories();
        setCategories(catRes?.data?.categories || []);
      }
    };
    loadData();
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const updateData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        category: formData.category?._id || formData.category,
        material: formData.material,
        diamond: formData.diamond,
        stone: formData.stone,
        goldWeight22k: formData.goldWeight22k,
        goldWeight18k: formData.goldWeight18k,
        goldWeight14k: formData.goldWeight14k,
        makingCharges: formData.makingCharges,
        discount: formData.discount,
        productBasePrice: formData.productBasePrice,
        productBuyPrice: formData.productBuyPrice,
        quantity: formData.quantity,
        status: formData.status,
        isRecommended: formData.isRecommended,
        isMostSelling: formData.isMostSelling,
        defaultColor: formData.defaultColor,
        color: formData.color,
      };

      await updateProduct(product.productSku, updateData);
      alert("Product updated successfully");
      onUpdate({ ...formData, productSku: product.productSku });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      >
        <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product - {product?.productSku}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body" style={{ maxHeight: "600px", overflowY: "auto" }}>
              {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError("")}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row ">
                  {/* Basic Info */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Slug</label>
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      name="slug"
                      value={formData.slug || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control bg-transparent"
                      name="category"
                      value={formData.category?._id || formData.category || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Material</label>
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      name="material"
                      value={formData.material || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Description */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control bg-transparent"
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>

                  {/* Weights */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Gold 22K Weight</label>
                    <input
                      type="number"
                      className="form-control bg-transparent"
                      name="goldWeight22k"
                      value={formData.goldWeight22k || ""}
                      onChange={handleInputChange}
                      step="0.1"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Gold 18K Weight</label>
                    <input
                      type="number"
                      className="form-control bg-transparent"
                      name="goldWeight18k"
                      value={formData.goldWeight18k || ""}
                      onChange={handleInputChange}
                      step="0.1"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Gold 14K Weight</label>
                    <input
                      type="number"
                      className="form-control bg-transparent"
                      name="goldWeight14k"
                      value={formData.goldWeight14k || ""}
                      onChange={handleInputChange}
                      step="0.1"
                    />
                  </div>

                  {/* Prices */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Base Price</label>
                    <input
                      type="number"
                      className="form-control bg-transparent"
                      name="productBasePrice"
                      value={formData.productBasePrice || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Buy Price</label>
                    <input
                      type="number"
                      className="form-control bg-transparent"
                      name="productBuyPrice"
                      value={formData.productBuyPrice || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Additional Fields */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Making Charges</label>
                    <input
                      type="number"
                      className="form-control bg-transparent"
                      name="makingCharges"
                      value={formData.makingCharges || ""}
                      onChange={handleInputChange}
                      step="0.01"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Discount</label>
                    <input
                      type="number"
                      className="form-control   bg-transparent"
                      name="discount"
                      value={formData.discount || ""}
                      onChange={handleInputChange}
                      step="0.01"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control bg-transparent"
                      name="quantity"
                      value={formData.quantity || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Color Fields */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Default Color</label>
                    <select
                      className="form-control   bg-transparent"
                      name="defaultColor"
                      value={formData.defaultColor || "Yellow"}
                      onChange={handleInputChange}
                    >
                      <option value="Yellow">Yellow</option>
                      <option value="Rose">Rose</option>
                      <option value="White">White</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Available Colors (comma separated)</label>
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      name="color"
                      value={Array.isArray(formData.color) ? formData.color.join(", ") : formData.color || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          color: e.target.value.split(",").map((c) => c.trim()),
                        }))
                      }
                      placeholder="Yellow, Rose, White"
                    />
                  </div>

                  {/* Status Checkboxes */}
                  <div className="col-12 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="status"
                        name="status"
                        checked={formData.status || false}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="status">
                        Active Status
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isRecommended"
                        name="isRecommended"
                        checked={formData.isRecommended || false}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="isRecommended">
                        Recommended Product
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isMostSelling"
                        name="isMostSelling"
                        checked={formData.isMostSelling || false}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="isMostSelling">
                        Best Seller
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
