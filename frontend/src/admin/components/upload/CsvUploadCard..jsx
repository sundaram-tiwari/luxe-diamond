import { useRef, useState } from "react";
import { uploadProducts } from "../../../api/product.api";

export default function CsvUploadCard() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      await uploadProducts(formData);

      alert("File uploaded successfully");

      setFile(null);
      fileInputRef.current.value = "";

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="col-12 mb-4">
      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">

          <div
            className="d-flex align-items-center gap-3"
            style={{ cursor: "pointer" }}
            onClick={() => fileInputRef.current.click()}
          >
            <i
              className="fa-solid fa-file-csv text-dark"
              style={{ fontSize: "32px" }}
            ></i>

            <div>
              <h6 className="fw-bold mb-1">Upload Product CSV</h6>
              <p className="text-muted small mb-0">
                {file ? file.name : "Click here to upload your CSV"}
              </p>
            </div>

            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleChange}
              className="d-none"
            />
          </div>

          <div>
            <button
              type="button"
              className="btn btn-dark px-4"
              onClick={handleSubmit}
              disabled={!file}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}