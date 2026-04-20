import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "../reusable/PrimaryButton";
import tool1 from "@/assets/home/tool_1.svg";
import tool2 from "@/assets/home/tool_2.svg";
import tool3 from "@/assets/home/tool_3.svg";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    id: 1,
    icon: tool1,
    title: "Smart Study",
    description:
      "Smart study isn't about working harder — it's about learning efficiently with AI that helps you review, recall, and retain knowledge faster.",
    link: "/dashboard/clinical-case-generator",
  },
  {
    id: 2,
    icon: tool2,
    title: "AI Quiz Generator",
    description:
      "Save hours by instantly generating flashcards with AI-powered tools that help you efficiently test and strengthen your knowledge.",
    link: "/dashboard/quiz-page",
  },
  {
    id: 3,
    icon: tool3,
    title: "AI Flashcard Generator",
    description:
      "Save hours by instantly generating flashcards with AI-powered tools that help you efficiently test and strengthen your knowledge.",
    link: "/dashboard/flashcard-page",
  },
];

const Tools = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <CommonWrapper>
        <div className="py-10 md:py-16">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4 md:mb-6 max-w-3xl mx-auto">
              Three powerful tools <br className="hidden md:block" /> unlimited
              possibilities
            </h2>
            <p className="text-[#181818] max-w-2xl mx-auto mb-6 md:mb-8">
              Discover how our AI tools simplify content creation, making
              learning more efficient and tailored to your goals.
            </p>
            <PrimaryButton
              onClick={() => {
                navigate("/dashboard/smart-study");
              }}
              className="lg:px-8 lg:py-4 mb-10"
            >
              Get Started
            </PrimaryButton>
          </div>

          {/* Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {tools.map(({ id, icon, title, description, link }) => (
              <div
                key={id}
                onClick={() => navigate({ pathname: link })}
                className="rounded-xl border border-gray-200 bg-[#F9FAFB] hover:bg-blue-50 transition-colors shadow-sm p-6 text-center cursor-pointer"
              >
                <img
                  src={icon}
                  alt={title}
                  className="mx-auto mb-4 h-28 w-28 object-contain"
                />
                <h3 className="text-lg md:text-xl font-semibold text-[#1E293B] mb-2">
                  {title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Tools;
