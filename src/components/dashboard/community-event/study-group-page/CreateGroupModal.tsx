/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { Search, Camera, Check } from "lucide-react";
import { 
  useCreateNewGroupMutation, 
  useUpdateMyGroupMutation,
  useGetAllCommunityMembersQuery,
  useAddMembersIntoGroupMutation,
  useRemoveMemberFromGroupMutation 
} from "@/store/features/group/groupApi";
import { toast } from "sonner";

interface CreateGroupModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  groupToEdit?: any; // If provided, mode is EDIT
}

export function CreateGroupModal({ open, setOpen, groupToEdit }: CreateGroupModalProps) {
  const isEdit = !!groupToEdit;
  
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [memberSearch, setMemberSearch] = useState("");
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [allFetchedMembers, setAllFetchedMembers] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API Hooks
  const [createGroup, { isLoading: isCreating }] = useCreateNewGroupMutation();
  const [updateGroup, { isLoading: isUpdating }] = useUpdateMyGroupMutation();
  const [addMembers, { isLoading: isAddingMembers }] = useAddMembersIntoGroupMutation();
  const [removeMember, { isLoading: isRemovingMember }] = useRemoveMemberFromGroupMutation();
  
  const { data: membersData, isFetching: isFetchingMembers } = useGetAllCommunityMembersQuery({
    searchTerm: memberSearch,
    page,
    limit: 50 // Increased limit as requested
  });

  const isLoading = isCreating || isUpdating || isAddingMembers || isRemovingMember;

  // Initialize state when opening or switching modes
  useEffect(() => {
    if (open) {
      if (groupToEdit) {
        setGroupName(groupToEdit.groupName || "");
        setDescription(groupToEdit.groupDescription || "");
        setPrivacy(groupToEdit.groupType || "public");
        setPreviewUrl(groupToEdit.groupLogo || null);
        // Initialize selected members safely handling both strings and objects
        const existingMembers = Array.isArray(groupToEdit.groupMembers) 
          ? groupToEdit.groupMembers.map((m: any) => typeof m === 'object' ? (m._id || m.id) : m)
          : [];
        setSelectedMembers(existingMembers);
      } else {
        resetForm();
      }
    }
  }, [open, groupToEdit]);

  // Handle Fetching Members & Pagination
  useEffect(() => {
    // robust check for data structure: support .members or .data.members
    const fetchedList = membersData?.members || membersData?.data?.members;
    const paginationMeta = membersData?.pagination || membersData?.data?.pagination;

    if (fetchedList) {
      if (page === 1) {
        // For page 1, strictly replace the list
        setAllFetchedMembers(fetchedList);
      } else {
        // For subsequent pages, append unique members
        setAllFetchedMembers(prev => {
          const newMembers = fetchedList.filter((newM: any) => 
            !prev.some(m => m.id === newM.id)
          );
          return [...prev, ...newMembers];
        });
      }
      
      // Update hasMore based on actual results vs limit or pagination meta
      const fetchedCount = fetchedList.length;
      if (paginationMeta) {
        setHasMore(paginationMeta.page < paginationMeta.totalPages);
      } else {
         // Fallback if pagination meta specific structure matches or heuristic
         setHasMore(fetchedCount === 50); 
      }
    }
  }, [membersData, page]); // Intentionally keep dep array stable

  // Handle Scroll for Pagination
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Buffer of 20px
    if (scrollHeight - scrollTop <= clientHeight + 20 && hasMore && !isFetchingMembers) {
       setPage(prev => prev + 1);
    }
  };

  // Reset pagination on search
  useEffect(() => {
    setPage(1);
    // We do NOT clear allFetchedMembers here immediately to avoid empty list flash.
    // The query effect (above) will handle replacing the list when page=1 data arrives.
    // However, we reset hasMore to optimistic true to allow fetching.
    setHasMore(true);
  }, [memberSearch]);


  const resetForm = () => {
    setGroupName("");
    setDescription("");
    setPrivacy("public");
    setSelectedMembers([]);
    setFile(null);
    setPreviewUrl(null);
    setMemberSearch("");
    setPage(1);
    // Explicitly clear only if we want to force fresh start visually
    setAllFetchedMembers([]); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    try {
      if (isEdit) {
        // --- EDIT MODE ---
        let hasChanges = false;
        
        // 1. Update Group Details + Image
        const formData = new FormData();
        const dataPayload = {
          groupName,
          groupType: privacy,
          groupDescription: description
        };
        formData.append("data", JSON.stringify(dataPayload));
        if (file) {
          formData.append("file", file);
        }
        
        await updateGroup({ id: groupToEdit._id, formData }).unwrap();
        hasChanges = true;

        // 2. Manage Members
        // Ensure we are working with IDs for comparison
        const originalMemberIds = (groupToEdit.groupMembers || []).map((m: any) => 
          typeof m === 'object' ? (m._id || m.id) : m
        );

        const addedMembers = selectedMembers.filter(id => !originalMemberIds.includes(id));
        const removedMembers = originalMemberIds.filter((id: string) => !selectedMembers.includes(id));

        if (addedMembers.length > 0) {
          await addMembers({ id: groupToEdit._id, members: addedMembers }).unwrap();
          hasChanges = true;
        }

        if (removedMembers.length > 0) {
          // Remove manually one by one as API only supports one at a time currently
          for (const memberId of removedMembers) {
            await removeMember({ id: groupToEdit._id, memberId }).unwrap();
          }
          hasChanges = true;
        }

        if (hasChanges) {
          toast.success("Group updated successfully");
          setOpen(false);
        }

      } else {
        // --- CREATE MODE ---
        // 1. Create Group
        const newGroup = await createGroup({
          groupName,
          groupType: privacy
          // Note: create API doesn't take description/file yet based on payload description
        }).unwrap();
        
        const newGroupId = newGroup?.data?._id;
        
        if (newGroupId) {
          // 2. Update with Description/Image if provided
          if (file || description) {
             const formData = new FormData();
             const dataPayload = {
               groupName, // sending optional fields again required? usually safe to send
               groupType: privacy,
               groupDescription: description
             };
             formData.append("data", JSON.stringify(dataPayload));
             if (file) {
               formData.append("file", file);
             }
             await updateGroup({ id: newGroupId, formData }).unwrap();
          }

          // 3. Add Selected Members
          if (selectedMembers.length > 0) {
            await addMembers({ id: newGroupId, members: selectedMembers }).unwrap();
          }
          
          toast.success("Group created successfully");
          setOpen(false);
        }
      }
    } catch (error: any) {
      console.error("Operation failed:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 pb-0">
           <h2 className="text-lg font-semibold mb-4">{isEdit ? "Update Group" : "Create Study Group"}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
             <div 
               className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer relative overflow-hidden hover:border-blue-500 transition-colors"
               onClick={() => fileInputRef.current?.click()}
             >
               {previewUrl ? (
                 <img src={previewUrl} alt="Group Logo" className="w-full h-full object-cover" />
               ) : (
                 <Camera className="w-8 h-8 text-gray-400" />
               )}
               <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                 <Camera className="w-6 h-6 text-white" />
               </div>
             </div>
             <input 
               type="file" 
               ref={fileInputRef} 
               className="hidden" 
               accept="image/*"
               onChange={handleFileChange}
             />
             <p className="text-xs text-gray-500 mt-2">Tap to upload group icon</p>
          </div>

          {/* Group Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Group Name</label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Cardiology Study Group"
              className="bg-gray-50 border-gray-100"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your group..."
              className="bg-gray-50 border-gray-100 min-h-[80px]"
            />
          </div>

          {/* Privacy */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Privacy</label>
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger className="w-full bg-white border-gray-200">
                <SelectValue placeholder="Select privacy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Member Search & Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Add Members</label>
            
            {/* Selected Members Chips */}
            {selectedMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded-md max-h-[100px] overflow-y-auto">
                {selectedMembers.map(memberId => {
                   // Find member details from fetched list OR groupToEdit initial members
                   const memberFromFetch = allFetchedMembers.find((m: any) => m.id === memberId || m._id === memberId);
                   const memberFromGroup = groupToEdit?.groupMembers?.find((m: any) => (m.id === memberId || m._id === memberId));
                   const member = memberFromFetch || memberFromGroup || { name: "Unknown", id: memberId };
                   
                   return (
                     <div key={memberId} className="flex items-center gap-1 bg-white border px-2 py-1 rounded-full shadow-sm text-xs">
                       <div className="w-4 h-4 rounded-full bg-gray-200 overflow-hidden">
                          {(member.profilePhoto || member.profileImg) ? (
                            <img src={member.profilePhoto || member.profileImg} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="flex items-center justify-center h-full w-full bg-blue-100 text-blue-600 font-bold text-[8px]">{member.name?.[0]}</span>
                          )}
                       </div>
                       <span className="max-w-[80px] truncate">{member.name}</span>
                       <button 
                         onClick={() => handleMemberToggle(memberId)}
                         className="ml-1 hover:text-red-500"
                       >
                         &times;
                       </button>
                     </div>
                   );
                })}
              </div>
            )}

            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                value={memberSearch}
                onChange={(e) => {
                  setMemberSearch(e.target.value);
                }}
                placeholder="Search people..." 
                className="pl-9 bg-white border-gray-200"
              />
            </div>
            
            <div 
              className="mt-2 border rounded-lg max-h-[200px] overflow-y-auto divide-y"
              onScroll={handleScroll}
            >
              {allFetchedMembers.length === 0 && !isFetchingMembers ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No people found (Fetched: {allFetchedMembers.length})
                </div>
              ) : (
                <>
                  {allFetchedMembers.map((member: any) => {
                    const memberId = member.id || member._id; // Robust ID check
                    const isSelected = selectedMembers.includes(memberId);
                    return (
                      <div
                        key={memberId}
                        className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 ${isSelected ? "bg-blue-50/50" : ""}`}
                        onClick={() => handleMemberToggle(memberId)}
                      >
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                             {member.profilePhoto ? (
                               <img src={member.profilePhoto} alt={member.name} className="w-full h-full object-cover" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">
                                 {member.name?.[0]}
                               </div>
                             )}
                           </div>
                           <span className="text-sm text-gray-900">{member.name}</span>
                        </div>
                        
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    );
                  })}
                  
                  {isFetchingMembers && (
                    <div className="p-2 text-center text-xs text-gray-400">Loading more...</div>
                  )}
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 text-right">
              {selectedMembers.length} selected
            </p>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
            <Button 
               variant="outline" 
               onClick={() => setOpen(false)}
               disabled={isLoading}
             >
               Cancel
             </Button>
             <Button 
               onClick={handleSubmit} 
               disabled={isLoading}
               className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
             >
               {isLoading ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create Group")}
             </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
