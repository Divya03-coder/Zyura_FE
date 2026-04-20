import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useGetStudentTypeApiQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useUpdateExamMutation } from "@/store/features/adminDashboard/examMode/studentApi/StudentApi";
import { SingleExamUpdatePayload } from "@/store/features/adminDashboard/examMode/studentApi/types/singleExam";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ActionButtons from "../../ActionButtons";
import { inputClass } from "./ManualExamModal";

interface UpdateExamModalProps {
  selectedExamId: string | null;
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: SingleExamUpdatePayload | null;
}

const UpdateExamModal: React.FC<UpdateExamModalProps> = ({
  selectedExamId,
  setIsUpdateModalOpen,
  initialData,
}) => {
  const { profileType } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  const updateSchema = z.object({
    profileType: z.string().min(1, { message: "Profile Type is required" }),
    examName: z.string().min(1, { message: "Exam Name is required" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    totalTime: z.number().min(1, { message: "Total Time is required" }),
  });

  type UpdateFormValues = z.infer<typeof updateSchema>;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      profileType: initialData?.profileType || "",
      examName: initialData?.examName || "",
      subject: initialData?.subject || "",
      totalTime: initialData?.totalTime || 0,
    },
  });
  const [updateExam, { isLoading: updateLoading }] = useUpdateExamMutation();

  const { data: studentTypeData } = useGetStudentTypeApiQuery({});

  const studentTypeOptions = studentTypeData?.data?.map((item) => ({
    value: item.typeName,
    label: item.typeName,
  }));

  useEffect(() => {
    reset({
      profileType: initialData?.profileType || "",
      examName: initialData?.examName || "",
      subject: initialData?.subject || "",
      totalTime: initialData?.totalTime || 0,
    });
  }, [initialData, reset]);
  const onSubmit = async (data: UpdateFormValues) => {
    try {
      const payload = {
        profileType: profileType,
        examName: data.examName,
        subject: data.subject,
        totalTime: data.totalTime,
      };
      if (selectedExamId) {
        await updateExam({ id: selectedExamId, data: payload }).unwrap();
        setIsUpdateModalOpen(false);
      }
    } catch (error) {
      console.error("=== API Error ===", error);
    }
  };

  const handleSavePublish = async () => {
    await handleSubmit(onSubmit)();
  };

  const handleCancel = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="max-w-4xl">
      <CommonBorderWrapper className="mb-6">
        <h2 className="text-base font-semibold mb-4">Exam update</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={inputClass.label}>Exam Name</label>
            <input
              {...register("examName")}
              className={inputClass.input}
              placeholder="Enter exam name"
            />
            {errors.examName && (
              <p className={inputClass.error}>{errors.examName.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Profile Type</label>

            <Controller
              control={control}
              name="profileType"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  item={studentTypeOptions || []}
                  onValueChange={field.onChange}
                  placeholder="Select profile type"
                />
              )}
            />

            {errors.profileType && (
              <p className={inputClass.error}>{errors.profileType.message}</p>
            )}
          </div>
          <div>
            <label className={inputClass.label}>Subject</label>
            <input
              {...register("subject")}
              className={inputClass.input}
              placeholder="Enter subject"
            />
            {errors.subject && (
              <p className={inputClass.error}>{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Total Time (minutes)</label>
            <input
              type="number"
              {...register("totalTime", { valueAsNumber: true })}
              className={inputClass.input}
              placeholder="Enter total time"
            />
            {errors.totalTime && (
              <p className={inputClass.error}>{errors.totalTime.message}</p>
            )}
          </div>
        </div>
        <ActionButtons
          isLoading={updateLoading}
          onSavePublish={handleSavePublish}
          importLabel="Update Exam"
          onCancel={handleCancel}
        />
      </CommonBorderWrapper>
    </div>
  );
};

export default UpdateExamModal;
