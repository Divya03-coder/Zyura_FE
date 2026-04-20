import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  typeName: z.string().min(1, "Type name is required"),
  totalStudyYear: z
    .string()
    .min(1, "Total study year is required")
    .regex(/^\d+$/, "Must be a number"),
});

type FormData = z.infer<typeof schema>;

interface AddStudentTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const MentorDashboard: FC<AddStudentTypeModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <CommonHeader className="!text-2xl !font-semibold !font-inter text-gray-900 mb-2.5">
          Add New Student Type
        </CommonHeader>
        <p className="text-gray-500 text-sm mb-6">
          Create a new category of students with study duration.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type Name
            </label>
            <input
              type="text"
              {...register("typeName")}
              placeholder="e.g pharmacy"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.typeName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.typeName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Study Year
            </label>
            <input
              type="text"
              {...register("totalStudyYear")}
              placeholder="e.g 5"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.totalStudyYear && (
              <p className="text-red-500 text-sm mt-1">
                {errors.totalStudyYear.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <CommonButton type="button" onClick={onClose} className="">
              Cancel
            </CommonButton>
            <CommonButton type="submit" className="!bg-blue-500 text-white">
              Save
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorDashboard;
