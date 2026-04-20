import { useGetMCQBankTreeQuery } from "@/store/features/MCQBank/MCQBank.api";
import { useState, useEffect } from "react";

// Types Based on MCQ Bank Tree Data
interface Topic {
  topicName: string;
  subTopics: string[];
}

interface System {
  name: string;
  topics: Topic[];
}

interface SubjectTree {
  _id: string;
  subjectName: string;
  systems: System[];
}

interface FilterModalProps {
  close: () => void;
  onApply: (data: { subject: string; system: string; topic: string }) => void;
}

export default function McqBankFilterModal({
  close,
  onApply,
}: FilterModalProps) {
  const { data } = useGetMCQBankTreeQuery({});
  const subjects: SubjectTree[] = data?.data || [];

  const [subject, setSubject] = useState<string>("");
  const [system, setSystem] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  // Selected subject object
  const selectedSubject = subjects.find((s) => s.subjectName === subject);

  // Systems list
  const systemList: System[] = selectedSubject?.systems ?? [];

  // Topics list (topic objects)
  const topicList: Topic[] =
    systemList.find((sys) => sys.name === system)?.topics ?? [];

  // Reset system & topic when subject changes
  useEffect(() => {
    setSystem("");
    setTopic("");
  }, [subject]);

  // Reset topic when system changes
  useEffect(() => {
    setTopic("");
  }, [system]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Filter MCQ Bank</h2>

        {/* Subject */}
        <h2 className="text-sm font-medium mb-2">Subject</h2>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-slate-300 p-2 rounded mb-4 cursor-pointer"
        >
          <option value="">Select Subject</option>
          {subjects?.map((sub) => (
            <option key={sub._id} value={sub.subjectName}>
              {sub.subjectName}
            </option>
          ))}
        </select>

        {/* System */}
        <h2 className="text-sm font-medium mb-2">System</h2>
        <select
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          disabled={!selectedSubject}
          className="w-full border border-slate-300 p-2 rounded mb-4 disabled:bg-gray-100 cursor-pointer"
        >
          <option value="">Select System</option>

          {systemList?.map((sys) => (
            <option key={sys.name} value={sys.name}>
              {sys.name}
            </option>
          ))}
        </select>

        {/* Topic */}
        <h2 className="text-sm font-medium mb-2">Topic</h2>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={!system}
          className="w-full border border-slate-300 p-2 rounded mb-2 disabled:bg-gray-100 cursor-pointer"
        >
          <option value="">Select Topic</option>

          {topicList?.map((tp) => (
            <option key={tp.topicName} value={tp.topicName}>
              {tp.topicName}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={close}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onApply({ subject, system, topic })}
            className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-700"
            disabled={!subject}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
