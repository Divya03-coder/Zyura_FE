import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import profileImage from "@/assets/signUp/Upload Photo.png";
import { UploadProfileData, uploadProfileSchema } from "./schemas";

interface Props {
  onNext: (data: UploadProfileData) => void;
  onBack: () => void;
  onSkip: () => void;
  defaultValues?: Partial<UploadProfileData>;
}

type FormValues = UploadProfileData;

export default function UploadProfile({
  onNext,
  onBack,
  defaultValues,
  // onSkip,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(uploadProfileSchema),
    defaultValues: {
      photo: null,
      bio: "",
      ...(defaultValues ?? {}),
    },
  });

  const [dragActive, setDragActive] = useState(false);
  const photo = watch("photo");
  const bio = watch("bio");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const maxLength = 200;

  // 🧠 Update preview when photo changes
  useEffect(() => {
    if (photo && photo instanceof File) {
      const url = URL.createObjectURL(photo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [photo]);

  // Sync default values
  useEffect(() => {
    if (defaultValues) reset({ ...defaultValues });
  }, [defaultValues, reset]);

  // 📂 Handle file input or drag-drop
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setValue("photo", file, { shouldValidate: true });
  };

  // 🧲 Handle drag events
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  // ❌ Remove image
  const removeImage = () => {
    setValue("photo", null, { shouldValidate: true });
    setPreviewUrl(null);
    const input = document.getElementById("fileInput") as HTMLInputElement;
    if (input) input.value = "";
  };

  // 🧾 Submit handler
  const onSubmit = (data: FormValues) => {
    onNext(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-bricolage text-5xl font-semibold text-center mb-2">
        Upload Your Photo
      </h2>
      <p className="mb-14 text-center text-gray-500">
        Select your primary goals so our AI can focus on what matters most
      </p>

      <button
        type="button"
        onClick={() => {
          const emptyData: UploadProfileData = {
            photo: null,
            bio: "",
          };

          reset(emptyData); // Clear errors
          onNext(emptyData); // Move to next step (acts like Submit)
        }}
        className="text-end w-full mb-4 cursor-pointer text-bricolage font-medium underline pr-2"
      >
        Skip
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Upload Box */}
        <div
          className={`p-8 text-center cursor-pointer transition relative border-2 rounded-xl ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="relative">
              {/* Preview OR Placeholder */}
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="placeholder"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                  <Plus className="bg-blue-600 text-white rounded-full -bottom-2 left-12 absolute" />
                </div>
              )}
            </span>
          </div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {errors.photo && (
          <p className="text-red-500 text-sm">{errors.photo.message}</p>
        )}

        {/* Bio Section */}
        <div>
          <label htmlFor="bio" className="block font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            rows={5}
            maxLength={maxLength}
            {...register("bio")}
            className="w-full border-2 border-slate-300 rounded-[8px] p-5"
            placeholder="Write something about yourself..."
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-1 text-right">
            {bio?.length ?? 0}/{maxLength}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-main text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
