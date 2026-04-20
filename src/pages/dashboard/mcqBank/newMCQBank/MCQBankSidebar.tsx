import { ExpandedNodes, TreeNode, TreeNodeComponent } from "@/components/Test";
import { X } from "lucide-react";

// Sidebar Component
interface SidebarProps {
  treeData: TreeNode[];
  selectedId: string;
  expandedNodes: ExpandedNodes;
  isOpen: boolean;
  onSelect: (id: string, name: string) => void;
  onToggleExpand: (id: string) => void;
  onClose: () => void;
}

export const MCQBankSidebar: React.FC<SidebarProps> = ({
  treeData,
  selectedId,
  expandedNodes,
  isOpen,
  onSelect,
  onToggleExpand,
  onClose,
}) => (
  <>
    {/* Mobile Overlay */}
    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        onClick={onClose}
      />
    )}

    {/* Sidebar */}
    <div
      className={`
      fixed lg:relative top-0 left-0 h-full
      w-80 bg-white border-r border-slate-200 
      overflow-y-auto z-40
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
    >
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">MCQ Bank</h2>
          <p className="text-xs text-slate-500 mt-1">
            Select a topic to practice
          </p>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-slate-100 rounded"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-2">
        {treeData.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            level={0}
            selectedId={selectedId}
            expandedNodes={expandedNodes}
            onSelect={onSelect}
            onToggleExpand={onToggleExpand}
          />
        ))}
      </div>
    </div>
  </>
);
