"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const CsvUploader = () => {
  const [jsonData, setJsonData] = useState([]);

  const requiredFields = ["FirstName", "Phone", "Notes"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" }); // defval: '' handles empty cells

      // Step 1: Validate required columns
      const columns = Object.keys(data[0] || {});
      const missingFields = requiredFields.filter(
        (field) => !columns.includes(field)
      );

      if (missingFields.length > 0) {
        alert(`Missing required columns: ${missingFields.join(", ")}`);
        return;
      }

      // Step 2: Warn for missing values
      const warnings = [];
      data.forEach((row, index) => {
        requiredFields.forEach((field) => {
          if (row[field] === "") {
            warnings.push(`Row ${index + 2} - Missing value in "${field}"`);
          }
        });
      });

      if (warnings.length > 0) {
        console.warn("⚠️ Data Warnings:");
        warnings.forEach((w) => console.warn(w));
        alert(
          "Some cells have missing values. They will be treated as empty strings."
        );
      }

      // Step 3: Save valid data
      console.log("✅ Final Parsed JSON:", data);
      setJsonData(data);
      return JSON.stringify(jsonData, null, 2);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-4 max-w-lg mx-auto mt-10">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 block"
      />

      <h2 className="text-lg font-bold mb-2">Parsed Data (JSON)</h2>
      <pre className="bg-gray-100 p-4 rounded max-h-96 overflow-auto text-sm">
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    </div>
  );
};

export default CsvUploader;
