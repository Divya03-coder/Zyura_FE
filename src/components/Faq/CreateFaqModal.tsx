import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import FormHeader from "../AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "../AdminDashboard/reuseable/ModalCloseButton";
import { categoriesOptions } from "./FAQManagement";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import {
  usePostFaqMutation,
  useUpdateFaqMutation,
} from "@/store/features/adminDashboard/planAndFaq/PricePlanApi";

// Zod validation
const faqSchema = z.object({
  category: z.string().min(1, "Category is required"),
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
});

export type FaqFormType = z.infer<typeof faqSchema>;

export const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

const CreateFaqModal = ({
  onClose,
  initialData,
}: {
  onClose: () => void;
  initialData?: (FaqFormType & { _id: string }) | null;
}) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FaqFormType>({
    resolver: zodResolver(faqSchema),
    defaultValues: initialData || { category: "", question: "", answer: "" },
  });

  const [createFaq, { isLoading }] = usePostFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  const onSubmit = async (data: FaqFormType) => {
    try {
      if (isEdit && initialData?._id) {
        await updateFaq({ id: initialData._id, data }).unwrap();
      } else {
        await createFaq(data).unwrap();
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6">
        <FormHeader
          title={isEdit ? "Update FAQ" : "Add New FAQ"}
          subtitle={
            isEdit
              ? "Update the frequently asked question."
              : "Create a new frequently asked question for students."
          }
        />

        <ModalCloseButton onClick={onClose} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category */}
          <div>
            <label className={inputClass.label}>Category</label>
            <CommonSelect
              value={watch("category")}
              item={categoriesOptions}
              placeholder="Select a category"
              className="!w-full"
              onValueChange={(val) => setValue("category", val)}
            />
            {errors.category && (
              <p className={inputClass.error}>{errors.category.message}</p>
            )}
          </div>

          {/* Question */}
          <div>
            <label className={inputClass.label}>Question</label>
            <textarea
              {...register("question")}
              placeholder="enter the question"
              rows={4}
              className={inputClass.input}
            />
            {errors.question && (
              <p className={inputClass.error}>{errors.question.message}</p>
            )}
          </div>

          {/* Answer */}
          <div>
            <label className={inputClass.label}>Answer</label>
            <textarea
              {...register("answer")}
              placeholder="enter the answer"
              rows={4}
              className={inputClass.input}
            />
            {errors.answer && (
              <p className={inputClass.error}>{errors.answer.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <CommonButton onClick={onClose}>Cancel</CommonButton>
            <CommonButton
              type="submit"
              className="!text-white !bg-blue-600"
              disabled={isLoading || isUpdating}
            >
              {isLoading || isUpdating ? (
                <ButtonWithLoading
                  title={isEdit ? "Updating..." : "Saving..."}
                />
              ) : isEdit ? (
                "Update"
              ) : (
                "Save"
              )}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFaqModal;
