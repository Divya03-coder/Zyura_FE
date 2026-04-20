/* eslint-disable @typescript-eslint/no-explicit-any */
import { timeAgo } from "@/common/timeAgo";
import {
  useDeleteSocialPostMutation,
  useSaveCommentSocialPostMutation,
  useSaveOrUpdateReactionSocialPostMutation,
  useUpdateSocialPostMutation,
} from "@/store/features/socialPost/social.api";
import { TSocialPost } from "@/store/storeTypes/social";
import { Ellipsis, Heart, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import LoaderWithoutText from "@/common/LoaderWithoutText";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import PostDelete from "./PostDelete";
import PostEdit from "./PostEdit";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PostCardProps {
  post: TSocialPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const [saveReaction] = useSaveOrUpdateReactionSocialPostMutation();
  const [createComment, { isLoading }] = useSaveCommentSocialPostMutation();
  const [updatePost] = useUpdateSocialPostMutation();
  const [postDelete] = useDeleteSocialPostMutation();
  const [likeCount, setLikeCount] = useState(post?.reaction?.length || 0);
  const userId = useSelector((state: any) => state.auth.user.profile._id);
  // const userEmail = useSelector((state: any) => state.auth.user.account.email);
  const [isLiked, setIsLiked] = useState(post?.reaction?.includes(userId));

  // drawer comment state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  // delete post
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // edit post
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // image preview state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleLike = async () => {
    try {
      // optimistic update
      const nextLiked = !isLiked;
      setIsLiked(nextLiked);
      setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1));

      // send only _id to backend
      await saveReaction({
        id: post._id,
        body: { reaction: true },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update reaction:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    console.log(newComment);

    try {
      await createComment({
        id: post._id,
        body: { comment: newComment },
      }).unwrap();

      setNewComment("");
      // setIsDrawerOpen(!isDrawerOpen);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleAddComment();
  //   }
  // }

  // delete function
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await postDelete(post?._id).unwrap();
      // console.log("Post deleted:", post?._id)
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
      setIsDeleting(false);
    }
  };

  // console.log("edit option :", post?.comments[1]?.commentedBy?.email === userEmail);

  // edit function
  const handleUpdatePost = async (updatedData: {
    content: string;
    topic?: string;
    image?: File | null;
  }) => {
    try {
      const formData = new FormData();

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      const dataObj = {
        topic: updatedData.topic,
        content: updatedData.content,
      };
      formData.append("data", JSON.stringify(dataObj));

      await updatePost({
        id: post._id,
        body: formData,
      }).unwrap();

      setEditDialogOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Left side: profile info */}
          <div className="flex items-start gap-3">
            <img
              src={
                post?.postedBy?.profile_photo?.trim()
                  ? post.postedBy.profile_photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">
                  {post?.postedBy?.firstName} {post?.postedBy?.lastName}
                </h3>
                {post?.profileType && (
                  <span className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-[25px]">
                    {post.profileType}
                  </span>
                )}
                {post?.topic && (
                  <span className="px-2 py-0.5 bg-gray-200 text-black text-xs rounded-[25px]">
                    {post?.topic}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {timeAgo(post?.createdAt)}
              </p>
            </div>
          </div>
          {/* Right side: Ellipsis Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {post?.postedBy?._id === userId && (
                <Ellipsis
                  className="cursor-pointer text-gray-600 hover:text-gray-900"
                  size={20}
                />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                Edit Post
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteDialogOpen(true)}
                className="text-red-600 focus:text-red-700"
              >
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <p className="text-gray-800 mb-4 leading-relaxed">{post?.content}</p>

        {/* Post Image */}
        {post?.postImage && post.postImage.trim() !== "" && (
          <div className="mb-4">
            <img
              src={post.postImage}
              alt="Post"
              className="w-full h-auto max-h-[500px] object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity bg-gray-100"
              onClick={() => setIsPreviewOpen(true)}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        {/* ✅ Reaction Buttons */}
        <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors 
           ${isLiked ? "text-red-500" : "text-gray-600"}
            `}
          >
            <Heart
              className={`w-5 h-5 cursor-pointer 
              ${isLiked ? "fill-current" : ""}
            `}
            />
            <span className="text-sm">{likeCount}</span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5 cursor-pointer" />
            <span className="text-sm">{post?.comments?.length || 0}</span>
          </button>

          {/* <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
            <Share2 className="w-5 h-5 cursor-pointer" />
            <span className="text-sm">{post?.share || 0}</span>
          </button> */}
        </div>

        {/* Comment Drawer */}
        <div>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="max-h-[90vh] w-full bg-transparent mx-auto border-none">
              <div className="mx-auto w-full max-w-2xl bg-white px-2 rounded-2xl">
                {/* Drawer Header */}
                <DrawerHeader className="text-left flex flex-row justify-between items-start border-b">
                  <DrawerTitle className="text-xl font-semibold">
                    Comments ({post?.comments?.length || 0})
                  </DrawerTitle>
                  <DrawerClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-5 w-5 cursor-pointer text-red-600" />
                    <span className="sr-only">Close</span>
                  </DrawerClose>
                </DrawerHeader>

                {/* Comments List */}
                <div className="p-4 pb-20 max-h-[60vh] overflow-y-auto">
                  {post?.comments && post.comments.length > 0 ? (
                    <div className="space-y-4">
                      {post.comments.map((comment: any) => (
                        <div key={comment._id} className="flex gap-3">
                          <img
                            src={
                              comment?.commentedBy?.profileImage?.trim()
                                ? comment?.commentedBy?.profileImage
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="bg-gray-100 rounded-lg p-3">
                              <h4 className="font-semibold text-sm">
                                {comment?.commentedBy?.name}
                              </h4>
                              <p className="text-gray-800 mt-1">
                                {comment.comment}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{timeAgo(comment.createdAt)}</span>
                              {/* {comment?.commentedBy?.email.trim() === userEmail && (
                                <button className="hover:text-blue-500">Edit</button>
                              )} */}

                              {/* <button className="hover:text-blue-500">Like</button>
                            <button className="hover:text-blue-500">Reply</button> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>

                {/* Comment Input - Fixed at bottom */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-2xl mx-auto">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleAddComment();
                        }
                      }}
                      placeholder="Write a comment..."
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleAddComment}
                      type="submit"
                      disabled={newComment.trim() === ""}
                      className="  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <LoaderWithoutText />
                      ) : (
                        <Send className="w-6 h-6 text-blue-600 cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <PostDelete
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
      />
      {/* Edit Dialog */}
      {editDialogOpen && (
        <PostEdit
          post={post}
          onClose={() => setEditDialogOpen(false)}
          onUpdate={handleUpdatePost}
          isLoading={isLoading}
        />
      )}

      {/* Image Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl border-none bg-transparent p-0 shadow-none outline-none"
        >
          <DialogTitle>
            <VisuallyHidden>Post Image Preview</VisuallyHidden>
          </DialogTitle>
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={post?.postImage || ""}
              alt="Full size post"
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
