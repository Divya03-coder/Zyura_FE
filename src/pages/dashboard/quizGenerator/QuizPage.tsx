import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import MyQuizAnalysisTab from "./MyQuizAnalysisTab";
import QuizCollection from "./QuizCollection";

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(id ? "myQuiz" : "overview");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    } else if (id) {
      setActiveTab("myQuiz");
    }
  }, [location.state, id]);

  // const tabs = [
  //   { id: "overview", label: "Overview" },
  //   // { id: "myQuiz", label: "My Quiz" },
  // ];

  return (
    <div>
      <div className="md:flex justify-between items-center">
        <DashboardHeading
          title="AI Quiz Generator Overview"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="Create custom quizzes from your images and prompts using AI"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-5 mb-3"
        />
        <Link to={"/dashboard/quiz-generator"}>
          <PrimaryButton
            icon={<Plus className="w-4 h-4" />}
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Generate Quiz
          </PrimaryButton>
        </Link>
      </div>

      <div>
        {/* Tab  */}
        <div>
          <div>
            {/* Tab Buttons */}
            {/* <div className="flex gap-4 my-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={` py-1 text-start text-lg font-semibold leading-7 transition-colors duration-200 hover:cursor-pointer
                      ${
                        activeTab === tab.id
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-blue-500"
                      }`}
                >
                  {tab.label}
                </button>
              ))}
            </div> */}

            {/* Tab Content */}
            <div className="">
              {activeTab === "overview" && <QuizCollection />}
              {/* {activeTab === "overview" && <QuizOverviewTab />} */}
              {/* {activeTab === "myQuiz" && <MyQuizAnalysisTab />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
