// components/PostEdit.tsx
import { useState, useEffect } from "react";
import { X, FileImage, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TSocialPost } from "@/store/storeTypes/social";

interface PostEditProps {
  post: TSocialPost
  onClose: () => void
  onUpdate: (updatedData: { content: string; topic?: string; image?: File | null }) => void
  isLoading?: boolean
}

const PostEdit = ({ post, onClose, onUpdate, isLoading = false }: PostEditProps) => {
  const [text, setText] = useState(post?.content || "")
  const [topic, setTopic] = useState(post?.topic || "")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(post?.postImage || null)

  // Initialize form with post data
  useEffect(() => {
    setText(post?.content || "")
    setTopic(post?.topic || "")
    setPreviewImage(post?.postImage || null)
  }, [post])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Create preview for new image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  const handleRemoveImage = () => {
    setUploadedFile(null)
    setPreviewImage(null)
  }

  const handleSubmit = () => {
    if (!text.trim()) return

    onUpdate({
      content: text,
      topic: topic.trim() || undefined,
      image: uploadedFile
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Post</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Update your post content</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              disabled={isLoading}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Content Textarea */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Post Content
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full rounded-md min-h-[120px] p-3 text-sm placeholder:text-gray-500 resize-none"
                onKeyPress={handleKeyPress}
              />
            </div>

            {/* Topic Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Topic (Optional)
              </label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Add a topic..."
                className="w-full"
              />
            </div>

            {/* Image Preview */}
            {previewImage && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Current Image
                </label>
                <div className="relative inline-block">
                  <img
                    src={previewImage}
                    alt="Post preview"
                    className="max-w-full h-auto max-h-48 rounded-lg object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                    type="button"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Click the button below to change the image
                </p>
              </div>
            )}

            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {previewImage ? "Change Image" : "Add Image (Optional)"}
              </label>
              <label
                htmlFor="image-upload"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer block bg-gray-50"
              >
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <FileImage className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-medium text-sm mb-1">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG (Max 10MB)</p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-4 sm:px-6 py-3 sm:py-4 flex justify-end gap-3 flex-shrink-0">
            <Button
              onClick={onClose}
              variant="outline"
              disabled={isLoading}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!text.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Update Post
                </div>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PostEdit;