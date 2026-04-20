interface Props {
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

const PdfPreview: React.FC<Props> = ({ previewUrl, setPreviewUrl }) => {
  return (
    previewUrl && (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-[90%] max-w-5xl h-[85vh] rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 ">
            <h2 className="text-sm font-semibold text-gray-800">PDF Preview</h2>
            <button
              onClick={() => setPreviewUrl(null)}
              className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1">
            <iframe
              src={previewUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default PdfPreview;
