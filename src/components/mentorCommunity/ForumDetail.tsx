/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import message from "@/assets/dashboard/message-circle.svg";
import {
  useSingleForumGetQuery,
  useForumComentUpdateMutation,
} from "@/store/features/mentor-dashboard/forum/forum.api";
import { useNavigate, useParams } from "react-router-dom";
import GlobalLoader from "@/common/GlobalLoader";
import Breadcrumb from "../reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../dashboard/gamified-learning/types";
import { SingleForumPost } from "@/store/storeTypes/forum";
import { timeAgo } from "@/common/timeAgo";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";
// import { toast } from "sonner";

interface CommentFormData {
  comment: string;
}

const ForumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: forumData,
    isLoading,
    isError,
    refetch,
  } = useSingleForumGetQuery(id);
  const [forumComentUpdate, { isLoading: isPosting }] =
    useForumComentUpdateMutation();
  const user = useSelector(selectUser);
  const role = user?.account?.role;
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CommentFormData>({
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });

  console.log("this is forum data", forumData);

  const handleOnBack = () => navigate(-1);

  if (isLoading) return <GlobalLoader />;
  if (isError || !forumData) {
    return (
      <div>
        <button
          onClick={handleOnBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4 cursor-pointer" />
          <span className="text-sm sm:text-base">Back to Forums</span>
        </button>
        <div className="text-center text-gray-500">
          Error loading forum post
        </div>
      </div>
    );
  }

  const post: SingleForumPost = forumData.data;

  // Handle Comment Submit with React Hook Form - FIXED BODY STRUCTURE
  const onSubmit = async (data: CommentFormData) => {
    try {
      // Send comment directly in the body
      const body = data.comment.trim();
      const bodyData = { comment: body };

      const res = await forumComentUpdate({
        id,
        body: bodyData, // Directly sending the comment string
      }).unwrap();

      console.log("Comment response:", res);

      if (res.success) {
        reset();
        refetch();
      }
    } catch (error: any) {
      console.error("Error posting comment:", error);
    }
  };

  const handleCancel = () => {
    reset();
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    {
      name: "Community",
      link:
        role === "MENTOR"
          ? "/mentor/mentor-community"
          : "/dashboard/community-event",
    },
  ];

  return (
    <div className="py-2 px-2">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleOnBack}
          className="flex gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl text-left sm:text-2xl font-semibold text-gray-900">
            Forums
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Connect, learn, and grow with the medical education community
          </p>
        </div>
      </div>

      {/* Forum Post */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
            <img src={message} alt="Forum icon" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {post.title}
              </h2>
              <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white text-xs rounded-full w-fit">
                {post.category}
              </span>
            </div>

            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {post.content}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-3">
              {post?.postedBy?.firstName} {post?.postedBy?.lastName} •{" "}
              {timeAgo(post?.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 text-xs sm:text-sm">💡</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Answers & Solutions ({post?.comments?.length || 0})
          </h3>
        </div>

        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Share your knowledge and help fellow students
        </p>

        {/* Comments List - Fixed Structure */}
        <div className="space-y-6 my-6">
          {post.comments && post.comments.length > 0 ? (
            [...post.comments].reverse().map((comment, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    {/* <span className="text-sm font-medium">
                                            {comment?.name?.split(' ').map(n => n.charAt(0)).join('') || 'US'}
                                        </span> */}
                    <img
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
                      src={
                        comment?.photo ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFR-YpemDCwzHIkc9lrQHD6AUFpxQMCfQKoA&s"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {comment?.name || "Anonymous User"}
                      </h4>
                      <span className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-[25px] w-fit">
                        {comment?.studentType?.replace(/_/g, " ") || "Student"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(comment?.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  {comment.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No answers yet. Be the first to respond!
            </div>
          )}
        </div>

        {/* Answer Input - Using React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-4 sm:pt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
              Your Answer
            </h4>
            <textarea
              {...register("comment", {
                required: "Comment is required",
                minLength: {
                  value: 1,
                  message: "Comment cannot be empty",
                },
                validate: (value) =>
                  value.trim() !== "" || "Comment cannot be only whitespace",
              })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }
              }}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] sm:min-h-[120px] resize-none mb-2 text-sm sm:text-base"
              disabled={isPosting}
            />
            {errors.comment && (
              <p className="text-red-500 text-xs mb-4">
                {errors.comment.message}
              </p>
            )}
            <div className="flex sm:justify-end gap-4">
              <button
                type="submit"
                disabled={!isValid || isPosting}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
              >
                {isPosting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPosting}
                className="px-4 py-2 cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForumDetail;
