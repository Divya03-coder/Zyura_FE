/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Preferences.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PreferencesData, preferencesSchema } from "./schemas";

interface Props {
  onNext: (data: PreferencesData) => void;
  onBack: () => void;
  onSkip: () => void;
  defaultValues?: Partial<PreferencesData>;
}

export default function Preferences({
  onNext,
  onBack,
  defaultValues,
}: // onSkip,
Props) {
  type FormValues = PreferencesData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      subjectPreference: "",
      systemPreference: "",
      topic: "",
      subTopic: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues)
      reset((prev) => ({ ...(prev as any), ...(defaultValues as any) }));
  }, [defaultValues, reset]);

  const onSubmit = (data: FormValues) => {
    onNext(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-bricolage text-3xl font-semibold mb-2">
            Setting your Preferences
          </h2>
          <p className="mb-6">Select preferences to personalize content</p>
        </div>

        <button
          type="button"
          onClick={() => {
            const fakeData: any = {
              subject: "",
              systemPreference: "",
              topic: "",
              subTopic: "",
              photo: undefined,
              bio: "",
            };

            onNext(fakeData); // submit with defaults
          }}
        >
          Skip
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-slate-300 rounded-[12px] bg-white p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Subject Preference
          </label>
          <input
            {...register("subjectPreference")}
            placeholder="Enter your subject preference"
            className="w-full p-3 border border-slate-300 rounded-md"
          />
          {errors.subjectPreference && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subjectPreference.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            System Preference
          </label>
          <select
            {...register("systemPreference")}
            className="w-full p-3 border border-slate-300 rounded-md"
          >
            <option value="">Select System</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="gastroenterology">Gastroenterology</option>
            <option value="pulmonology">Pulmonology</option>
            <option value="dermatology">Dermatology</option>
          </select>
          {errors.systemPreference && (
            <p className="text-red-500 text-sm mt-1">
              {errors.systemPreference.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Topic</label>
          <select
            {...register("topic")}
            className="w-full p-3 border border-slate-300 rounded-md"
          >
            <option value="">Select Topic</option>
            <option value="hypertension">Hypertension</option>
            <option value="stroke">Stroke</option>
            <option value="peptic-ulcer">Peptic Ulcer</option>
            <option value="copd">COPD</option>
            <option value="psoriasis">Psoriasis</option>
          </select>
          {errors.topic && (
            <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sub-Topic</label>
          <select
            {...register("subTopic")}
            className="w-full p-3 border border-slate-300 rounded-md"
          >
            <option value="">Select Sub-Topic</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="gastroenterology">Gastroenterology</option>
            <option value="pulmonology">Pulmonology</option>
            <option value="dermatology">Dermatology</option>
          </select>
          {errors.subTopic && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subTopic.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-main text-white rounded"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
