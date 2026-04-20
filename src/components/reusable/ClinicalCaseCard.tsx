import { BookOpenText, ArrowRight } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

interface ClinicalCaseCardProps {
  title?: string;
  subtitle?: string;
  sectionTitle?: string;
  caseTitle?: string;
  caseSubTitle?: string;
  firstButtonTitle?: string;
  secondButtonTitle?: string;
  tags?: string[];
  onCreateQuiz?: () => void;
  onStartQuiz?: () => void;
  onViewAll?: () => void;
  icon?: React.ElementType;
}

const ClinicalCaseCard = ({
  title,
  subtitle,
  caseTitle,
  caseSubTitle,
  tags,
  icon: IconComponent = BookOpenText,
}: // Theme-based styling

  ClinicalCaseCardProps) => {
  // Determine which colors to use

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white border-slate-300`}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4 sm:gap-2">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-[2px]  border-purple-700`}
          >
            <IconComponent className={`w-6 h-6 text-purple-700`} />
          </div>

          {/* Title and Progress */}
          <div>
            <h2 className="text-base font-medium text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="bg-purple-500 w-3 h-3 rounded-full shadow"></div>
      </div>

      {/* Clinical Case Card */}
      <div>
        {/* Tags */}
        <div className="flex gap-2 mb-3">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Quiz Info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 sm:items-center justify-between mt-4">
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-2 line-clamp-1">
              {caseTitle}
            </h4>
            <div className="flex items-center gap-2 text-gray-600 text-sm line-clamp-1">
              {caseSubTitle}
            </div>
          </div>

          {/* Start Quiz Button */}
          <PrimaryButton icon={<ArrowRight className="w-4 h-4" />}>
            Start Case
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCaseCard;
