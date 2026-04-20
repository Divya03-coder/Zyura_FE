import { useState } from "react";
import { Search } from "lucide-react";
import PostCard from "./PostCard";

const SocialFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Posts");
  const options = [
    "All Posts",
    "Medical Cases",
    "Study Tips",
    "Questions",
    "Resources",
  ];
  const [isOpen, setIsOpen] = useState(false);

  const posts = [
    {
      id: 1,
      author: {
        name: "Dr. Sarah Chen",
        username: "@sarahchen_md",
        avatar:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
        badge: "resident",
        specialty: "Cardiology",
      },
      timestamp: "2 hours ago",
      content:
        "Just finished an amazing case presentation on acute MI management! ...",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      hashtags: ["#Cardiology", "#MedicalEducation"],
      likes: 247,
      comments: 23,
      shares: 15,
    },
    // ...other posts
  ];

  return (
    <div className="pb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Search & Filter
            </h3>

            {/* Search */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="w-full relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by type:
              </label>

              {/* Selected Box */}
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 flex justify-between items-center cursor-pointer focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{filterType}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Dropdown Options */}
              {isOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {options.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setFilterType(option);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors ${
                        option === filterType
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;
