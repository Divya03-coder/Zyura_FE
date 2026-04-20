import { useState, useMemo } from "react";
import question from "@/assets/dashboard/question.svg";
import GlobalLoader from "@/common/GlobalLoader";
import { useAllForumGetQuery } from "@/store/features/mentor-dashboard/forum/forum.api";
import { TForumGet } from "@/store/storeTypes/forum";
import { Link } from "react-router-dom";
import Pagination from "../reusable/Pagination";
import { timeAgo } from "@/common/timeAgo";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";

const ForumList = () => {
  const { data, isLoading, isError } = useAllForumGetQuery(undefined);
  const posts: TForumGet[] = useMemo(() => data?.data ?? [], [data]);

  const user = useSelector(selectUser);
  console.log(user);
  const role = user?.account?.role;
  console.log(role);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const productsPerPage = 5; // items per page

  const totalProducts = posts?.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Slice data for pagination
  const currentPosts = useMemo(() => {
    if (showAll) return posts;
    const startIndex = (currentPage - 1) * productsPerPage;
    return posts.slice(startIndex, startIndex + productsPerPage);
  }, [posts, currentPage, showAll]);

  const handleShowAll = () => setShowAll((prev) => !prev);

  // Loading state
  if (isLoading) return <GlobalLoader />;
  if (isError || totalProducts === 0)
    return (
      <p className="text-center text-gray-500">No forum posts available</p>
    );

  // Start & end range for display text
  const start = showAll ? 1 : (currentPage - 1) * productsPerPage + 1;
  const end = showAll
    ? totalProducts
    : Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div className="space-y-4">
      {currentPosts.map((post) => (
        <Link
          to={
            role === "MENTOR"
              ? `/mentor/forum-details/${post?._id}`
              : `/dashboard/forum-details/${post?._id}`
          }
          key={post?._id}
        >
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow mt-6 cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img
                    src={question}
                    alt="icon"
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  {post?.title}
                </h3>
              </div>
              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full w-fit">
                {post?.category}
              </span>
            </div>

            <p className="text-gray-600 mb-3 text-sm sm:text-base">
              {post?.content}
            </p>

            <div className="mt-4 sm:mt-6 space-y-2">
              <div className="flex gap-2 flex-wrap">
                {post?.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-black text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {post?.postedBy?.firstName} {post?.postedBy?.lastName} •{" "}
                {timeAgo(post?.createdAt)}
              </p>
            </div>
          </div>
        </Link>
      ))}

      {/* ✅ Pagination */}
      <div className="mt-16 mb-32 flex justify-center space-x-5">
        {!showAll && totalPages > 1 && (
          <Pagination
            title="All Forums"
            showText={`Showing ${start} to ${end} of ${totalProducts} Forums`}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggleShowAll={handleShowAll}
            showAll={showAll}
          />
        )}

        {/* ✅ Show All Button (Optional) */}
        {showAll && (
          <div className="flex justify-center">
            <button
              onClick={handleShowAll}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumList;
