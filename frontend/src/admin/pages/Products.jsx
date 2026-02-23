import { useState } from "react";
import CsvDataTable from "../components/upload/CsvDataTable";
import CsvUploadCard from "../components/upload/CsvUploadCard.";


export default function ProductUpload() {
  const [data, setData] = useState([]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Upload Products (CSV)
          </h1>
        </div>
        <CsvUploadCard setData={setData} />
        {data.length > 0 && <CsvDataTable data={data} />}
        
      </div>
    </div>
  );
}