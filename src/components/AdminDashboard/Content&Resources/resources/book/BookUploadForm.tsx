import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import {
  useCreateResourceBooksMutation,
  useUpdateResourceBooksMutation,
} from "@/store/features/adminDashboard/ContentResources/resourceLibery/resourceLibery";
import { BookType } from "@/store/features/adminDashboard/ContentResources/resourceLibery/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
};

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  language: z.string().min(1, "Language is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.string().min(1, "At least one tag is required"),
});

type BookFormData = z.infer<typeof bookSchema>;

const languageOptions = [
  { label: "English", value: "English" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Chinese", value: "Chinese" },
  { label: "Japanese", value: "Japanese" },
];

interface BookUploadFormProps {
  initialData?: BookType;
  handleCloseModal?: () => void;
}

const BookUploadForm: React.FC<BookUploadFormProps> = ({
  initialData,
  handleCloseModal,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();
  const [createResourceBook, { isLoading: isCreating }] =
    useCreateResourceBooksMutation();
  const [updateResourceBook, { isLoading: isUpdating }] =
    useUpdateResourceBooksMutation();

  const isEditMode = Boolean(initialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || "",
      author: initialData?.author || "",
      language: initialData?.language || "",
      description: initialData?.description || "",
      tags: initialData?.tags?.join(",") || "",
    },
  });

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleBack = () => {
    navigate("/admin/resource-management");
    if (handleCloseModal) handleCloseModal();
  };
  const onSubmit = async (data: BookFormData) => {
    if (!selectedFile && !isEditMode) {
      alert("Please upload a book file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          ...data,
          tags: data.tags.split(",").map((t) => t.trim()),
        })
      );

      if (selectedFile) formData.append("file", selectedFile);

      if (isEditMode && initialData) {
        await updateResourceBook({
          id: initialData._id,
          data: formData,
        }).unwrap();
      } else {
        await createResourceBook(formData).unwrap();
      }

      reset();
      setSelectedFile(null);
      handleBack();
    } catch (err) {
      console.error(isEditMode ? "Update failed:" : "Upload failed:", err);
    }
  };

  return (
    <div className=" mx-4">
      <DashboardTopSection
        title={isEditMode ? "Update Book" : "Upload Book"}
        description="Upload and manage books for AI model training"
      />
      <CommonSpace>
        <CommonBorderWrapper className="!border-0 !rounded-none space-y-6">
          <div>
            <label className={inputClass.label}>
              Book File <span className="text-red-500">*</span>
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-700 mb-2">
                  {selectedFile
                    ? selectedFile.name
                    : isEditMode
                    ? "Keep existing file or upload a new one"
                    : "Upload your book file here"}
                </p>
                <label className="inline-block">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.epub,.mobi,.txt"
                  />
                  <span className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer inline-block">
                    Browse Files
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className={inputClass.label}>Title</label>
            <input
              type="text"
              {...register("title")}
              className={inputClass.input}
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Author</label>
            <input
              type="text"
              {...register("author")}
              className={inputClass.input}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="text-red-500 text-xs mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Language</label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={languageOptions}
                  placeholder="Select language"
                  className={inputClass.input}
                />
              )}
            />
            {errors.language && (
              <p className="text-red-500 text-sm">{errors.language?.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className={inputClass.input}
              placeholder="Enter book description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Tags (comma-separated)</label>
            <input
              type="text"
              {...register("tags")}
              className={inputClass.input}
              placeholder="e.g., medical, cardiology, textbook"
            />
            {errors.tags && (
              <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <CommonButton
              onClick={() => handleBack()}
              type="button"
              className="w-full sm:w-auto"
            >
              Back
            </CommonButton>

            <CommonButton
              onClick={handleSubmit(onSubmit)}
              type="button"
              className="!bg-blue-600 !text-white hover:!bg-blue-700"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? (
                <ButtonWithLoading
                  title={isEditMode ? "Updating..." : "Uploading..."}
                />
              ) : isEditMode ? (
                "Update Book"
              ) : (
                "Upload Books"
              )}
            </CommonButton>
          </div>
        </CommonBorderWrapper>
      </CommonSpace>
    </div>
  );
};

export default BookUploadForm;
