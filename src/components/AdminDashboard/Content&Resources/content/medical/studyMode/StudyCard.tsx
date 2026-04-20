import React from "react";

interface StudyCardProps {
  data: {
    title: string;
    subject: string;
    system: string;
    topic: string;
    subtopic: string;
    uploadedBy: string;
    createdAt: string;
    type: string;
  };
}

const StudyCard: React.FC<StudyCardProps> = ({ data }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-md border p-4 bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="mb-2">
        <span className="text-xs text-gray-500 uppercase">{data.type}</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{data.title}</h2>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Subject:</span> {data.subject}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">System:</span> {data.system}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Topic:</span> {data.topic}
      </p>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-medium">Subtopic:</span> {data.subtopic}
      </p>
      <p className="text-xs text-gray-400">
        Uploaded by {data.uploadedBy} on{" "}
        {new Date(data.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default StudyCard;
