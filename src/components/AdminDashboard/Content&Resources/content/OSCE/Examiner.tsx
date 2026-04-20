// Examiner.tsx - UPDATED FOR MANUAL MANAGEMENT
import CommonHeader from "@/common/header/CommonHeader";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { OsceFormValues } from "./osceSchema";

interface ExaminerProps {
  register: UseFormRegister<OsceFormValues>;
  appendTask: () => void; // Changed to no parameters
  removeTask: (index: number) => void;
  taskFields: { taskName: string; checklistItem: string[] }[]; // Removed id field
  errors: FieldErrors<OsceFormValues>;
}

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};

const Examiner: React.FC<ExaminerProps> = ({
  register,
  appendTask,
  removeTask,
  taskFields,
  errors,
}) => {
  return (
    <div>
      <CommonHeader className="pb-6">Examiner Checklist</CommonHeader>

      <div className="bg-white border border-border rounded-md p-6 space-y-6">
        {taskFields.map((task, taskIndex) => (
          <div
            key={taskIndex}
            className="space-y-4  p-4 rounded-lg border border-border"
          >
            <CommonHeader>Task {taskIndex + 1}</CommonHeader>

            {/* Task Name */}
            <div className="space-y-3">
              <label className={inputClass.label}>Task Name</label>
              <input
                type="text"
                className={inputClass.input}
                {...register(`tasks.${taskIndex}.taskName` as const)}
                placeholder="Enter task name"
              />
              {errors.tasks?.[taskIndex]?.taskName && (
                <p className={inputClass.error}>
                  {errors.tasks[taskIndex]?.taskName?.message}
                </p>
              )}
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              <label className={inputClass.label}>Checklist Items</label>
              <div className="space-y-2">
                {task.checklistItem.map((_, itemIndex) => (
                  <input
                    key={itemIndex}
                    type="text"
                    className={inputClass.input}
                    placeholder={`Checklist ${itemIndex + 1}`}
                    {...register(
                      `tasks.${taskIndex}.checklistItem.${itemIndex}` as const
                    )}
                  />
                ))}
              </div>
              {errors.tasks?.[taskIndex]?.checklistItem && (
                <p className={inputClass.error}>
                  {errors.tasks[taskIndex]?.checklistItem?.message}
                </p>
              )}
            </div>

            {/* Remove Task Button */}
            {taskFields.length > 1 && (
              <button
                onClick={() => removeTask(taskIndex)}
                className="p-3 cursor-pointer text-red-600 hover:bg-red-50 rounded-md border border-gray-300 transition"
                aria-label="Remove item"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={appendTask}
          className="p-3 text-green-600 hover:bg-green-50 rounded-md border border-gray-300 transition cursor-pointer"
          aria-label="Add item"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Examiner;
