import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search, UserPlus, Trash2, Users } from "lucide-react";
import { ChatUser } from "./types";
import {
  useRemoveMemberFromGroupMutation,
  useAddMembersIntoGroupMutation,
  useGetAllCommunityMembersQuery,
} from "@/store/features/group/groupApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogTitle } from "@radix-ui/react-dialog";

interface GroupInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: ChatUser | any;
}

const GroupInfoModal: React.FC<GroupInfoModalProps> = ({
  isOpen,
  onClose,
  group,
}) => {
  const [isAddMemberMode, setIsAddMemberMode] = useState(false);
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [existingMemberSearchTerm, setExistingMemberSearchTerm] = useState("");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  // Removed useGetMyGroupByIdQuery as it uses a non-existent endpoint.
  // We use the group prop passed from parent (ChatSidebar/Messages)
  const activeGroup = group;
  
  const members = activeGroup?.groupMembers || [];

  const [removeMember, { isLoading: isRemoving }] =
    useRemoveMemberFromGroupMutation();
  const [addMembers, { isLoading: isAdding }] =
    useAddMembersIntoGroupMutation();

  const {
    data: communityMembersData,
    isLoading: isLoadingCommunity,
    refetch: refetchCommunity,
  } = useGetAllCommunityMembersQuery(
    { searchTerm: memberSearchTerm },
    { skip: !isAddMemberMode }
  );
  
  const handleRemoveMember = async (memberId: string) => {
    if (!memberId) {
      toast.error("Invalid member ID");
      return;
    }
    try {
      await removeMember({
        id: activeGroup.id || activeGroup._id,
        memberId,
      }).unwrap();
      toast.success("Member removed successfully");
    } catch (error) {
      toast.error("Failed to remove member");
      console.error(error);
    }
  };

  const handleAddMembers = async () => {
    if (selectedMemberIds.length === 0) return;
    try {
      await addMembers({
        id: group.id || group._id,
        members: selectedMemberIds,
      }).unwrap();
      toast.success(`${selectedMemberIds.length} members added successfully`);
      setSelectedMemberIds([]);
      setIsAddMemberMode(false);
      refetchCommunity();
    } catch (error) {
      toast.error("Failed to add members");
      console.error(error);
    }
  };

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  // const members = activeGroup?.groupMembers || [];
  const filteredExistingMembers = (activeGroup?.groupMembers || []).filter(
    (member: any) => {
      const name = (
        member.firstName ||
        member.profile_id?.firstName ||
        member.profile_id?.name ||
        ""
      ).toLowerCase();
      return name.includes(existingMemberSearchTerm.toLowerCase());
    }
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-[#1D2733] text-white border-none">
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <div className="relative p-6 flex flex-col items-center justify-center bg-[#24303F]">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-green-500 flex items-center justify-center text-white text-3xl font-bold">
              {activeGroup?.groupLogo ? (
                <img
                  src={activeGroup.groupLogo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                activeGroup?.name?.substring(0, 2).toUpperCase() ||
                activeGroup?.groupName?.substring(0, 2).toUpperCase() ||
                "GP"
              )}
            </div>
            <DialogTitle className="text-xl font-semibold mb-1">
              {activeGroup?.name || activeGroup?.groupName}
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              {members.length} members
            </DialogDescription>

            {/* Action Buttons */}
            {/* <div className="flex gap-4 mt-6">
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="p-3 rounded-xl bg-[#2C394A] group-hover:bg-[#344456] transition-colors">
                  <Bell className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-gray-400">Mute</span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="p-3 rounded-xl bg-[#2C394A] group-hover:bg-[#344456] transition-colors">
                  <Settings className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-gray-400">Manage</span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="p-3 rounded-xl bg-[#2C394A] group-hover:bg-[#344456] transition-colors">
                  <ShieldAlert className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-gray-400">Report</span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="p-3 rounded-xl bg-[#2C394A] group-hover:bg-[#344456] transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs text-gray-400">More</span>
              </div>
            </div> */}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Media Stats (Optional UI element from image) */}
            {/* <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300 hover:text-white cursor-pointer px-2">
                <div className="w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <span className="text-sm">3 photos</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 hover:text-white cursor-pointer px-2 border-b border-gray-700 pb-4">
                <div className="w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <span className="text-sm">13 shared links</span>
              </div>
            </div> */}

            {/* Members List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                  {members.length} MEMBERS
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsAddMemberMode(false)}
                    className={`p-1 rounded transition-colors ${
                      !isAddMemberMode
                        ? "text-blue-400 bg-[#2C394A]"
                        : "text-gray-400 hover:text-blue-400"
                    }`}
                  >
                    <Users className="w-5 h-5 cursor-pointer" />
                  </button>
                  <button
                    onClick={() => setIsAddMemberMode(true)}
                    className={`p-1 rounded transition-colors ${
                      isAddMemberMode
                        ? "text-blue-400 bg-[#2C394A]"
                        : "text-gray-400 hover:text-blue-400"
                    }`}
                  >
                    <UserPlus className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>

              {isAddMemberMode ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                      ADD MEMBERS FROM COMMUNITY
                    </span>
                    {selectedMemberIds.length > 0 && (
                      <Button
                        size="sm"
                        onClick={handleAddMembers}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 cursor-pointer"
                        disabled={isAdding}
                      >
                        Add Selected ({selectedMemberIds.length})
                      </Button>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Search community..."
                      className="bg-[#2C394A] border-none text-white placeholder:text-gray-500"
                      value={memberSearchTerm}
                      onChange={(e) => setMemberSearchTerm(e.target.value)}
                    />
                    {isAdding && (
                      <div className="absolute right-3 top-2.5">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent animate-spin rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 py-2">
                    {isLoadingCommunity ? (
                      <div className="text-center py-4 text-sm text-gray-500">
                        Loading members...
                      </div>
                    ) : communityMembersData?.data?.length > 0 ? (
                      communityMembersData.data.map((member: any) => (
                        <div
                          key={member._id}
                          onClick={() =>
                            toggleMemberSelection(member?.accountId)
                          }
                          className={`flex items-center justify-between p-2 rounded-lg group transition-colors cursor-pointer ${
                            selectedMemberIds.includes(member?.accountId)
                              ? "bg-[#344456]"
                              : "hover:bg-[#2C394A]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={
                                    member.profile_photo ||
                                    member.profile_id?.profilePhoto ||
                                    member.profile_id?.profileImg
                                  }
                                />
                                <AvatarFallback className="bg-blue-600 text-white">
                                  {
                                    (member.firstName ||
                                      member.profile_id?.firstName ||
                                      member.profile_id?.name ||
                                      "?")[0]
                                  }
                                </AvatarFallback>
                              </Avatar>
                              {selectedMemberIds.includes(
                                member?.accountId
                              ) && (
                                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-[#1D2733]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {member.firstName ||
                                  member.profile_id?.firstName ||
                                  member.profile_id?.name}
                              </p>
                              <p className="text-xs text-gray-500 font-medium capitalize">
                                {member.role || "Member"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-sm text-gray-500">
                        No members found
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                      EXISTING GROUP MEMBERS
                    </span>
                    <div className="relative w-1/2">
                      <Input
                        placeholder="Search members..."
                        className="bg-[#2C394A] border-none text-white placeholder:text-gray-500 h-8 text-xs pl-8"
                        value={existingMemberSearchTerm}
                        onChange={(e) =>
                          setExistingMemberSearchTerm(e.target.value)
                        }
                      />
                      <Search className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                    {filteredExistingMembers.length > 0 ? (
                      filteredExistingMembers.map((member: any) => (
                        <div
                          key={member._id}
                          className="flex items-center justify-between group px-2"
                        >
                          <div className="flex items-center gap-3 cursor-pointer">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={
                                  member.profile_photo ||
                                  member.profile_id?.profilePhoto ||
                                  member.profile_id?.profileImg
                                }
                              />
                              <AvatarFallback className="bg-gray-700 text-white">
                                {
                                  (member.firstName ||
                                    member.profile_id?.firstName ||
                                    member.profile_id?.name ||
                                    "?")[0]
                                }
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {member.firstName ||
                                  member.profile_id?.firstName ||
                                  member.profile_id?.name ||
                                  "Unknown Member"}
                              </p>
                              {/* <p className="text-xs ytext-blue-400">online</p> */}
                            </div>
                          </div>
                          <button
                            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                            onClick={() => handleRemoveMember(member._id)}
                            disabled={isRemoving}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-sm text-gray-500">
                        No members found in group
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInfoModal;
