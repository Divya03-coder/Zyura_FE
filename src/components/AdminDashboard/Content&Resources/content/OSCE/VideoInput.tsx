// VideoInput.tsx - FIXED VERSION
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import { useUploadSingleImageMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { Plus, Trash2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { OsceFormValues } from "./osceSchema";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};

interface VideoInputProps {
  register: UseFormRegister<OsceFormValues>;
  errors: FieldErrors<OsceFormValues>;
  tutorialFields: string[];
  appendTutorial: () => void;
  removeTutorial: (index: number) => void;
  setValue: UseFormSetValue<OsceFormValues>;
}

const VideoInput: React.FC<VideoInputProps> = ({
  register,
  errors,
  tutorialFields,
  appendTutorial,
  removeTutorial,
  setValue,
}) => {
  const [active, setActive] = useState<"Embedded" | "Media">("Embedded");
  const [uploadSingleImage, { isLoading: isUploadingImage }] =
    useUploadSingleImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const result = await uploadSingleImage(formData).unwrap();
      const fileUrl = result.data.fileUrl;
      return fileUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileUrl = await handleUploadImage(file);
      if (fileUrl) {
        const emptyFieldIndex = tutorialFields.findIndex(
          (field) => !field || field.trim() === ""
        );

        if (emptyFieldIndex !== -1) {
          setValue(`tutorial.${emptyFieldIndex}`, fileUrl);
        } else {
          appendTutorial();
          setTimeout(() => {
            setValue(`tutorial.${tutorialFields.length}`, fileUrl);
          }, 0);
        }
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMediaClick = () => {
    if (active === "Media") {
      fileInputRef.current?.click();
    }
  };

  const handleAddStep = (e: React.MouseEvent) => {
    e.preventDefault();
    appendTutorial();
  };

  const handleRemoveStep = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    removeTutorial(index);
  };

  return (
    <div>
      <CommonHeader className="pb-6">Tutorial</CommonHeader>
      <div className="bg-white p-6 border border-border rounded-md">
        <div className="flex gap-2 mb-4">
          <CommonButton
            type="button"
            onClick={() => setActive("Embedded")}
            className={`flex-1 ${
              active === "Embedded" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Embedded link
          </CommonButton>
          <CommonButton
            type="button"
            onClick={() => setActive("Media")}
            className={`flex-1 ${
              active === "Media" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Media
          </CommonButton>
        </div>

        <label className={inputClass.label}>Video Url</label>

        {errors.tutorial && (
          <p className={inputClass.error}>{errors.tutorial.message}</p>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*,audio/*"
          className="hidden"
        />

        <div className="space-y-3">
          {tutorialFields.map((_field, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Checklist Item ${idx + 1}`}
                {...register(`tutorial.${idx}`)}
                className={inputClass.input}
              />
              {errors.tutorial?.[idx] && (
                <p className={inputClass.error}>
                  {errors.tutorial[idx]?.message}
                </p>
              )}

              <button
                type="button"
                onClick={(e) => handleRemoveStep(idx, e)}
                className="p-3 cursor-pointer text-red-600 hover:bg-red-50 rounded-md border border-gray-300 transition"
                aria-label="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {active === "Media" && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMediaClick}
                disabled={isUploadingImage}
                className="flex items-center gap-2 p-3 text-blue-600 hover:bg-blue-50 rounded-md border border-gray-300 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Upload media"
              >
                <Upload size={20} />
                {isUploadingImage ? "Uploading..." : "Upload Media"}
              </button>
            </div>
          )}

          {active === "Embedded" && (
            <div>
              <button
                type="button"
                onClick={handleAddStep}
                className="p-3 text-green-600 hover:bg-green-50 rounded-md border border-gray-300 transition cursor-pointer"
                aria-label="Add item"
              >
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoInput;
