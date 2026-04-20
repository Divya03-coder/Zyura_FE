import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

const formatNumber = (num: number) => {
  if (num < 1000) return num.toString();
  return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
};

const getBadgeColor = (badge: string) => {
  switch (badge.toLowerCase()) {
    case "resident":
      return "bg-blue-600 text-white";
    case "ms3 student":
      return "bg-green-600 text-white";
    case "nurse":
      return "bg-purple-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

const PostCard = ({ post }: { post: any }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
    {/* Post Header */}
    <div className="p-4 pb-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-gray-900">
                {post.author.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${getBadgeColor(
                  post.author.badge
                )}`}
              >
                {post.author.badge}
              </span>
              {post.author.specialty && (
                <span className="text-sm text-gray-600">
                  {post.author.specialty}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-500">
              <span>{post.author.username}</span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>

    {/* Post Content */}
    <div className="px-4 pb-3">
      <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
      {post.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {post.hashtags.map((tag: string, index: number) => (
            <span
              key={index}
              className="text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>

    {/* Post Image */}
    {post.image && (
      <div className="px-4 pb-3">
        <img
          src={post.image}
          alt="Post content"
          className="w-full rounded-lg object-cover max-h-96"
        />
      </div>
    )}

    {/* Post Actions */}
    <div className="px-4 py-3 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
            <Heart size={18} />
            <span className="text-sm">{formatNumber(post.likes)}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <MessageCircle size={18} />
            <span className="text-sm">{formatNumber(post.comments)}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
            <Share2 size={18} />
            <span className="text-sm">{formatNumber(post.shares)}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PostCard;
