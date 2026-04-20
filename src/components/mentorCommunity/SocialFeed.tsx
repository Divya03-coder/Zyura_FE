import { useRef, useState } from "react";
import { z } from "zod";
import PostCard from "./PostCard";
// import MentorSearchFilter from "./MentorSearchFilter";
import { Textarea } from "@/components/ui/textarea";
import { FileImage, Image, X } from "lucide-react";
import MentorUploadFiles from "./MentorUploadFiles";
import ForumDetail from "./ForumDetail";
import CreateDiscussion from "./CreateDiscussion";
import {
  useCreateSocialPostMutation,
  useGetAllSocialPostQuery,
} from "@/store/features/socialPost/social.api";
import { TSocialPost } from "@/store/storeTypes/social";
import GlobalLoader from "@/common/GlobalLoader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Zod schema
const postSchema = z.object({
  text: z.string().min(1, "Post content is required"),
  tags: z.array(z.string()).optional(),
  file: z.any().optional(),
});

type ForumView = "list" | "detail" | "create";

const SocialFeed = () => {
  const { data, isLoading, isError } = useGetAllSocialPostQuery({});
  const [createSocialPost] = useCreateSocialPostMutation();

  const [text, setText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [view, setView] = useState<ForumView>("list");
  const [selectedForumId, setSelectedForumId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const postCreationRef = useRef<HTMLDivElement>(null);
  const posts = data?.data ?? [];

  const handleBackToList = () => {
    setView("list");
    setSelectedForumId(null);
  };

  const handleUploadComplete = (file: File) => {
    setUploadedFile(file);
    setShowUploadModal(false);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handlePostSubmit = async () => {
    // Validate using Zod
    const result = postSchema.safeParse({
      text,
      tags,
      file: uploadedFile,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      toast.error(Object.values(errors).flat().join("\n"), {
        style: { background: "red", color: "white" },
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      if (uploadedFile) {
        formData.append("image", uploadedFile);
      }

      const dataObj = {
        topic: tags?.[0] || "",
        content: text,
      };
      formData.append("data", JSON.stringify(dataObj));

      await createSocialPost(formData).unwrap();

      setText("");
      setTags([]);
      setUploadedFile(null);
      setUploadedImage(null);
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setText("");
    setUploadedImage(null);
    setUploadedFile(null);
    setTags([]);
  };

  const handleCreateNewPost = () => {
    if (postCreationRef.current) {
      postCreationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        const textarea = document.querySelector("textarea");
        if (textarea) textarea.focus();
      }, 500);
    }
  };

  if (isLoading) return <GlobalLoader />;
  if (isError || posts.length === 0)
    return (
      <p className="text-center text-gray-500">No forum posts available</p>
    );

  return (
    <div>
      <div className="mb-4 md:mb-8 space-y-2 flex items-center justify-between">
        <div>
          <h4 className="text-[16px] md:text-[20px] font-semibold text-[#0F172A]">
            Social Feed
          </h4>
          <p className="text-[14px] md:text-[16px] text-gray-600">
            Share knowledge, ask questions, and connect with the medical
            community
          </p>
        </div>
        <button
          onClick={handleCreateNewPost}
          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md cursor-pointer"
        >
          Create New Post
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2">
        {/* Sidebar */}
        {/* <div className="w-full lg:w-1/4">
          <MentorSearchFilter />
        </div> */}

        {/* Main Feed */}
        <div className="w-full flex flex-col gap-4">
          <div className="space-y-4">
            {posts.map((post: TSocialPost) => (
              <PostCard key={post?._id} post={post} />
            ))}
          </div>

          {/* Create new post */}
          <div
            ref={postCreationRef}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h4 className="text-[16px] text-[#71717A] font-medium mb-4">
              What's on your mind?
            </h4>

            {uploadedImage && (
              <div className="mb-4 relative w-fit">
                <img
                  src={uploadedImage}
                  alt="Uploaded preview"
                  className="max-w-full h-auto max-h-48 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setPreviewImage(uploadedImage);
                    setIsPreviewOpen(true);
                  }}
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {uploadedFile && (
              <div className="mb-4 relative w-fit">
                {uploadedFile.type.startsWith("image/") ? (
                  <>
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Uploaded preview"
                      className="max-w-full h-auto max-h-48 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setPreviewImage(URL.createObjectURL(uploadedFile));
                        setIsPreviewOpen(true);
                      }}
                    />
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : uploadedFile.type === "application/pdf" ? (
                  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded pr-8 relative">
                    <FileImage className="w-6 h-6 text-blue-600" />
                    <p className="text-sm truncate">{uploadedFile.name}</p>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            <Textarea
              className="w-full rounded-md h-24 p-3 text-sm placeholder:text-gray-500 resize-none"
              placeholder="What's on your mind? Share a study tip, ask a question, or start a discussion..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 mt-2">
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
                        {/* × */}
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-black">
                <button onClick={() => setShowUploadModal(true)} type="button">
                  <Image className="w-5 h-5 cursor-pointer" />
                </button>
                {/* <button onClick={() => setShowUploadModal(true)} type="button">
                  <Paperclip className="w-5 h-5 cursor-pointer" />
                </button> */}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={handlePostSubmit}
                  disabled={!text.trim() || (showUploadModal && !uploadedFile)}
                  className="px-4 py-1.5 rounded bg-[#030213] text-white text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading && (
                    <span className="loader-border w-4 h-4 border-2 border-t-white rounded-full animate-spin"></span>
                  )}
                  Post
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1.5 rounded bg-gray-100 text-black hover:bg-gray-300 text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Views */}
        {view === "detail" && selectedForumId && <ForumDetail />}
        {view === "create" && <CreateDiscussion onBack={handleBackToList} />}

        {/* Upload modal */}
        {showUploadModal && (
          <MentorUploadFiles
            onClose={() => setShowUploadModal(false)}
            onUploadComplete={handleUploadComplete}
          />
        )}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl border-none bg-transparent p-0 shadow-none outline-none"
        >
          <DialogTitle>
            <VisuallyHidden>Image Preview</VisuallyHidden>
          </DialogTitle>
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={previewImage || ""}
              alt="Full size preview"
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialFeed;
