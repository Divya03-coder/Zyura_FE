import { useDeleteStudyModeTreeMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { ChevronRight, FileText } from "lucide-react";
import { useState } from "react";
import { SelectedNode } from "./StudyMode";
import TreeAction from "./TreeAction";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type TOCItem = {
  _id?: string;
  title: string;
  count?: number;
  children?: TOCItem[];
};

interface TreeNodeProps {
  item: TOCItem;
  depth: number;
  onSelect: (value: SelectedNode) => void;
  parentNames: { subject?: string; system?: string; topic?: string };
  initialContent: TOCItem | null;
  setInitialContent: React.Dispatch<React.SetStateAction<TOCItem | null>>;
  openModal: () => void;
  selectedNode: SelectedNode;
}
const TreeNode: React.FC<TreeNodeProps> = ({
  item,
  depth,
  onSelect,
  parentNames,
  initialContent,
  setInitialContent,
  openModal,
  selectedNode,
}) => {
  const [open, setOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  const t = (s: string) => s.trim();

  const isActive = (() => {
    if (!selectedNode) return false;
    switch (depth) {
      case 0:
        return (
          t(selectedNode.subject) === t(item.title) &&
          !t(selectedNode.system) &&
          !t(selectedNode.topic) &&
          !t(selectedNode.subtopic)
        );
      case 1:
        return (
          t(selectedNode.system) === t(item.title) &&
          !t(selectedNode.topic) &&
          !t(selectedNode.subtopic)
        );
      case 2:
        return t(selectedNode.topic) === t(item.title) && !t(selectedNode.subtopic);
      case 3:
        return t(selectedNode.subtopic) === t(item.title);
      default:
        return false;
    }
  })();

  const handleClick = () => {
    setOpen(!open);
    // Update selected node

    if (depth === 0)
      onSelect({ subject: t(item.title), system: "", topic: "", subtopic: "" });
    if (depth === 1)
      onSelect({
        subject: t(parentNames.subject || ""),
        system: t(item.title),
        topic: "",
        subtopic: "",
      });
    if (depth === 2)
      onSelect({
        subject: t(parentNames.subject || ""),
        system: t(parentNames.system || ""),
        topic: t(item.title),
        subtopic: "",
      });
    if (depth === 3)
      onSelect({
        subject: t(parentNames.subject || ""),
        system: t(parentNames.system || ""),
        topic: t(parentNames.topic || ""),
        subtopic: t(item.title),
      });
  };

  const handleEdit = (data: TOCItem) => {
    openModal();
    if (data) {
      setInitialContent(data);
    }
  };

  // delete logic
  const [deleteStudyMode, { isLoading: isDeleting }] =
    useDeleteStudyModeTreeMutation();

  const handleDelete = async (id: string) => {
    if (id) {
      await deleteStudyMode(id);
    }
  };

  const displayCount = item.count ?? item.children?.length;

  return (
    <div className="ml-[2px] font-arial ">
      <div
        className={`flex items-center justify-between py-1.5 pe-1 cursor-pointer rounded-md ${isActive ? "bg-gray-200" : ""
          } ${depth > 0 ? "ml-0" : ""}`}
        onClick={handleClick} >
        <div className="flex items-center gap-1.5 cursor-pointer">
          {hasChildren ? (
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className="text-gray-500 hover:text-gray-700" >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""
                  }`}
              />
            </button>
          ) : (
            <span className="w-4 " />
          )}
          <FileText className="w-4 h-4 text-gray-500" />


          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={`text-xs ${depth >= 2 ? "text-gray-500 truncate max-w-[120px] w-3/4" : "text-gray-800 font-medium truncate max-w-[120px] w-3/4"
                  }`}
              >
                {item.title}
              </span>
            </TooltipTrigger>

            <TooltipContent side="top" sideOffset={4}>
              {item.title}
            </TooltipContent>

          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          {displayCount !== undefined && (
            <span className="text-xs bg-gray-100 text-gray-600 rounded-md px-2 py-[1px] min-w-[10px]">
              {displayCount}
            </span>
          )}
          {displayCount !== undefined && (
            <span className="text-xs bg-gray-100 text-gray-600 rounded-md px-2 py-[1px] min-w-[10px]">
              Q-{displayCount}
            </span>
          )}
          

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="cursor-pointer text-black bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium font-medium leading-5 rounded-base text-sm focus:outline-none"
              >
                <LucideBadgeInfo className="w-4" />
              </button>
            </TooltipTrigger>
            {displayCount !== undefined && (
              <TooltipContent side="top" sideOffset={4}>
                Total Question {displayCount}
              </TooltipContent>
            )}
          </Tooltip> */}
          {depth === 0 && (
            <TreeAction
              handleDelete={() => handleDelete(item._id!)}
              isDeleting={isDeleting}
              handleEdit={() => handleEdit(item)}
            />
          )}
        </div>
      </div>

      {open && hasChildren && (
        <div className="ml-2 border-l border-gray-200 pl-2">
          {item.children!.map((child, idx) => (
            <TreeNode
              key={idx}
              item={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedNode={selectedNode}
              parentNames={{
                subject: depth === 0 ? t(item.title) : parentNames.subject || "",
                system: depth === 1 ? t(item.title) : parentNames.system,
                topic: depth === 2 ? t(item.title) : parentNames.topic,
              }}
              initialContent={initialContent}
              setInitialContent={setInitialContent}
              openModal={openModal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
