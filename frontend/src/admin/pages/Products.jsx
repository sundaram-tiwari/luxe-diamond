import CsvDataTable from "../components/upload/CsvDataTable";
import CsvUploadCard from "../components/upload/CsvUploadCard.";


export default function ProductUpload() {
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
           <h3 className="mb-4 fw-bold">Products</h3>
        </div>
        <CsvUploadCard />
        <CsvDataTable  />
      </div>
    </div>
  );
}