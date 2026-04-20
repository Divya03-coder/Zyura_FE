// OSCEUpload.tsx - COMPLETELY FIXED VERSION
import CommonHeader from "@/common/header/CommonHeader";
import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../ActionButtons";
import StepIndicator from "../medical/StepIndicator";
import { steps } from "../medical/createContent/CreateContent";

import { useCreateOsceMutation } from "@/store/features/adminDashboard/ContentResources/Osce/osceApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import Examiner from "./Examiner";
import OsceEditor from "./OsceEditor";
import UrlInput from "./UrlInput";
import VideoInput from "./VideoInput";
import { OsceFormValues, osceSchema } from "./osceSchema";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};

const activeStep = 2;

const defaultValues: OsceFormValues = {
  name: "",
  description: "",
  scenario: "",
  timeLimit: "",
  candidateInstruction: "",
  patientInstruction: "",
  tasks: [
    {
      taskName: "History Taking",
      checklistItem: ["Ask about onset"],
    },
  ],
  tutorial: ["https://www.youtube.com/"],
  learningResource: {
    resourceTitle: "OSCE Clinical Guide",
    resourceUrl: "https://example.com/osce-guide",
  },
};

const OSCEUpload: React.FC<{ breadcrumb: string }> = ({ breadcrumb }) => {
  const navigate = useNavigate();

  const { control, register, handleSubmit, formState, watch, setValue } =
    useForm<OsceFormValues>({
      resolver: zodResolver(osceSchema),
      defaultValues,
      mode: "onBlur",
    });

  const { errors } = formState;

  const tasks = watch("tasks");
  const tutorial = watch("tutorial");

  const appendTask = () => {
    const currentTasks = tasks || [];
    setValue("tasks", [...currentTasks, { taskName: "", checklistItem: [""] }]);
  };

  const removeTask = (index: number) => {
    const currentTasks = tasks || [];
    setValue(
      "tasks",
      currentTasks.filter((_, i) => i !== index),
    );
  };

  const appendTutorial = (value: string = "") => {
    const currentTutorial = tutorial || [];
    setValue("tutorial", [...currentTutorial, value]);
  };

  const removeTutorial = (index: number) => {
    const currentTutorial = tutorial || [];
    setValue(
      "tutorial",
      currentTutorial.filter((_, i) => i !== index),
    );
  };

  const { formData, contentType } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  const [createOsce, { isLoading }] = useCreateOsceMutation();
  const onSubmit = async (data: OsceFormValues) => {
    try {
      if (formData) {
        const formattedPayload = { ...formData, ...data };
        await createOsce(formattedPayload).unwrap();
        navigate(`/admin/content-management/dashboard/${contentType}`);
      }
    } catch (error: any) {
      console.error("Failed to create OSCE:", error);
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DashboardTopSection
        title="Add OSCE Content"
        description={breadcrumb}
        descriptionClassName="!text-[#717182]"
      />

      <CommonSpace>
        <StepIndicator steps={steps} activeStep={activeStep} />
      </CommonSpace>

      <div className="space-y-6">
        <div className="space-y-6 bg-white p-6  border border-border rounded-md">
          <CommonHeader>Basic Information</CommonHeader>
          <div>
            <label className={inputClass.label}>Name</label>
            <input className={inputClass.input} {...register("name")} />
            {errors.name && (
              <p className={inputClass.error}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Description</label>
            <textarea
              className={inputClass.input}
              {...register("description")}
            />
            {errors.description && (
              <p className={inputClass.error}>{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Time Limit</label>
            <input className={inputClass.input} {...register("timeLimit")} />
            {errors.timeLimit && (
              <p className={inputClass.error}>{errors.timeLimit.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-6 bg-white p-6  border border-border rounded-md">
          <div>
            <label className={inputClass.label}>Scenario:</label>
            <textarea className={inputClass.input} {...register("scenario")} />
            {errors.scenario && (
              <p className={inputClass.error}>{errors.scenario.message}</p>
            )}
          </div>
        </div>
        <Controller
          control={control}
          name="candidateInstruction"
          render={({ field }) => (
            <OsceEditor
              title="Candidate Instruction"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="patientInstruction"
          render={({ field }) => (
            <OsceEditor
              title="Patient Script"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {/* Use manual array management */}
        <Examiner
          register={register}
          appendTask={appendTask}
          removeTask={removeTask}
          taskFields={tasks || []}
          errors={errors}
        />
        <VideoInput
          register={register}
          errors={errors}
          tutorialFields={tutorial || []}
          appendTutorial={appendTutorial}
          removeTutorial={removeTutorial}
          setValue={setValue}
        />
        <UrlInput control={control} register={register} />
      </div>

      <div className="pb-6">
        <ActionButtons
          onCancel={handleCancel}
          isLoading={isLoading}
          importLabel="Save & Publish OSCE"
          onSavePublish={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default OSCEUpload;
