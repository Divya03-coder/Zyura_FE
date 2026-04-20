import React from "react";
import { GoalStepIndicator } from "./GoalStepIndicator";
import {
  ModalProps,
  SelectedSubject,
  Step1Props,
  Step2Props,
  Step3Props,
  Subject,
} from "./type";

// GoalModal Component
export const GoalModal: React.FC<ModalProps> = ({
  showModal,
  currentStep,
  onClose,
  children,
  isEditMode = false,
}) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {/* {isEditMode ? "Update Your Preference" : "Create Your Preference"} */}
            {isEditMode ? "Update Your Smart Study Planner" : "Create Your Smart Study Planner"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4">
          <GoalStepIndicator currentStep={currentStep} />
        </div>

        {children}
      </div>
    </div>
  );
};

// Step 1 Component
export const Step1: React.FC<Step1Props> = ({
  formData,
  onFormDataChange,
  onNext,
  onCancel,
}) => {
  const isValid =
    formData.goalName &&
    formData.studyHoursPerDay > 0 &&
    formData.startDate &&
    formData.endDate;

  return (
    <div className="p-6">
      {/* <h3 className="text-lg font-semibold mb-4">Setup Duration</h3> */}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {/* Preference name */}
          Plan Name
        </label>
        <input
          type="text"
          placeholder="e.g., Final Year MBBS Preparation"
          value={formData.goalName}
          onChange={(e) =>
            onFormDataChange({ ...formData, goalName: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Study hours per day
        </label>
        <input
          type="number"
          min="0"
          value={formData.studyHoursPerDay}
          onChange={(e) =>
            onFormDataChange({
              ...formData,
              studyHoursPerDay: Number(e.target.value),
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              onFormDataChange({ ...formData, startDate: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            min={formData.startDate}
            onChange={(e) =>
              onFormDataChange({ ...formData, endDate: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`px-6 py-2 rounded-lg cursor-pointer ${
            isValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Subject Item Component
export const SubjectItem: React.FC<{
  subject: Subject;
  selected: SelectedSubject | undefined;
  onSubjectToggle: (name: string) => void;
  onFullSubjectToggle: (name: string) => void;
  onSystemToggle: (subjectName: string, systemName: string) => void;
}> = ({
  subject,
  selected,
  onSubjectToggle,
  onFullSubjectToggle,
  onSystemToggle,
}) => {
  const isSelected = !!selected;

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSubjectToggle(subject.name)}
            className="mt-1 w-4 h-4"
          />
          <div className="flex-1">
            <div className="font-medium">{subject.name}</div>
            <div className="text-sm text-gray-500">
              {subject.systems.length} systems
            </div>

            {isSelected && selected && (
              <>
                <div className="mt-3 flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">Cover Full Subject</span>
                  <label className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={selected.fullSubject}
                      onChange={() => onFullSubjectToggle(subject.name)}
                      className="opacity-0 w-0 h-0 peer"
                    />
                    <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-all peer-checked:bg-blue-500">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
                    </span>
                  </label>
                </div>

                {!selected.fullSubject && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        const elem = document.getElementById(
                          `systems-${subject.name}`
                        );
                        if (elem) elem.classList.toggle("hidden");
                      }}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      Select Systems ({selected.systemNames.length}/
                      {subject.systems.length} selected)
                    </button>
                    <div
                      id={`systems-${subject.name}`}
                      className="hidden mt-2 space-y-2 pl-4"
                    >
                      {subject.systems.map((system) => (
                        <label
                          key={system}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={selected.systemNames.includes(system)}
                            onChange={() =>
                              onSystemToggle(subject.name, system)
                            }
                            className="w-4 h-4"
                          />
                          {system}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2 Component
export const Step2: React.FC<Step2Props> = ({
  availableSubjects,
  selectedSubjects,
  onSubjectToggle,
  onFullSubjectToggle,
  onSystemToggle,
  onPrevious,
  onNext,
}) => {
  const getTotalSystemsSelected = () => {
    return selectedSubjects.reduce(
      (total, subject) => total + subject.systemNames.length,
      0
    );
  };

  const isValid = selectedSubjects.length > 0 && getTotalSystemsSelected() > 0;

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2">Select Subjects</h3>
      <p className="text-sm text-gray-600 mb-4">
        Choose subjects and decide whether to cover them fully or select
        specific systems
      </p>

      <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm">
        <span className="font-medium">
          {selectedSubjects.length} subjects selected
        </span>
        <span className="mx-2">·</span>
        <span className="font-medium">
          {getTotalSystemsSelected()} systems total
        </span>
      </div>

      <div className="max-h-80 overflow-y-auto mb-4 space-y-3">
        {availableSubjects.map((subject) => {
          const selected = selectedSubjects.find(
            (s) => s.subjectName === subject.name
          );
          return (
            <SubjectItem
              key={subject.name}
              subject={subject}
              selected={selected}
              onSubjectToggle={onSubjectToggle}
              onFullSubjectToggle={onFullSubjectToggle}
              onSystemToggle={onSystemToggle}
            />
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          ← Previous
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`px-6 py-2 rounded-lg cursor-pointer ${
            isValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Step 3 Component
export const Step3: React.FC<Step3Props> = ({
  formData,
  selectedSubjects,
  //   availableSubjects,
  calculateDuration,
  calculateTotalStudyHours,
  calculateHoursPerSystem,
  onPrevious,
  isEditMode = false,
  onCreate,
  isLoading = false,
}) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Goal Overview</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">Goal Name</div>
          <div className="font-medium">{formData.goalName}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">Study Hours/Day</div>
          <div className="font-medium">{formData.studyHoursPerDay} hours</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">Total Duration</div>
          <div className="font-medium">{calculateDuration()} days</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">Total Study Hours</div>
          <div className="font-medium">{calculateTotalStudyHours()} hours</div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm">
        Each system will receive approximately{" "}
        <span className="font-semibold">{calculateHoursPerSystem()} hours</span>
      </div>

      <div className="max-h-60 overflow-y-auto space-y-4 mb-6">
        {selectedSubjects.map((subject) => {
          return (
            <div
              key={subject.subjectName}
              className="border-l-4 border-blue-500 pl-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-lg">{subject.subjectName}</div>
                <div className="text-sm text-gray-600">
                  {subject.fullSubject
                    ? "Full Subject"
                    : `${subject.systemNames.length} systems`}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {subject.systemNames.map((system) => (
                  <span
                    key={system}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          ← Previous
        </button>
        <button
          onClick={onCreate}
          disabled={isLoading}
          className={`px-6 py-2 rounded-lg cursor-pointer ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isLoading
            ? "Saving..."
            : isEditMode
            ? "Update Preference"
            : "Create Preference"}
        </button>
      </div>
    </div>
  );
};
