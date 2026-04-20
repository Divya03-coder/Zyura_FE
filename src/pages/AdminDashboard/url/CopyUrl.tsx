import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { useUploadSingleImageMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { DragEvent, useState } from "react";

const CopyUrl = () => {
  const [uploadSingleImage, { isLoading: isUploadingImage }] =
    useUploadSingleImageMutation();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await uploadSingleImage(formData).unwrap();
      const fileUrl = result.data.fileUrl;
      setImageUrl(fileUrl);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleRemoveImage = () => setImageUrl("");

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadImage(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <DashboardTopSection
        title="Upload and Copy Image URL"
        description="Easily upload an image, preview it, and copy the URL for use elsewhere."
      />

      {/* Upload Section */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`mt-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-colors`}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {!imageUrl ? (
          <>
            <p className="text-gray-500 text-sm mb-2">
              Drag & drop an image here or click to select
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
              Choose File
            </button>
          </>
        ) : (
          <div className="w-full">
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="w-full max-h-60 object-contain rounded border border-border"
            />
            <input
              type="text"
              value={imageUrl}
              readOnly
              className="mt-2 w-full p-2 border border-border rounded text-gray-700 text-sm"
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (imageUrl) {
                    navigator.clipboard.writeText(imageUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
              >
                {copied ? "Copied!" : "Copy URL"}
              </button>

              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                onClick={handleRemoveImage}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0])
              handleUploadImage(e.target.files[0]);
          }}
          disabled={isUploadingImage}
        />

        {isUploadingImage && (
          <CommonButton className="!bg-blue-600 mt-4">
            <ButtonWithLoading title={"Uploading..."} />
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default CopyUrl;
