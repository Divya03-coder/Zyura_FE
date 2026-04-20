import CommonButton from "@/common/button/CommonButton";
import MediumHeader from "@/common/header/MediumHeader";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { useCreateResourceCarrierMutation } from "@/store/features/adminDashboard/ContentResources/resourceCariier/resourceCarrierApi";
import { Upload } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonSelect from "@/common/custom/CommonSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
};

// Zod schema
const ResourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.string(),
  file: z
    .instanceof(File, { message: "File is required" })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file?.type),
      "Only PDF or DOC files allowed"
    )
    .refine((file) => file?.size <= 25 * 1024 * 1024, "Max size is 25MB"),
});

type ResourceFormType = z.infer<typeof ResourceSchema>;

const UploadResourceForm: React.FC = () => {
  const navigate = useNavigate();
  const [createResourceCarrier, { isLoading }] =
    useCreateResourceCarrierMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useForm<ResourceFormType>({
    resolver: zodResolver(ResourceSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      tags: "",
      file: undefined as any,
    },
    mode: "onChange",
  });

  const selectedFile = watch("file");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file);
      await trigger("file");
    }
  };

  const onSubmit: SubmitHandler<ResourceFormType> = async (data) => {
    try {
      const tagsArray = data.tags
        ? data.tags
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
        : [];
      const resourceData = {
        resourceName: data.title,
        category: data.category,
        description: data.description,
        tags: tagsArray,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(resourceData));
      formData.append("file", data.file);
      for (let [key, value] of formData.entries()) {
        if (key === "data") {
          console.log(key, ":", value);
        } else {
        }
      }

      const response = await createResourceCarrier(formData).unwrap();

      console.log("Upload successful:", response);

      navigate(-1);
    } catch (error: any) {
      console.error("Upload failed:", error);

      if (error.data?.message) {
        alert(`Upload failed: ${error.data.message}`);
      } else {
        alert("Upload failed. Please try again.");
      }
    }
  };

  const categoryOptions = [
    { label: "Cardiovascular", value: "Cardiovascular" },
    { label: "Neurology", value: "Neurology" },
    { label: "Surgery", value: "Surgery" },
  ];
  return (
    <div>
      <DashboardTopSection
        title="Upload New Resource"
        description="Upload educational resources including OSCE stations, study notes, career guides, and general materials."
      />

      <CommonSpace>
        <CommonBorderWrapper className="!border-0 !rounded-none">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <MediumHeader className="!text-xl !font-normal">
              Upload Resource
            </MediumHeader>

            {/* Title */}
            <div>
              <label className={inputClass.label}>Notes Title</label>
              <input
                {...register("title")}
                className={inputClass.input}
                placeholder="Cardiovascular Examination"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {errors.title?.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Career Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <CommonSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    item={categoryOptions}
                    placeholder="Select category"
                    w={200}
                    className={inputClass.input}
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category?.message?.toString()}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className={inputClass.label}>Description</label>
              <textarea
                {...register("description")}
                className={inputClass.input}
                rows={4}
                placeholder="Cardiovascular description..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description?.message?.toString()}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className={inputClass.label}>Tags (comma-separated)</label>
              <input
                {...register("tags")}
                className={inputClass.input}
                placeholder="cardio, osce, exam"
              />
              {errors.tags && (
                <p className="text-red-500 text-sm">
                  {errors.tags?.message?.toString()}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className={inputClass.label}>Upload Media</label>
              <p className="text-sm text-gray-500 mb-3">
                Upload images or videos For Practice OSCE
              </p>

              <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors bg-white">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="mb-3 p-3 bg-blue-100 rounded-lg">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>

                  {selectedFile ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-700 font-medium mb-1">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-900 font-medium mb-1">
                        Click to Upload study notes file
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC (Max 25MB)
                      </p>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {errors.file && (
                <p className="text-red-500 text-sm">
                  {errors.file?.message?.toString()}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pb-5">
              <CommonButton
                onClick={() => navigate(-1)}
                type="button"
                className="w-full sm:w-auto"
              >
                Back
              </CommonButton>

              <CommonButton
                type="submit"
                className="!bg-blue-600 !text-white hover:!bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ButtonWithLoading title="Uploading..." />
                ) : (
                  "Upload Resource"
                )}
              </CommonButton>
            </div>
          </form>
        </CommonBorderWrapper>
      </CommonSpace>
    </div>
  );
};

export default UploadResourceForm;
