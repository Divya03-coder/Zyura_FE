import React, { useState } from "react";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";

interface UploadDropzoneProps {
  label: string;
  acceptedFormats: string;
  maxSize: string;
  onFileSelect: (file: File, detectedCount: number) => void;
}

const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  label,
  acceptedFormats,
  maxSize,
  onFileSelect,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const processFile = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      const detectedCount = rows.length;
      onFileSelect(file, detectedCount);
    } catch (error) {
      console.error("Error reading file:", error);
      onFileSelect(file, 0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) processFile(files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0)
      processFile(e.target.files[0]);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-16 text-center relative transition ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      <div className="flex flex-col items-center relative z-10">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Upload className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-base font-medium text-gray-900 mb-2">{label}</h3>
        <p className="text-sm text-gray-600 mb-1">
          Click to browse CSV or Excel file
        </p>
        <p className="text-xs text-gray-500">
          Supported formats: {acceptedFormats} (Max {maxSize})
        </p>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="absolute inset-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UploadDropzone;
