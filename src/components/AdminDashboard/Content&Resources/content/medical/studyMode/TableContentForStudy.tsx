import preview from "@/assets/dashboard/tablePreview.svg";
import CommonHeader from "@/common/header/CommonHeader";
import { countLeafNodes, sortByTitleAZ } from "@/help/help";
import { useGetStudyModeTreeQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { Plus } from "lucide-react";
import { SelectedNode } from "./StudyMode";
import TreeNode from "./TreeNode";

// TOC type
export type TOCItem = {
  _id?: string;
  title: string;
  count?: number;
  children?: TOCItem[];
};

// Backend types
interface SubTopic {
  _id?: string;
  subtopicName?: string;
}

interface Topic {
  _id?: string;
  topicName: string;
  subTopics: (SubTopic | string)[];
}

interface System {
  _id?: string;
  name: string;
  topics: Topic[];
}

interface Subject {
  _id: string;
  subjectName: string;
  systems: System[];
  createdAt: string;
  updatedAt: string;
}

const mapBackendToTOC = (data: Subject[]): TOCItem[] => {
  return sortByTitleAZ(
    data.map((subject) => ({
      _id: subject._id,
      title: subject.subjectName.trim(),
      count: countLeafNodes(subject),

      // count: subject.systems.reduce(
      //   (acc, sys) =>
      //     acc +
      //     sys.topics.reduce(
      //       (tAcc, topic) =>
      //         tAcc + (topic.subTopics ? topic.subTopics.length : 0),
      //       0
      //     ),
      //   0
      // ),

      children: sortByTitleAZ(
        subject.systems.map((sys) => ({
          _id: sys._id,
          title: sys.name.trim(),

          // count: sys.topics.reduce(
          //   (tAcc, topic) =>
          //     tAcc + (topic.subTopics ? topic.subTopics.length : 0),
          //   0
          // ),
          count: countLeafNodes(sys),

          children: sortByTitleAZ(
            sys.topics.map((topic) => ({
              _id: topic._id,
              title: topic.topicName.trim(),

              count: countLeafNodes(topic),

              children: topic.subTopics
                ? sortByTitleAZ(
                    topic.subTopics.map((sub) => ({
                      _id: typeof sub === "string" ? undefined : sub._id,
                      title:
                        typeof sub === "string"
                          ? sub.trim()
                          : (sub.subtopicName || "").trim(),
                    })),
                  )
                : undefined,
            })),
          ),
        })),
      ),
    })),
  );
};

interface TableContentProps {
  openModal: () => void;
  setSelectedNode: (node: SelectedNode) => void;
  initialContent: TOCItem | null;
  setInitialContent: React.Dispatch<React.SetStateAction<TOCItem | null>>;
  selectedNode: SelectedNode;
}

const TableContentForStudy: React.FC<TableContentProps> = ({
  openModal,
  setSelectedNode,
  initialContent,
  setInitialContent,
  selectedNode,
}) => {
  const { profileType, contentFor } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  const { data: allStudyModeData } = useGetStudyModeTreeQuery(
    { profileType, contentFor },
    { refetchOnMountOrArgChange: true },
  );

  const tocDataFromBackend: TOCItem[] = allStudyModeData
    ? mapBackendToTOC(allStudyModeData.data as Subject[])
    : [];

  return (
    <div className="w-[400px] min-h-[400px] bg-white rounded-2xl shadow p-4 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-[1px]">
        <div className="flex items-center gap-2">
          <img src={preview} className="w-5 h-5" alt="alt" />
          <CommonHeader className="text-[#0A0A0A] font-arial! line-clamp-1">
            Subject for {profileType}
          </CommonHeader>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        {tocDataFromBackend.map((item, idx) => (
          <TreeNode
            key={idx}
            item={item}
            depth={0}
            onSelect={setSelectedNode}
            parentNames={{}}
            selectedNode={selectedNode}
            initialContent={initialContent}
            setInitialContent={setInitialContent}
            openModal={openModal}
          />
        ))}
      </div>
    </div>
  );
};

export default TableContentForStudy;
