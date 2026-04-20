import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpenText, Plus, Trash2 } from "lucide-react";

// ✅ Zod Schema
const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  type: z.string().min(1, "Select a question type"),
  difficulty: z.string().min(1, "Select difficulty"),
  question: z.string().min(1, "Question is required"),
  options: z
    .array(optionSchema)
    .min(2, "At least 2 options required")
    .refine((options) => options.some((o) => o.isCorrect), {
      message: "At least one option must be marked correct",
    })
    .refine((options) => options.filter((o) => o.isCorrect).length === 1, {
      message: "Exactly one option must be marked correct",
    }),
  explanation: z.string().optional(),
});

type QuestionForm = z.infer<typeof questionSchema>;

export default function CreateQuestion() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuestionForm>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      type: "",
      difficulty: "",
      question: "",
      options: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
      explanation: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: QuestionForm) => {
    console.log("Final Question Data:", data);
    alert("Question Created Successfully!");
  };

  const options = watch("options");

  return (
    <div className="p-6 sm:p-10">
      <div className="flex items-start gap-2">
        <BookOpenText className="mt-2" />
        <div>
          <h1 className="text-xl font-semibold">Set Question</h1>
          <p className="text-gray-500 mb-6">
            Basic concepts in cardiovascular medicine
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg border border-gray-200 space-y-8"
      >
        {/* Question Type */}
        <div>
          <label className="block font-medium mb-1">Select Question Type</label>
          <select
            {...register("type")}
            className="w-full border border-[#9DA4AE] rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True/False">True / False</option>
            <option value="Short Answer">Short Answer</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* Difficulty */}
        <div>
          <label className="block font-medium mb-1">Difficulty label</label>
          <select
            {...register("difficulty")}
            className="w-full border border-[#9DA4AE] rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-500 text-sm">{errors.difficulty.message}</p>
          )}
        </div>

        {/* Question */}
        <div>
          <label className="block font-medium mb-1">Question</label>
          <textarea
            {...register("question")}
            placeholder="Enter question text"
            className="w-full border border-[#9DA4AE] rounded-md p-2 focus:ring-2 focus:ring-blue-500 min-h-[80px]"
          />
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question.message}</p>
          )}
        </div>

        {/* Answer Options */}
        <div>
          <label className="block font-medium mb-2">Answer Option</label>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-3 border border-[#9DA4AE] rounded-md px-3 py-2 bg-blue-50"
              >
                {/* Option Label */}
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}
                </span>

                {/* Option Input */}
                <input
                  {...register(`options.${index}.text`)}
                  placeholder={`Enter option ${String.fromCharCode(
                    65 + index
                  )}`}
                  className="flex-1 border border-[#9DA4AE] rounded-md p-2"
                />

                {/* Correct Radio */}
                <label className="flex items-center gap-1 text-sm text-gray-600">
                  <input
                    type="radio"
                    checked={options[index]?.isCorrect}
                    onChange={() => {
                      const updated = options.map((opt, i) => ({
                        ...opt,
                        isCorrect: i === index,
                      }));
                      setValue("options", updated);
                    }}
                  />
                  Correct
                </label>

                {/* Remove Option */}
                {fields.length > 2 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Option */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => append({ text: "", isCorrect: false })}
              className="flex items-center gap-1 text-blue-600 text-sm border border-blue-300 px-3 py-1 rounded-md hover:bg-blue-50"
            >
              <Plus className="w-4 h-4" /> Add Another Option
            </button>
          </div>

          {/* Error */}
          {errors.options && (
            <p className="text-red-500 text-sm mt-2">
              {errors.options.message as string}
            </p>
          )}
        </div>

        {/* Explanation */}
        <div>
          <label className="block font-medium mb-1">Explanation</label>
          <textarea
            {...register("explanation")}
            placeholder="Explain (optional)"
            className="w-full border border-[#9DA4AE] rounded-md p-2 min-h-[60px]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Set Question
        </button>
      </form>
    </div>
  );
}
