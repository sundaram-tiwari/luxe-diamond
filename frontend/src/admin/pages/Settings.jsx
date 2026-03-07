import { useEffect, useState } from "react";
import {updateSettings } from "../../api/admin.api";
import {getSettings } from "../../api/product.api";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    gold_rate_14k: "",
    gold_rate_18k: "",
    gold_rate_22k: "",
    price_IJ_SI: "",
    price_GH_SI: "",
    price_GH_VS: "",
    price_EF_VVS: "",
    making_charges: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await getSettings();

        // if (!res.data.success) {
        //   alert(res.data.message);
        //   return;
        // }

        const data = res.data.formattedSetting;

        setFormData({
          gold_rate_14k: data.gold_rate_14k || "",
          gold_rate_18k: data.gold_rate_18k || "",
          gold_rate_22k: data.gold_rate_22k || "",
          price_IJ_SI: data.price_IJ_SI || "",
          price_GH_SI: data.price_GH_SI || "",
          price_GH_VS: data.price_GH_VS || "",
          price_EF_VVS: data.price_EF_VVS || "",
          making_charges: data.making_charges || "",
        });
      } catch (error) {
        if (error.response?.data?.message === "Access denied") {
          navigate("/admin/login");
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formattedData = Object.keys(formData).map((key) => ({
        name: key,
        value: Number(formData[key]),
      }));

      await updateSettings(formattedData);

      alert("Settings Updated Successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="col-lg-6">
        <div className="card p-4 bg-light text-dark">
          <h3 className="mb-4 fw-bold">Settings</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-floating w-100 mb-3">
              <input
                type="text"
                className="form-control bg-transparent"
                id="price_IJ_SI"
                name="price_IJ_SI"
                placeholder="IJ SI Diamond"
                value={formData.price_IJ_SI}
                onChange={handleChange}
              />
              <label htmlFor="price_IJ_SI">IJ SI Diamond</label>
            </div>

            <div className="form-floating w-100 mb-3">
              <input
                type="text"
                className="form-control bg-transparent"
                id="price_GH_SI"
                name="price_GH_SI"
                placeholder="GH SI Diamond"
                value={formData.price_GH_SI}
                onChange={handleChange}
              />
              <label htmlFor="price_GH_SI">GH SI Diamond</label>
            </div>

            <div className="form-floating w-100 mb-3">
              <input
                type="text"
                className="form-control bg-transparent"
                id="price_GH_VS"
                name="price_GH_VS"
                placeholder="GH VS Diamond"
                value={formData.price_GH_VS}
                onChange={handleChange}
              />
              <label htmlFor="price_GH_VS">GH VS Diamond</label>
            </div>

            <div className="form-floating w-100 mb-3">
              <input
                type="text"
                className="form-control bg-transparent"
                id="price_EF_VVS"
                name="price_EF_VVS"
                placeholder="EF VVS Diamond"
                value={formData.price_EF_VVS}
                onChange={handleChange}
              />
              <label htmlFor="price_EF_VVS">EF VVS Diamond</label>
            </div>

            <div className="form-floating w-100 mb-3">
              <input
                type="text"
                className="form-control bg-transparent"
                id="gold_rate_14k"
                name="gold_rate_14k"
                placeholder="Gold Rate 14K"
                value={formData.gold_rate_14k}
                onChange={handleChange}
              />
              <label htmlFor="gold_rate_14k">Gold Rate 14K</label>
            </div>

            <div className="form-floating w-100 mb-3">
              <input
                type="text"
                className="form-control bg-transparent"
                id="gold_rate_18k"
                name="gold_rate_18k"
                placeholder="Gold Rate 18K"
                value={formData.gold_rate_18k}
                onChange={handleChange}
              />
              <label htmlFor="gold_rate_18k">Gold Rate 18K</label>
            </div>

            <div className="form-floating w-100 mb-4">
              <input
                type="text"
                className="form-control bg-transparent"
                id="gold_rate_22k"
                name="gold_rate_22k"
                placeholder="Gold Rate 22K"
                value={formData.gold_rate_22k}
                onChange={handleChange}
              />
              <label htmlFor="gold_rate_22k">Gold Rate 22K</label>
            </div>
            <div className="form-floating w-100 mb-4">
              <input
                type="text"
                className="form-control bg-transparent"
                id="making_charges"
                name="making_charges"
                placeholder="Making Charges"
                value={formData.making_charges}
                onChange={handleChange}
              />
              <label htmlFor="making_charges">Making Charges</label>
            </div>

            <button
              type="submit"
              className="btn btn-lg gradient-btn text-white text-uppercase w-100 rounded-pill"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;
