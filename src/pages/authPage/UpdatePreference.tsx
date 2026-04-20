import { useEffect, useState } from "react";
import {
  UpdatePreferenceData,
  Availability,
  // AvailabilitySlot,
  TimeSlot,
} from "./schemas";

interface Props {
  onNext: (data: UpdatePreferenceData) => void;
  onBack: () => void;
  onSkip?: () => void;
  defaultValues?: Partial<UpdatePreferenceData>;
}

export default function UpdatePreference({
  onNext,
  onBack,
  onSkip,
  defaultValues,
}: Props) {
  const [bio, setBio] = useState(defaultValues?.bio || "");
  const [subjects, setSubjects] = useState<string[]>(
    defaultValues?.subjects || [""]
  );
  const [languages, setLanguages] = useState<string[]>(
    defaultValues?.languages || [""]
  );
  const [hourlyRate, setHourlyRate] = useState(defaultValues?.hourlyRate || 0);
  const [currency, setCurrency] = useState(defaultValues?.currency || "USD");

  const initialAvailability: Availability = {
    Monday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
    Tuesday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
    Wednesday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
    Thursday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
    Friday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
    Saturday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
    Sunday: { enabled: false, slots: [{ startTime: "", endTime: "" }] },
  };

  const [availability, setAvailability] = useState<Availability>(
    (defaultValues?.availability as unknown as Availability) ||
      initialAvailability
  );
  const [errors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      setBio(defaultValues.bio || "");
      setSubjects(defaultValues.subjects || [""]);
      setLanguages(defaultValues.languages || [""]);
      setHourlyRate(defaultValues.hourlyRate || 0);
      setCurrency(defaultValues.currency || "USD");
      if (defaultValues.availability) {
        setAvailability(defaultValues.availability as unknown as Availability);
      }
    }
  }, [defaultValues]);

  const addInput = (type: "subject" | "language") => {
    if (type === "subject") {
      const lastValue = subjects[subjects.length - 1];
      if (!lastValue || lastValue.trim() === "") {
        return;
      }
      setSubjects([...subjects, ""]);
    } else {
      const lastValue = languages[languages.length - 1];
      if (!lastValue || lastValue.trim() === "") {
        return;
      }
      setLanguages([...languages, ""]);
    }
  };

  const removeInput = (type: "subject" | "language", index: number) => {
    if (type === "subject") {
      const newSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(newSubjects.length > 0 ? newSubjects : [""]);
    } else {
      const newLanguages = languages.filter((_, i) => i !== index);
      setLanguages(newLanguages.length > 0 ? newLanguages : [""]);
    }
  };

  const updateSubject = (index: number, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = value;
    setSubjects(newSubjects);
  };

  const updateLanguage = (index: number, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    setLanguages(newLanguages);
  };

  const updateAvailability = (day: keyof Availability, enabled: boolean) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled,
        slots: enabled ? prev[day].slots : [{ startTime: "", endTime: "" }],
      },
    }));
  };

  const addSlot = (day: keyof Availability) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { startTime: "", endTime: "" }],
      },
    }));
  };

  const removeSlot = (day: keyof Availability, index: number) => {
    setAvailability((prev) => {
      const newSlots = prev[day].slots.filter((_, i) => i !== index);
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots:
            newSlots.length > 0 ? newSlots : [{ startTime: "", endTime: "" }],
        },
      };
    });
  };

  const updateSlot = (
    day: keyof Availability,
    index: number,
    field: keyof TimeSlot,
    value: string
  ) => {
    setAvailability((prev) => {
      const newSlots = [...prev[day].slots];
      newSlots[index] = { ...newSlots[index], [field]: value };
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: newSlots,
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Filter out empty strings from subjects and languages
    const filteredData: UpdatePreferenceData = {
      bio,
      subjects: subjects.filter((s) => s.trim() !== ""),
      languages: languages.filter((l) => l.trim() !== ""),
      hourlyRate,
      currency,
      availability,
    };
    onNext(filteredData);
    setIsSubmitting(false);
  };

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const displayHourStr =
      displayHour < 10 ? `0${displayHour}` : `${displayHour}`;
    return `${displayHourStr}:00 ${period}`;
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => formatTime(i));

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-semibold">Complete Your Profile</h2>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-blue-500 underline hover:text-blue-600 font-medium"
          >
            Skip
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-6">
        Upload your professional documents to complete verification.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Professional Bio */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">
            Professional Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio"
            className="w-full p-3 border border-slate-300 rounded-md resize-none h-24"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
          )}
        </div>

        {/* Subject You Teach */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">
            Subject You Teach
          </label>

          {/* Display existing subjects as tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {subjects.map((subject, index) => {
              if (!subject || subject.trim() === "") return null;
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md text-sm"
                >
                  <span>{subject}</span>
                  <button
                    type="button"
                    onClick={() => removeInput("subject", index)}
                    className="text-gray-600 hover:text-red-600 font-bold text-lg leading-none"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Input field for new subject */}
          <div className="flex items-center gap-2">
            <input
              value={subjects[subjects.length - 1] || ""}
              onChange={(e) =>
                updateSubject(subjects.length - 1, e.target.value)
              }
              placeholder="Enter subject"
              className="flex-1 p-3 border border-slate-300 rounded-md"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInput("subject");
                }
              }}
            />
            <button
              type="button"
              onClick={() => addInput("subject")}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
            >
              Add
            </button>
          </div>
          {errors.subjects && (
            <p className="text-red-500 text-sm mt-1">{errors.subjects}</p>
          )}
        </div>

        {/* Language */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-2">Language</label>

          {/* Display existing languages as tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {languages.map((language, index) => {
              if (!language || language.trim() === "") return null;
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md text-sm"
                >
                  <span>{language}</span>
                  <button
                    type="button"
                    onClick={() => removeInput("language", index)}
                    className="text-gray-600 hover:text-red-600 font-bold text-lg leading-none"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Input field for new language */}
          <div className="flex items-center gap-2">
            <input
              value={languages[languages.length - 1] || ""}
              onChange={(e) =>
                updateLanguage(languages.length - 1, e.target.value)
              }
              placeholder="Enter language"
              className="flex-1 p-3 border border-slate-300 rounded-md"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInput("language");
                }
              }}
            />
            <button
              type="button"
              onClick={() => addInput("language")}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
            >
              Add
            </button>
          </div>
          {errors.languages && (
            <p className="text-red-500 text-sm mt-1">{errors.languages}</p>
          )}
        </div>

        {/* Hourly Rate */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">
              Hourly rate
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              placeholder="Enter hourly rate"
              className="w-full p-3 border border-slate-300 rounded-md"
            />
            {errors.hourlyRate && (
              <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md"
            >
              <option value="USD">USD ($)</option>
              {/* <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option> */}
            </select>
          </div>
        </div>

        {/* Availability */}
        <div className="border border-slate-300 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium mb-4">Availability</label>
          <div className="space-y-2">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => {
              const dayKey = day as keyof Availability;
              const isEnabled = availability[dayKey].enabled;
              const slots = availability[dayKey].slots;

              return (
                <div
                  key={day}
                  className="flex flex-col py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={(e) =>
                          updateAvailability(dayKey, e.target.checked)
                        }
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm font-medium w-24">{day}</span>
                    </div>

                    {isEnabled && (
                      <button
                        type="button"
                        onClick={() => addSlot(dayKey)}
                        className="text-xs text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
                      >
                        + Add Slot
                      </button>
                    )}
                  </div>

                  {/* Time Range Slots */}
                  {isEnabled && (
                    <div className="mt-2 space-y-2 ml-7">
                      {slots.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <select
                            value={slot.startTime}
                            onChange={(e) =>
                              updateSlot(
                                dayKey,
                                index,
                                "startTime",
                                e.target.value
                              )
                            }
                            className="px-3 py-1.5 border border-slate-300 rounded text-sm bg-white"
                          >
                            <option value="">Start</option>
                            {timeOptions.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <span className="text-sm text-gray-500">-</span>
                          <select
                            value={slot.endTime}
                            onChange={(e) =>
                              updateSlot(
                                dayKey,
                                index,
                                "endTime",
                                e.target.value
                              )
                            }
                            className="px-3 py-1.5 border border-slate-300 rounded text-sm bg-white"
                          >
                            <option value="">End</option>
                            {timeOptions.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>

                          {slots.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSlot(dayKey, index)}
                              className="text-red-500 hover:text-red-600 text-lg font-bold leading-none px-2 cursor-pointer"
                              title="Remove slot"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {!isEnabled && slots[0].startTime && slots[0].endTime && (
                    <div className="mt-1 ml-7 text-xs text-gray-400">
                      {slots
                        .map((s) => `${s.startTime}-${s.endTime}`)
                        .join(", ")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {errors?.availability && (
            <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
