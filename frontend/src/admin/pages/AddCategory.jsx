import { useState } from "react";
import Loader from "../../components/common/Loader";
import { addCategory } from "../../api/admin.api";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    status: true,
    sizes: [],
    defaultSize: "",
    video: null
  });

  const [sizeInput, setSizeInput] = useState("");

  // Handle basic input
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    });
  };

  // Add size
  const addSizeHandler = () => {
    if (!sizeInput) return;

    setCategory({
      ...category,
      sizes: [...category.sizes, Number(sizeInput)]
    });

    setSizeInput("");
  };

  // Remove size
  const removeSizeHandler = (index) => {
    const updated = category.sizes.filter((_, i) => i !== index);
    setCategory({ ...category, sizes: updated });
  };

  // Video upload
  const handleVideoChange = (e) => {
    setCategory({
      ...category,
      video: e.target.files[0]
    });
  };

  const submitHandler = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("status", category.status);
      formData.append("defaultSize", category.defaultSize);

      category.sizes.forEach((size, i) => {
        formData.append(`sizes[${i}]`, size);
      });

      if (category.video) {
        formData.append("video", category.video);
      }

      await addCategory(formData);

      alert("Category Created Successfully");
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
            <div className="col-lg-8">
              <div className="profile-inner">
                <div className="row gy-3">

                  <h4 className="text-center mb-3">ADD CATEGORY</h4>

                  {/* Name */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        className="form-control bg-transparent"
                        name="name"
                        placeholder="Category Name"
                        value={category.name}
                        onChange={handleChange}
                      />
                      <label>Category Name</label>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="col-8">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control bg-transparent"
                        placeholder="Add Size"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(e.target.value)}
                      />
                      <label>Add Size</label>
                    </div>
                  </div>

                  <div className="col-4">
                    <button
                      className="btn primary-btn w-100 h-100"
                      onClick={addSizeHandler}
                    >
                      Add Size
                    </button>
                  </div>

                  {/* Size List */}
                  <div className="col-12">
                    {category.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="badge bg-dark me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeSizeHandler(index)}
                      >
                        {size} ✕
                      </span>
                    ))}
                  </div>

                  {/* Default Size */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control bg-transparent"
                        name="defaultSize"
                        placeholder="Default Size"
                        value={category.defaultSize}
                        onChange={handleChange}
                      />
                      <label>Default Size</label>
                    </div>
                  </div>

                  {/* Video Upload */}
                  <div className="col-12">
                    <label className="form-label">Upload Category Video</label>
                    <input
                      type="file"
                      accept="video/*"
                      className="form-control bg-transparent"
                      onChange={handleVideoChange}
                    />
                  </div>

                  {/* Status */}
                  <div className="col-12">
                    <label>
                      <input
                        type="checkbox"
                        checked={category.status}
                        onChange={() =>
                          setCategory({
                            ...category,
                            status: !category.status
                          })
                        }
                      />{" "}
                      Active Category
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="col-12 text-center mt-3">
                    <button
                      className="btn primary-btn"
                      onClick={submitHandler}
                    >
                      Create Category
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

export default AddCategory;