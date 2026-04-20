interface ClinicalCaseCardProps {
  category: string;
  difficulty: string;
  title: string;
  description: string;
  status: "Completed" | "Start Case";
  onClick: () => void;
}

const ClinicalCaseSingleCard: React.FC<ClinicalCaseCardProps> = ({
  category,
  difficulty,
  title,
  description,
  status,
  onClick,
}) => {
  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow-md flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <span className={`text-sm text-${difficulty.toLowerCase()}`}>{category}</span>
        <span className={`text-sm text-${difficulty.toLowerCase()}`}>{difficulty}</span>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <button
        onClick={onClick}
        className={`py-2 px-4 text-sm rounded-lg ${status === "Completed" ? "bg-gray-200" : "bg-blue-600 text-white"}`}
      >
        {status}
      </button>
    </div>
  );
};

export default ClinicalCaseSingleCard;