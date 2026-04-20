import CommonSkeletonLoader from "@/components/reusable/CommonSkeletonLoader";
import StudyGroupCard from "./StudyGroupCard";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus, Search } from "lucide-react";
import { CreateGroupModal } from "./CreateGroupModal";
import { useState } from "react";
import { FindGroupModal } from "./FindGroupModal";
import { Link } from "react-router-dom";

interface StudyGroupPageProps {
  studyGroups: StudyGroup[];
  isLoading: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  subject: string;
  leader: string;
}
const StudyGroupPage: React.FC<StudyGroupPageProps> = ({ isLoading }) => {
  const [open, setOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);

  if (isLoading) {
    return <CommonSkeletonLoader />;
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl text-gray-800 font-semibold">My Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mt-6">
          {Array(4)
            .fill(null)
            .map(() => (
              <Link to={"/dashboard/group-details"}>
                <StudyGroupCard></StudyGroupCard>
              </Link>
            ))}
        </div>
      </div>

      <div className="mt-12">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-800 font-semibold">My Groups</h2>
            <div className="flex items-center gap-3">
              <PrimaryButton
                icon={<Plus className="w-4 h-4" />}
                bgType="solid"
                iconPosition="left"
                bgColor="bg-[#10B981]"
                className="h-10 mb-4 hover:bg-[#04865b] text-sm font-medium hover:opacity-80 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Create a Group
              </PrimaryButton>

              <PrimaryButton
                icon={<Search className="w-4 h-4" />}
                bgType="solid"
                iconPosition="left"
                bgColor="bg-blue-btn-1"
                className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
                onClick={() => setFindOpen(true)}
              >
                Find Your Group
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mt-6">
          {Array(4)
            .fill(null)
            .map(() => (
              <StudyGroupCard></StudyGroupCard>
            ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl text-gray-800 font-semibold">My Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-6">
          {Array(3)
            .fill(null)
            .map(() => (
              <StudyGroupCard></StudyGroupCard>
            ))}
        </div>
      </div>
      <CreateGroupModal open={open} setOpen={setOpen} />
      <FindGroupModal
        open={findOpen}
        setOpen={setFindOpen}
        // onFinalSubmit={handleFindGroup}
      />
    </div>
  );
};

export default StudyGroupPage;
