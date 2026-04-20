/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import arrow from "@/assets/dashboard/right-arrow.svg"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useSocialPostForumMutation } from "@/store/features/mentor-dashboard/forum/forum.api"
// import { toast } from "sonner"

// ✅ Zod Schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(5, "Content must be at least 5 characters"),
})

type FormData = z.infer<typeof formSchema>

interface CreateDiscussionProps {
  onBack: () => void
}

const CreateDiscussion = ({ onBack }: CreateDiscussionProps) => {
  const [createForumPost, { isLoading }] = useSocialPostForumMutation();
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
    mode: "onChange"
  })

  // Watch form values for real-time validation
  const watchedValues = watch()

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const onSubmit = async (values: FormData) => {
    const payload = {
      ...values,
      tags
    };

    try {
      console.log("Posting payload:", payload);
      const res = await createForumPost(payload).unwrap();
      console.log("Forum post created successfully:", res);

      onBack();
    } catch (error: any) {
      console.error("Error creating forum post:", error);
    }
  };

  const handleCancel = () => {
    // Reset form and tags
    setTags([])
    setTagInput("")
    onBack()
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={handleCancel}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Forums
      </button>

      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center sm:text-left">
          Create New Discussion
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base text-center sm:text-left">
          Connect, learn, and grow with the medical education community
        </p>

        {/* ✅ react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title + Category side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Post Title *
              </label>
              <Input
                placeholder="Type your title"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <Select
                onValueChange={(val) =>
                  setValue("category", val, { shouldValidate: true })
                }
                value={watchedValues.category}
              >
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anatomy">Anatomy</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pharmacology">Pharmacology</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="physiology">Physiology</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Detailed Content *
            </label>
            <Textarea
              placeholder="Provide more details about your discussion"
              className={`min-h-[120px] sm:min-h-[150px] resize-none ${errors.content ? "border-red-500" : ""}`}
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-red-500 mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tags (optional)
            </label>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a tag and press Enter or click Add Tag"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                className="sm:w-auto w-full cursor-pointer"
                disabled={!tagInput.trim()}
              >
                Add Tag
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="flex w-full sm:flex-1 justify-center items-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <img src={arrow} alt="arrow icon" className="w-4 h-4" />
                  Post to Forum
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="w-full sm:w-auto cursor-pointer"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateDiscussion;