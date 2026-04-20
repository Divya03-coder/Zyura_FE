import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus } from "lucide-react";

// ✅ Schema
const questionBankSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  description: z.string().min(1, "Description is required"),
});

type QuestionBankForm = z.infer<typeof questionBankSchema>;

export default function CreateQuestionBank() {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuestionBankForm>({
    resolver: zodResolver(questionBankSchema),
    defaultValues: {
      title: "",
      subject: "",
      tags: [],
      description: "",
    },
  });

  // ✅ Add tag
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags); // sync with form
      setTagInput("");
    }
  };

  // ✅ Remove tag
  const handleRemoveTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setValue("tags", newTags); // sync with form
  };

  // ✅ Submit
  const onSubmit = (data: QuestionBankForm) => {
    console.log("Final Form Data:", data);
    alert("Question Bank Created Successfully!");
  };

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-xl font-semibold mb-2">Create New Question Bank</h1>
      <p className="text-gray-500 mb-6">
        Create a new question bank to organize your questions by subject or
        topic.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg border border-gray-200 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter question bank title"
            className="w-full border border-[#9DA4AE]  rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block font-medium mb-1">Subject</label>
          <select
            {...register("subject")}
            className="w-full border border-[#9DA4AE] rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select subject</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Anatomy">Anatomy</option>
            <option value="Neurology">Neurology</option>
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">Tags</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter tag"
              className="flex-1 border border-[#9DA4AE] rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="p-2 border border-[#9DA4AE] rounded-md bg-blue-50 hover:bg-blue-100"
            >
              <Plus className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          {/* Added Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>

          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <input
            type="text"
            {...register("description")}
            placeholder="Enter description"
            className="w-full border border-[#9DA4AE] rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition mt-16"
        >
          + Create Question Bank
        </button>
      </form>
    </div>
  );
}
