// components/dashboard/clinical-case/CreateClinicalCaseModal.tsx
import { useState } from "react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { X } from "lucide-react";
import { useGenerateClinicalCaseMutation } from "@/store/features/clinicalCase/clinicalCase.api";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateClinicalCaseModal = ({ open, onClose }: Props) => {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [generateClinicalCase, { isLoading }] =
    useGenerateClinicalCaseMutation();

  if (!open) return null;

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);

    if (error) {
      setError(null); // clear error on user input
    }
  };

  const handleSubmit = async () => {
    // 1️⃣ Client-side validation
    if (!prompt.trim()) {
      setError("Prompt is required");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({ prompt }));

    if (file) {
      formData.append("file", file);
    }

    try {
      const result = await generateClinicalCase(formData).unwrap();

      onClose();
      setPrompt("");
      setFile(null);
      setError(null);

      if (result?.success) {
        navigate(`/dashboard/clinical-case/${result.data._id}?type=generated`);
      }
    } catch (err: any) {
      // 2️⃣ RTK Query error handling
      if (err?.data?.message) {
        setError(err.data.message);
      } else {
        setError("Failed to generate clinical case. Please try again.");
      }
    }
  };

  // const handleFileChange = (file: File | null) => {
  //   if (!file) return;

  //   setFile(file);
  //   setPreviewUrl(URL.createObjectURL(file));
  // };

  // const handleRemoveFile = () => {
  //   setFile(null);
  //   setPreviewUrl(null);
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
        {/* header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create Clinical Case</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-slate-200 rounded-full p-1 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* input */}
        <div>
          <label className="text-sm font-medium">
            Prompt <span className="text-red-600">*</span>
          </label>

          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

          <input
            type="text"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Generate clinical case for an old man"
            className={`w-full mt-1 px-3 py-2 border rounded-md text-sm ${
              error ? "border-red-500" : "border-slate-300"
            }`}
          />
        </div>

        {/* file upload */}
        {/* <div>
          <label className="text-sm font-medium">Upload File (optional)</label>

          {!previewUrl ? (
            <label className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary transition">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />

              <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V6a2 2 0 012-2h14a2 2 0 012 2v10.5M3 16.5l4.5-4.5a2.121 2.121 0 013 0L15 16.5M3 16.5h18"
                  />
                </svg>
                <span>Click to upload image</span>
              </div>
            </label>
          ) : (
            <div className="relative mt-2 w-32 h-32 rounded-lg overflow-hidden border">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div> */}

        {/* actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 cursor-pointer hover:underline"
          >
            Cancel
          </button>
          <PrimaryButton onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CreateClinicalCaseModal;
