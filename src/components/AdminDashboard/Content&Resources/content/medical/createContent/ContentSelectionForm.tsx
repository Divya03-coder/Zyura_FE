import CommonButton from "@/common/button/CommonButton";
import CommonSelect, { SelectOption } from "@/common/custom/CommonSelect";
import CommonHeader from "@/common/header/CommonHeader";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import ToggleButtonGroup from "@/components/AdminDashboard/reuseable/ToggleButtonGroup";
import { useGetStudyModeTreeQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import {
  SubjectData,
  System,
  Topic,
} from "@/store/features/adminDashboard/ContentResources/MCQ/types/TreeResponse";

import {
  ContentModeType,
  ContentType,
  setContentModeType,
  setFormData,
} from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppSelector } from "@/store/hook";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { tabs } from "../../ParentComponent";

const createContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  system: z.string().min(1, "System is required"),
  topic: z.string().min(1, "Topic is required"),
  subtopic: z.string().optional(),
  // profileType: z.string().optional(),
  // type: z.enum(["exam", "study"]),
  // contentFor: z.enum(["student", "professional"]),
});

export type CreateContentDataType = z.infer<typeof createContentSchema>;

interface CreateMCQStudyProps {
  handleBreadcrumb: (text: string) => void;

  setIsContentCreation: (value: boolean) => void;
}

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-black text-xs ",
  error: "text-red-500 text-sm mt-1",
};

const ContentSelectionForm: React.FC<CreateMCQStudyProps> = ({
  handleBreadcrumb,
  setIsContentCreation,
}) => {
  const { contentFor, profileType, type, universalSelectNode } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { data: allStudyModeData } = useGetStudyModeTreeQuery(
    { contentFor, profileType },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const backendData = allStudyModeData?.data || [];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateContentDataType>({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      title: "",
      subject: universalSelectNode.subject || "",
      system: universalSelectNode.system || "",
      topic: universalSelectNode.topic || "",
      subtopic: universalSelectNode.subtopic || "",
    },
  });

  // const mode = watch("type");
  const subject = watch("subject");
  const system = watch("system");
  const topic = watch("topic");
  const subtopic = watch("subtopic");

  const subjects = useMemo(
    () =>
      backendData
        .map((item: SubjectData) => item.subjectName)
        .filter((name) => name && name.trim() !== ""),
    [backendData],
  );

  const selectedSubjectData = backendData.find(
    (item: SubjectData) => item.subjectName === subject,
  );

  const systems = selectedSubjectData
    ? selectedSubjectData.systems
        .map((sys: System) => sys.name)
        .filter((name) => name && name.trim() !== "")
    : [];

  const selectedSystemData = selectedSubjectData?.systems.find(
    (sys: System) => sys.name === system,
  );

  const topics = selectedSystemData
    ? selectedSystemData.topics
        .map((t: Topic) => t.topicName)
        .filter((name) => name && name.trim() !== "")
    : [];

  const selectedTopicData = selectedSystemData?.topics.find(
    (t: Topic) => t.topicName === topic,
  );

  const subtopics = selectedTopicData
    ? selectedTopicData.subTopics
        .map((s: any) => (typeof s === "string" ? s : s.subtopicName))
        .filter((name) => name && name.trim() !== "")
    : [];

  const subjectOptions: SelectOption<string>[] = subjects.map((s, index) => ({
    label: s,
    value: s,
    key: `${s}-${index}`,
  }));

  const systemOptions: SelectOption<string>[] = systems.map((s, index) => ({
    label: s,
    value: s,
    key: `${s}-${index}`,
  }));

  const topicOptions: SelectOption<string>[] = topics.map((t, index) => ({
    label: t,
    value: t,
    key: `${t}-${index}`,
  }));

  const subtopicOptions: SelectOption<string>[] = subtopics.map((s, index) => ({
    label: s,
    value: s,
    key: `${s}-${index}`,
  }));

  const handleSubjectChange = (value: string) => {
    setValue("subject", value);
    setValue("system", "");
    setValue("topic", "");
    setValue("subtopic", "");
  };

  const handleSystemChange = (value: string) => {
    setValue("system", value);
    setValue("topic", "");
    setValue("subtopic", "");
  };

  const handleTopicChange = (value: string) => {
    setValue("topic", value);
    setValue("subtopic", "");
  };

  const getHierarchyPath = () => {
    const path = [];
    if (subject) path.push(subject);
    if (system) path.push(system);
    if (topic) path.push(topic);
    if (subtopic) path.push(subtopic);
    return path.join(" → ");
  };

  useEffect(() => {
    handleBreadcrumb(getHierarchyPath());
  }, [subject, system, topic, subtopic]);

  const isFormComplete = subject && system && topic;

  const onSubmit = (data: CreateContentDataType) => {
    const payload = { ...data, profileType, contentFor, type };
    dispatch(setFormData(payload));
    setIsContentCreation(true);
  };
  const { contentType } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  const navigate = useNavigate();

  const contentTitleMap: Record<ContentType, string> = {
    MCQ: "MCQ Bank Title",
    Flashcard: "Flashcard Bank Title",
    ClinicalCase: "Clinical Case Title",
    OSCE: "OSCE Title",
    Notes: "Notes Title",
  };

  const bankTitle = contentTitleMap[contentType] ?? "Content Bank Title";
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CommonBorderWrapper className="space-y-6">
        <CommonHeader className=" text-[0A0A0A]! mb-7.5">
          Select Content Type and Hierarchy
        </CommonHeader>

        <div>
          <label className={inputClass.label}>Mode</label>
          <ToggleButtonGroup
            options={tabs}
            active={type}
            onChange={(value) =>
              dispatch(setContentModeType(value as ContentModeType))
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-6 ">
          <div className=" col-span-2">
            <label className={inputClass.label}>{bankTitle}</label>
            <input
              type="text"
              placeholder="Enter title"
              className={inputClass.input}
              {...register("title")}
            />
            {errors.title && (
              <p className={inputClass.error}>{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Subject</label>
            <CommonSelect
              value={subject}
              item={subjectOptions}
              onValueChange={handleSubjectChange}
              placeholder="Select Subject"
              className="w-full"
            />
            {errors.subject && (
              <p className={inputClass.error}>{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>System</label>
            <CommonSelect
              value={system}
              item={systemOptions}
              onValueChange={handleSystemChange}
              placeholder="Select System"
              disabled={!subject}
              className="w-full"
            />
            {errors.system && (
              <p className={inputClass.error}>{errors.system.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 ">
          <div>
            <label className={inputClass.label}>Topic</label>
            <CommonSelect
              value={topic}
              item={topicOptions}
              onValueChange={handleTopicChange}
              placeholder="Select Topic"
              disabled={!system}
              className="w-full"
            />
            {errors.topic && (
              <p className={inputClass.error}>{errors.topic.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Subtopic</label>
            <CommonSelect
              value={subtopic || undefined}
              item={subtopicOptions}
              onValueChange={(val) => setValue("subtopic", val)}
              placeholder="Select Subtopic"
              disabled={!topic}
              className="w-full"
            />
            {errors.subtopic && (
              <p className={inputClass.error}>{errors.subtopic.message}</p>
            )}
          </div>
        </div>

        {subject && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-arial text-[#475569] mb-1">
              Content Will be added to
            </p>
            <CommonHeader className="!text-sm !font-inter ">
              {getHierarchyPath()}
            </CommonHeader>
          </div>
        )}

        <div className=" w-full flex justify-between">
          <CommonButton
            onClick={() => navigate(-1)}
            type="button"
            className="  !bg-blue-600 !text-white"
          >
            Back
          </CommonButton>
          <CommonButton
            type="submit"
            disabled={!isFormComplete}
            className={`!text-[#FFFFFF] ${
              isFormComplete
                ? "bg-blue-600 hover:bg-blue-700"
                : "!bg-[#030213] cursor-not-allowed"
            }`}
          >
            Next Step
          </CommonButton>
        </div>
      </CommonBorderWrapper>
    </form>
  );
};

export default ContentSelectionForm;
