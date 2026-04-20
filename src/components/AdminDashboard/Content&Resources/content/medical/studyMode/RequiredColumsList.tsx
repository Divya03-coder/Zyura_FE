import React from 'react';

interface Column {
  label: string;
  description: string;
}

interface RequiredColumnsListProps {
  columns: Column[];
}

const RequiredColumnsList: React.FC<RequiredColumnsListProps> = ({ columns }) => (
  <div className=" p-6 mb-6 text-sm rounded-md border border-black/10 bg-blue-50">
    <h3 className="text-sm font-semibold text-gray-900 mb-4">Required Columns:</h3>
    <div className="space-y-2">
      {columns.map((col, idx) => (
        <div key={idx}>
          <span className="font-medium text-gray-900">{col.label}:</span>{' '}
          <span className="text-gray-700">{col.description}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RequiredColumnsList;
