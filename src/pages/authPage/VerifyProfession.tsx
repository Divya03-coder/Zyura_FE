"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyProfessionData, verifyProfessionSchema } from "./schemas";

interface Props {
  onNext: (data: VerifyProfessionData) => void;
  onBack: () => void;
  onSkip?: () => void;
  defaultValues?: Partial<VerifyProfessionData>;
}

export default function VerifyProfession({
  onNext,
  onBack,
  onSkip,
  defaultValues,
}: Props) {
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<VerifyProfessionData>({
    resolver: zodResolver(verifyProfessionSchema),
    defaultValues,
  });

  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data: VerifyProfessionData) => {
    onNext(data);
  };

  const handleFileChange = (
    field: keyof VerifyProfessionData,
    file: File | null
  ) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      setValue(field, file as any); // keep the file in form state
      const url = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [field]: url }));
    } else {
      setValue(field, "" as any);
      setPreviews((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const renderUploadBox = (
    field: keyof VerifyProfessionData,
    label: string
  ) => (
    <div className="border border-slate-300 rounded-lg p-4 bg-white">
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded overflow-hidden">
          {previews[field] ? (
            previews[field].includes("pdf") ? (
              <span className="text-gray-600 text-xs">PDF Selected</span>
            ) : (
              <img
                src={previews[field]}
                alt="preview"
                className="object-cover w-full h-full"
              />
            )
          ) : (
            <span className="text-gray-500">📷</span>
          )}
        </div>
        <div>
          <label className="inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
            Choose File
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              className="hidden"
              onChange={(e) =>
                handleFileChange(field, e.target.files?.[0] || null)
              }
            />
          </label>
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[field]?.message as string}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Please upload PDF, JPG, PNG up to 10MB
      </p>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-semibold">Verify Profession</h2>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-blue-500 underline hover:text-blue-600 font-medium"
          >
            Skip
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-6">
        To maintain a trusted and safe community for medical students, we
        require all mentors to complete a one-time verification.
      </p>

      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
        <p className="text-blue-800 font-medium">You will need:</p>
        <div className="mt-2 flex flex-wrap gap-4 text-blue-700 text-sm">
          <span>✔ A clear photo of yourself</span>
          <span>✔ Your National ID (NID)</span>
          <span>✔ Your Medical Degree</span>
          <span>✔ Your Professional Certificate</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {renderUploadBox("photo", "Upload Your Photo *")}
        {renderUploadBox("degree", "Upload Your Degree *")}
        {renderUploadBox(
          "identity",
          "Upload Your NID/Passport/Driving License *"
        )}
        {renderUploadBox(
          "certificate",
          "Upload Your Professional Certificate *"
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border rounded"
        >
          Back
        </button>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </form>
  );
}
