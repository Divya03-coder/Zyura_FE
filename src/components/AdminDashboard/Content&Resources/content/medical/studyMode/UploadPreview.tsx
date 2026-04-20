import React from 'react';

interface UploadPreviewProps {
  detectedCount: number;
  label: string;
}

const UploadPreview: React.FC<UploadPreviewProps> = ({ detectedCount, label }) => (
  <div className="shadow-sm p-6 mb-6 rounded border border-slate-300 bg-white">
    <div className="flex items-center justify-between mb-4 ">
      <h3 className="text-base font-medium text-gray-900">{label}</h3>
      <span className="text-sm text-gray-600">{detectedCount} detected</span>
    </div>
    <p className="text-sm text-gray-600">Upload a file to see preview and validation results</p>
  </div>
);

export default UploadPreview;
