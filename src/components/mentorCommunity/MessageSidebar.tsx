// import React, { useState } from "react";
// import { Search, Users, User, Plus } from "lucide-react";
// import { Link } from "react-router-dom";
// import { ChatUser } from "./types";

// interface ChatSidebarProps {
//   users: ChatUser[];
//   activeUserId: string;
//   onUserSelect: (userId: string) => void;
// }

// const MessageSidebar: React.FC<ChatSidebarProps> = ({
//   users,
//   activeUserId,
//   onUserSelect,
// }) => {
//   const [activeTab, setActiveTab] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = user.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     if (activeTab === "All") return matchesSearch;
//     if (activeTab === "Groups")
//       return matchesSearch && user.userType === "group";
//     if (activeTab === "Mentor")
//       return matchesSearch && user.userType === "mentor";
//     return matchesSearch;
//     if (activeTab === "Mentor")
//       return matchesSearch && user.userType === "mentor";
//     return matchesSearch;
//   });
//   return (
//     <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200">
//       {/* Search Bar */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name"
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Students Tab */}
//       <div className="px-4 py-3 border-b border-gray-200">
//         <button className="px-4 py-1.5 text-sm font-medium text-blue-600 border-2 border-blue-600 rounded">
//           Students
//         </button>
//       </div>

//       {/* User List */}
//       <div className="overflow-y-auto max-h-[500px]">
//         {filteredUsers.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             <p className="text-sm">No students found</p>
//           </div>
//         ) : (
//           filteredUsers.map((user) => (
//             <div
//               key={user.id}
//               onClick={() => onUserSelect(user.id)}
//               className={`flex items-center gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
//                 activeUserId === user.id ? "bg-blue-50" : "bg-white"
//               }`}
//             >
//               {/* Avatar with Online Status */}
//               <div className="relative flex-shrink-0">
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 {user.isOnline && (
//                   <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
//                 )}
//               </div>

//               {/* User Info */}
//               <div className="flex-1 min-w-0">
//                 <h4 className="text-sm font-medium text-gray-900 mb-0.5">
//                   {user.name}
//                 </h4>
//                 <div className="flex items-center gap-2 text-xs text-gray-500">
//                   <span className="truncate">{user.lastMessage}</span>
//                   <span className="flex-shrink-0">· {user.timestamp}</span>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageSidebar;
