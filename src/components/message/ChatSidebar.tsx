import React, { useState } from "react";
import { Search, Users, User, Plus, MoreVertical, Trash2, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { ChatUser } from "./types";
import { CreateGroupModal } from "../dashboard/community-event/study-group-page/CreateGroupModal";
import { useGetAllMyGroupsQuery, useDeleteMyGroupMutation } from "@/store/features/group/groupApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface ChatSidebarProps {
  users: ChatUser[];
  activeUserId: string;
  onUserSelect: (item: any) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  users,
  activeUserId,
  onUserSelect,
}) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [groupToDelete, setGroupToDelete] = useState<any>(null);

  // Fetch groups from API
  const { data: groupsData } = useGetAllMyGroupsQuery(searchQuery);
  const [deleteGroup] = useDeleteMyGroupMutation();
  const myGroups = groupsData?.data || [];

  const handleCreateGroup = () => {
    setSelectedGroup(null);
    setShowCreateGroupModal(true);
  };

  const handleEditGroup = (e: React.MouseEvent, group: any) => {
    e.stopPropagation();
    setSelectedGroup(group);
    setShowCreateGroupModal(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, group: any) => {
    e.stopPropagation();
    setGroupToDelete(group);
  };

  const confirmDelete = async () => {
    if (groupToDelete) {
      try {
        await deleteGroup(groupToDelete?._id).unwrap();
        toast.success("Group deleted successfully");
        setGroupToDelete(null);
      } catch (error) {
        console.error("Failed to delete group:", error);
        toast.error("Failed to delete group");
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user?.name
      ?.toLowerCase()
      ?.includes(searchQuery.toLowerCase());
    if (activeTab === "All") return matchesSearch;
    if (activeTab === "Groups")
      return matchesSearch && user.userType === "group";
    if (activeTab === "Mentor")
      return matchesSearch && user.userType === "mentor";
    return matchesSearch;
  });

  return (
    <>
      <CreateGroupModal 
        open={showCreateGroupModal} 
        setOpen={setShowCreateGroupModal}
        groupToEdit={selectedGroup}
      />
      
      <AlertDialog open={!!groupToDelete} onOpenChange={(open) => !open && setGroupToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the group
              "{groupToDelete?.groupName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by, contact or keyword"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["All", "Groups", "Mentor"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 && myGroups.length === 0 && activeTab === "Groups" ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No groups found</p>
          </div>
        ) : activeTab === "Groups" ? (
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                <Link to="#" className="hover:underline ">
                  Explore Groups
                </Link>
              </h3>
              <button 
                onClick={handleCreateGroup}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <span>
                  {" "}
                  <div>
                    <Plus className="w-6 h-6 inline" />
                    <p className="hidden lg:inline">Create new Group</p>
                  </div>
                </span>
              </button>
            </div>

            {/* Group Cards */}
            <div className="space-y-3">
              <div className="space-y-3">
                {myGroups.length > 0 ? (
                  myGroups.map((group: any) => (
                    <div
                      key={group?._id}
                      onClick={() => onUserSelect({ ...group, userType: 'group', id: group?._id, name: group.groupName })}
                      className={`p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 group relative ${
                        activeUserId === group._id ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                          {group.groupLogo ? (
                            <img 
                              src={group.groupLogo} 
                              alt={group.groupName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Users className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div className="ml-3 flex-1 min-w-0 pr-6">
                          <h4 className="text-[.75rem] sm:text-sm md:text-wrap font-medium text-gray-900 truncate">
                            {group.groupName}
                          </h4>
                          
                          <p className="text-xs text-gray-500 truncate">
                            {group.groupDescription}
                          </p>
                          <p className="text-xs text-gray-500">
                            {group.groupMembers?.length || 0} members
                          </p>
                        </div>
                        
                        {/* Action Menu */}
                        <div className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-gray-200 rounded-full" onClick={(e) => e.stopPropagation()}>
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => handleEditGroup(e, group)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Group
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => handleDeleteClick(e, group)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Group
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4 text-sm">
                    No groups found
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Default for All & Mentor tabs
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onUserSelect(user)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                activeUserId === user.id ? "bg-blue-50" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  {user.userType === "mentor" ? (
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">Dr</span>
                    </div>
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              {/* Info */}
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                    {user.userType === "mentor" && (
                      <span className="ml-1 text-xs text-blue-600 font-medium">
                        Mentor
                      </span>
                    )}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {user.lastMessage || user.lastSeen}
                </p>
                {user.timeAgo && (
                  <p className="text-xs text-gray-400 mt-1">{user.timeAgo}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ChatSidebar;
