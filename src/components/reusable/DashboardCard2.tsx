import { BookOpen, Plus, Play, BrainCog } from "lucide-react";

// Color theme configurations
type ThemeKey =
  | "pink"
  | "blue"
  | "green"
  | "orange"
  | "indigo"
  | "teal"
  | "red"
  | "yellow";

const colorThemes: Record<
  ThemeKey,
  {
    cardBg: string;
    cardBorder: string;
    iconBg: string;
    iconColor: string;
    createButtonBg: string;
    createButtonBorder: string;
    createButtonText: string;
    viewAllText: string;
    quizCardBg: string;
    quizCardBorder: string;
  }
> = {
  pink: {
    cardBg: "bg-gradient-to-r to-pink-50 from-white",
    cardBorder: "border-pink-300",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    createButtonBg: "bg-white",
    createButtonBorder: "border-pink-300",
    createButtonText: "text-gray-700",
    viewAllText: "text-purple-600 hover:text-purple-700",
    quizCardBg: "bg-white",
    quizCardBorder: "border-gray-200",
  },
  blue: {
    cardBg: "bg-gradient-to-r to-blue-50 from-white",
    cardBorder: "border-blue-300",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    createButtonBg: "bg-white",
    createButtonBorder: "border-blue-300",
    createButtonText: "text-gray-700",
    viewAllText: "text-blue-600 hover:text-blue-700",
    quizCardBg: "bg-white",
    quizCardBorder: "border-gray-200",
  },
  green: {
    cardBg: "bg-gradient-to-r to-green-50 from-white",
    cardBorder: "border-green-300",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    createButtonBg: "bg-white",
    createButtonBorder: "border-green-300",
    createButtonText: "text-gray-700",
    viewAllText: "text-green-600 hover:text-green-700",
    quizCardBg: "bg-white",
    quizCardBorder: "border-gray-200",
  },
  orange: {
    cardBg: "bg-gradient-to-r to-orange-50 from-white",
    cardBorder: "border-orange-300",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    createButtonBg: "bg-white",
    createButtonBorder: "border-orange-300",
    createButtonText: "text-gray-700",
    viewAllText: "text-orange-600 hover:text-orange-700",
    quizCardBg: "bg-white",
    quizCardBorder: "border-gray-200",
  },
  indigo: {
    cardBg: "bg-gradient-to-r to-indigo-50 from-white",
    cardBorder: "border-indigo-300",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    createButtonBg: "bg-white",
    createButtonBorder: "border-indigo-300",
    createButtonText: "text-gray-700",
    viewAllText: "text-indigo-600 hover:text-indigo-700",
    quizCardBg: "bg-white",
    quizCardBorder: "border-gray-200",
  },
  teal: {
    cardBg: "bg-gradient-to-r to-teal-50 from-white",
    cardBorder: "border-teal-300",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    createButtonBg: "bg-white",
    createButtonBorder: "border-teal-300",
    createButtonText: "text-gray-700",
    viewAllText: "text-teal-600 hover:text-teal-700",
    quizCardBg: "bg-white",
    quizCardBorder: "border-gray-200",
  },
  red: {
    cardBg: "bg-gradient-to-r to-red-50 from-white",
    cardBorder: "border-red-300",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    createButtonBg: "bg-white",
    createButtonBorder: "border-red-300",
    createButtonText: "text-gray-700",
    viewAllText: "text-red-600 hover:text-red-700",
    quizCardBg: "bg-white",
    quizCardBorder: "border-gray-200",
  },
  yellow: {
    cardBg: "bg-gradient-to-r to-yellow-50 from-white",
    cardBorder: "border-yellow-300",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    createButtonBg: "bg-white",
    createButtonBorder: "border-yellow-300",
    createButtonText: "text-gray-700",
    viewAllText: "text-yellow-600 hover:text-yellow-700",
    quizCardBg: "bg-white",
    quizCardBorder: "border-gray-200",
  },
};

interface DashboardCard2Props {
  title?: string;
  subtitle?: string;
  sectionTitle?: string;
  quizTitle?: string;
  questionCount?: number;
  firstButtonTitle?: string;
  secondButtonTitle?: string;
  tags?: string[];
  onCreateQuiz?: () => void;
  onStartQuiz?: () => void;
  onViewAll?: () => void;
  icon?: React.ElementType;

  // Theme-based styling
  theme?: ThemeKey;

  // Or custom colors (overrides theme)
  customColors?: (typeof colorThemes)[ThemeKey] | null;

  // Individual overrides
  cardBg?: string;
  cardBorder?: string;
  iconBg?: string;
  iconColor?: string;
  createButtonBg?: string;
  createButtonBorder?: string;
  createButtonText?: string;
  viewAllText?: string;
  quizCardBg?: string;
  quizCardBorder?: string;
}

const DashboardCard2 = ({
  title = "MCQ Bank",
  subtitle = "120/2400 Question Completed",
  sectionTitle = "Today's Quiz Suggestions",
  quizTitle = "Med Mechanisms Quiz",
  questionCount = 25,
  firstButtonTitle = "Create Quiz",
  secondButtonTitle = "Create Quiz",
  tags = ["Drag Card", "Pharmacology"],
  onCreateQuiz = () => alert("Create quiz clicked"),
  onStartQuiz = () => alert("Start quiz clicked"),
  onViewAll = () => alert("View all clicked"),
  icon: IconComponent = BookOpen,

  // Theme-based styling
  theme = "pink",

  // Or custom colors (overrides theme)
  customColors = null,

  // Individual overrides
  cardBg = "",
  cardBorder = "",
  iconBg = "",
  iconColor = "",
  createButtonBg = "",
  createButtonBorder = "",
  createButtonText = "",
  viewAllText = "",
  quizCardBg = "",
  quizCardBorder = "",
}: DashboardCard2Props) => {
  // Determine which colors to use
  const getColors = () => {
    if (customColors) return customColors;
    if (colorThemes[theme]) return colorThemes[theme];
    return colorThemes.pink; // fallback
  };

  const colors = getColors();

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow duration-200 ${
        cardBg || colors.cardBg
      } ${cardBorder || colors.cardBorder}`}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row  sm:items-center sm:justify-between mb-6 gap-4 sm:gap-2">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
              iconBg || colors.iconBg
            }
            ${iconColor || colors.iconColor}  
            `}
          >
            <IconComponent
              className={`w-6 h-6 ${iconColor || colors.iconColor}`}
            />
          </div>

          {/* Title and Progress */}
          <div>
            <h2 className="text-base font-medium text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          </div>
        </div>

        {/* Create Quiz Button */}
        <button
          onClick={onCreateQuiz}
          className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg font-medium text-sm transition-colors duration-200 hover:bg-gray-50 text-nowrap ${
            createButtonBg || colors.createButtonBg
          } ${createButtonBorder || colors.createButtonBorder} ${
            createButtonText || colors.createButtonText
          }`}
        >
          <Plus className="w-4 h-4" />
          {firstButtonTitle}
        </button>
      </div>

      {/* Section Title with View All */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{sectionTitle}</h3>
        <button
          onClick={onViewAll}
          className={`font-medium text-sm transition-colors duration-200 ${
            viewAllText || colors.viewAllText
          }`}
        >
          View All
        </button>
      </div>

      {/* Quiz Card */}
      <div
        className={`border rounded-lg p-4 ${quizCardBg || colors.quizCardBg} ${
          quizCardBorder || colors.quizCardBorder
        }`}
      >
        {/* Tags */}
        <div className="flex gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quiz Info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 sm:items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-2">
              {quizTitle}
            </h4>
            <div className="flex items-center gap-2 text-gray-600">
              <BrainCog className="w-4 h-4" />
              <span className="text-sm">{questionCount} Questions</span>
            </div>
          </div>

          {/* Start Quiz Button */}
          <button
            onClick={onStartQuiz}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium text-nowrap"
          >
            <Play className="w-4 h-4" />
            {secondButtonTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard2;
