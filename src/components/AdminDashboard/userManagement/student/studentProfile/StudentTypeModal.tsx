"use client";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema
const schema = z.object({
  typeName: z
    .string()
    .min(1, { message: "Type Name is required" })
    .max(50, { message: "Type Name must be less than 50 characters" }),
});

// TypeScript type
export type FormData = z.infer<typeof schema>;

// Props for modal
interface StudentTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  isLoading?: boolean;
  title: string;
}

const StudentTypeModal: FC<StudentTypeModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  title,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      setValue("typeName", initialData.typeName);
    } else {
      reset({ typeName: "" });
    }
  }, [initialData, setValue, reset]);

  const handleFormSubmit = async (data: FormData) => {
    if (!onSubmit) return;

    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (err) {
      console.error("Failed to submit:", err);
    }
  };

  if (!open) return null;

  const inputClass = {
    label: "block text-sm font-normal text-[#020617] font-inter mb-2",
    input:
      "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-[#94A3B8] text-xs",
    error: "text-red-500 text-sm mt-1",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 p-6 relative">
        <ModalCloseButton onClick={onClose} />
        <FormHeader
          title={initialData ? `Edit ${title}` : `Add New ${title}`}
          subtitle="Create or update a category of students."
        />

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5 mt-4"
        >
          <div>
            <label className={inputClass.label}>Type Name</label>
            <input
              type="text"
              {...register("typeName")}
              placeholder="e.g. Dental Student"
              className={inputClass.input}
            />
            {errors.typeName && (
              <p className={inputClass.error}>{errors.typeName.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <CommonButton
              disabled={isLoading}
              type="submit"
              className="!bg-blue-500 !text-white flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <ButtonWithLoading
                  title={`${initialData ? "Updating..." : "Creating..."}`}
                />
              ) : initialData ? (
                "Update Type"
              ) : (
                "Create Type"
              )}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentTypeModal;
