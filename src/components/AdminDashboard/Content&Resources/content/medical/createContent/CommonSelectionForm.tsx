import CommonButton from "@/common/button/CommonButton";
import CommonSelect, { SelectOption } from "@/common/custom/CommonSelect";
import CommonHeader from "@/common/header/CommonHeader";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import React, { useState } from "react";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
  error: "text-red-500 text-sm mt-1",
};

// 🔹 Generic reusable type for hierarchy
export interface HierarchyData {
  [subject: string]: {
    [system: string]: {
      [topic: string]: string[];
    };
  };
}

interface ContentSelectionFormProps {
  hierarchyData: HierarchyData;
  handleBreadcrumb: (path: string) => void;
  onNextStep?: () => void;
}

const CommonSelectionForm: React.FC<ContentSelectionFormProps> = ({
  hierarchyData,
  handleBreadcrumb,
  onNextStep,
}) => {
  const [subject, setSubject] = useState<string>("");
  const [system, setSystem] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [subtopic, setSubtopic] = useState<string>("");

  const subjects = Object.keys(hierarchyData);
  const systems = subject ? Object.keys(hierarchyData[subject]) : [];
  const topics =
    subject && system ? Object.keys(hierarchyData[subject][system]) : [];
  const subtopics =
    subject && system && topic ? hierarchyData[subject][system][topic] : [];

  const subjectOptions: SelectOption<string>[] = subjects.map((s) => ({
    label: s,
    value: s,
  }));
  const systemOptions: SelectOption<string>[] = systems.map((s) => ({
    label: s,
    value: s,
  }));
  const topicOptions: SelectOption<string>[] = topics.map((t) => ({
    label: t,
    value: t,
  }));
  const subtopicOptions: SelectOption<string>[] = subtopics.map((s) => ({
    label: s,
    value: s,
  }));

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    setSystem("");
    setTopic("");
    setSubtopic("");
  };

  const handleSystemChange = (value: string) => {
    setSystem(value);
    setTopic("");
    setSubtopic("");
  };

  const handleTopicChange = (value: string) => {
    setTopic(value);
    setSubtopic("");
  };

  const getHierarchyPath = () => {
    const path = [];
    if (subject) path.push(subject);
    if (system) path.push(system);
    if (topic) path.push(topic);
    if (subtopic) path.push(subtopic);
    return path.join(" → ");
  };

  // Update breadcrumb dynamically
  handleBreadcrumb(getHierarchyPath());

  const isFormComplete = subject && system && topic && subtopic;

  const handleNext = () => {
    if (onNextStep) onNextStep();
  };

  return (
    <CommonBorderWrapper className="space-y-6">
      <CommonHeader className="!text-[0A0A0A] mb-7.5">
        Select Content Type and Hierarchy
      </CommonHeader>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>Subject</label>
          <CommonSelect
            value={subject}
            item={subjectOptions}
            onValueChange={handleSubjectChange}
            placeholder="Select Subject"
            className="w-full"
          />
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
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
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
        </div>

        <div>
          <label className={inputClass.label}>Subtopic</label>
          <CommonSelect
            value={subtopic}
            item={subtopicOptions}
            onValueChange={setSubtopic}
            placeholder="Select Subtopic"
            disabled={!topic}
            className="w-full"
          />
        </div>
      </div>

      {subject && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs font-arial text-[#475569] mb-1">
            Content Will be added to
          </p>
          <CommonHeader className="!text-sm !font-inter">
            {getHierarchyPath()}
          </CommonHeader>
        </div>
      )}

      <div className="flex justify-end">
        <CommonButton
          disabled={!isFormComplete}
          className={`!text-[#FFFFFF] ${
            isFormComplete
              ? "bg-blue-600 hover:bg-blue-700"
              : "!bg-[#030213] cursor-not-allowed"
          }`}
          onClick={handleNext}
        >
          Next Step
        </CommonButton>
      </div>
    </CommonBorderWrapper>
  );
};

export default CommonSelectionForm;
