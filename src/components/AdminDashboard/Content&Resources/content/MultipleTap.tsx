import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
interface Tab {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export const tabs = [
  { label: "MCQ", value: "MCQ" },
  { label: "Flashcard", value: "Flashcard" },
  { label: "Clinical Case", value: "ClinicalCase" },
  { label: "OSCE", value: "OSCE" },
  { label: "Notes", value: "Notes" },
];
const MultipleTap: React.FC<Tab> = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="flex items-center justify-between  gap-4">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
};

export default MultipleTap;
