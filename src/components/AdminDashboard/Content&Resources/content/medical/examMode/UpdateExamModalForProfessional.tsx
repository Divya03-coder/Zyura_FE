import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useUpdateExamForProfessionalMutation } from "@/store/features/adminDashboard/examMode/professionalApi/professionalApi";
import { ProfessionalExamUpdatePayload } from "@/store/features/adminDashboard/examMode/studentApi/types/singleExam";
import { useGetProfessionalDataQuery } from "@/store/features/adminDashboard/UserManagement/professionalUserApi";
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
  initialData: ProfessionalExamUpdatePayload | null;
}

const UpdateExamModalForProfessional: React.FC<UpdateExamModalProps> = ({
  selectedExamId,
  setIsUpdateModalOpen,
  initialData,
}) => {
  const { profileType } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  const updateSchema = z.object({
    professionName: z.string().min(1, { message: "Profile name is required" }),
    examName: z.string().min(1, { message: "Exam Name is required" }),
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
      professionName: initialData?.professionName || "",
      examName: initialData?.examName || "",
      totalTime: initialData?.totalTime || 0,
    },
  });
  const [updateExam, { isLoading: updateLoading }] =
    useUpdateExamForProfessionalMutation();

  const { data: professionalTypeData } = useGetProfessionalDataQuery({});

  const professionalTypeOptions = professionalTypeData?.data?.map((item) => ({
    value: item.professionName,
    label: item.professionName,
  }));

  useEffect(() => {
    reset({
      professionName: initialData?.professionName || "",
      examName: initialData?.examName || "",
      totalTime: initialData?.totalTime || 0,
    });
  }, [initialData, reset]);
  const onSubmit = async (data: UpdateFormValues) => {
    try {
      const payload = {
        professionName: profileType,
        examName: data.examName,
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
            <label className={inputClass.label}>Profession Name</label>

            <Controller
              control={control}
              name="professionName"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  item={professionalTypeOptions || []}
                  onValueChange={field.onChange}
                  placeholder="Select profession name"
                />
              )}
            />

            {errors.professionName && (
              <p className={inputClass.error}>
                {errors.professionName.message}
              </p>
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

export default UpdateExamModalForProfessional;
