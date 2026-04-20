import DashboardLayout from "@/Layout/dashboard/DashboardLayout";
import GeneratedNoteDetails from "@/pages/dashboard/downloadNotes/GeneratedNoteDetails";
import SingleNoteView from "@/pages/dashboard/downloadNotes/SingleNoteView";
import AITutor from "@/pages/dashboard/AI Tutor/AITutor";
import ClinicalCaseGenerator from "@/pages/dashboard/ClinicalCaseGenerator";
import Courses from "@/pages/dashboard/Courses";
import CreateNotes from "@/pages/dashboard/downloadNotes/CreateNotes";
import DashboardHome from "@/pages/dashboard/DashboardHome";
// import DiagramExplorer from "@/pages/dashboard/DiagramExplorer";
import DownloadNotes from "@/pages/dashboard/downloadNotes/DownloadNotes";
import FlashcardPage from "@/pages/dashboard/flashcard/FlashcardPage";
import GamifiedLearning from "@/pages/dashboard/gamifiedLearning/GamifiedLearning";
import McqBank from "@/pages/dashboard/mcqBank/McqBank";
import QuizGenerator from "@/pages/dashboard/quizGenerator/QuizGenerator";
import QuizCollection from "@/pages/dashboard/quizGenerator/QuizCollection";
import AllGeneratedQuiz from "@/pages/dashboard/quizGenerator/AllGeneratedQuiz";
import FlashCardGenerator from "@/pages/dashboard/flashcard/FlashCardGenerator";
import FlashCardCollection from "@/pages/dashboard/flashcard/FlashCardCollection";
import AllGeneratedFlashCard from "@/pages/dashboard/flashcard/AllGeneratedFlashCard";
import ClinicalCaseDetails from "@/components/dashboard/clinical-case/ClinicalCaseDetails";
import QuizPage from "@/pages/dashboard/quizGenerator/QuizPage";
import Quiz from "@/pages/dashboard/quizGenerator/Quiz";
import AnswerOverview from "@/pages/dashboard/quizGenerator/AnswerOverview";
import SolveFlashCard from "@/pages/dashboard/flashcard/SolveFlashCard";
import AllCommunities from "@/components/dashboard/community-event/AllCommunities";
import CareerResourcePage from "@/pages/dashboard/careerResource/CareerResourcePage";
import MyResource from "@/pages/dashboard/careerResource/MyResource";
// import StudyPlan from "@/pages/dashboard/study plan/StudyPlan";
import CreateStudyPlan from "@/pages/dashboard/study plan/CreateStudyPlan";
import MyPlan from "@/pages/dashboard/study plan/MyPlan";
import WeeklyPlan from "@/pages/dashboard/study plan/WeeklyPlan";
import EditStudentProfile from "@/pages/dashboard/student profile/EditStudentProfile";
import DailyChallenge from "@/pages/dashboard/gamifiedLearning/DailyChallenge";
import DailyChallengeQuiz from "@/pages/dashboard/gamifiedLearning/DailyChallengeQuiz";
import PracticeMCQ from "@/pages/dashboard/mcqBank/PracticeMCQ";

// import DiagramDetails from "@/components/dashboard/diagram/DiagramDetails";
// import OSCE from "@/pages/dashboard/OSCE";
// import DrugCard from "@/pages/dashboard/DrugCard";
import DrugSearchCard from "@/pages/DrugSearchCard";
import YourDrugCard from "@/components/dashboard/drug card/YourDrugCard";
import MakeDecesion from "@/components/dashboard/clinical-case/MakeDecesion";
import CreateNewDiscussion from "@/components/dashboard/community-event/forums/CreateNewDiscussion";
import AllMentorPage from "@/components/dashboard/community-event/mentor/AllMentorPage";
import MyMentorPage from "@/components/dashboard/community-event/mentor/MyMentorPage";
import MentorProfile from "@/components/dashboard/community-event/mentor/MentorProfile";
import BookingPage from "@/components/dashboard/community-event/mentor/BookingPage";
import GroupDetails from "@/components/dashboard/community-event/study-group-page/GroupDetails";
import Profile from "@/pages/profile/Profile";
import Settings from "@/pages/profile/Settings";
import MentorshipPage from "@/components/dashboard/community-event/MentorshipPage";
import AskQuestion from "@/components/dashboard/community-event/mentor/AskQuestion";
import MySession from "@/components/dashboard/community-event/mentor/MySession";
import SessionDetails from "@/components/dashboard/community-event/mentor/SessionDetails";
import RecordedSession from "@/components/dashboard/community-event/mentor/RecordedSession";
import OSCEStation from "@/components/dashboard/osce/OSCEStation";
import PracticeWithChecklist from "@/components/dashboard/osce/PracticeWithChecklist";
import OSCETutorial from "@/components/dashboard/osce/OSCETutorial";
import CheckListResult from "@/components/dashboard/osce/CheckListResult";
import HelpSupport from "@/pages/dashboard/help&support/HelpSupport";
import StudentProfile from "@/pages/dashboard/student profile/StudentProfile";
import PrivateRoute from "./PrivateRoute";
// import MCQPracticeWithSidebar from "@/pages/dashboard/mcqBank/newMCQBank/MCQPracticeWithSidebar";
// import MCQPracticeWithSidebar from "@/components/Test";
import BioDigitalExplorer from "@/pages/dashboard/bio-digital/Explorer";
import BioDigitalDetailView from "@/pages/dashboard/bio-digital/DetailView";
import MyQuizAnalysisTab from "@/pages/dashboard/quizGenerator/MyQuizAnalysisTab";
import ForumDetail from "@/components/mentorCommunity/ForumDetail";

const dashboardRoutes = {
  path: "/dashboard",
  element: (
    <PrivateRoute allowedRoles={["STUDENT", "PROFESSIONAL"]}>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardHome />,
    },
    // {
    //   path: "community-event",
    //   element: <CommunityEvent />,
    // },
    {
      path: "progress",
      element: <StudentProfile />,
    },
    {
      path: "community-event",
      element: <AllCommunities />,
    },
    {
      path: "all-communities",
      element: <AllCommunities />,
    },
    {
      path: "mentorship",
      element: <MentorshipPage />,
    },
    {
      path: "my-mentor",
      element: <MyMentorPage />,
    },
    {
      path: "all-mentor",
      element: <AllMentorPage />,
    },
    {
      path: "mentor-profile/:id",
      element: <MentorProfile />,
    },
    {
      path: "ask-question/:id",
      element: <AskQuestion />,
    },
    {
      path: "confirm-booking",
      element: <BookingPage />,
    },
    {
      path: "my-session",
      element: <MySession />,
    },
    {
      path: "session-details/:id",
      element: <SessionDetails />,
    },
    {
      path: "recorded-session",
      element: <RecordedSession />,
    },
    {
      path: "group-details",
      element: <GroupDetails />,
    },
    {
      path: "create-new-discussion",
      element: <CreateNewDiscussion />,
    },

    {
      path: "forum-details/:id",
      element: <ForumDetail />,
    },
    {
      path: "ai-tutor",
      element: <AITutor />,
    },
    // {
    //   path: "mcq-bank",
    //   element: <MCQPracticeWithSidebar />,
    // },
    {
      path: "mcq-bank",
      element: <McqBank />,
    },
    {
      path: "practice-mcq/:id",
      element: <PracticeMCQ />,
    },
    {
      path: "quiz-generator",
      element: <QuizGenerator />,
    },
    {
      path: "clinical-case-generator",
      element: <ClinicalCaseGenerator />,
    },
    {
      path: "clinical-case/:id",
      element: <ClinicalCaseDetails />,
    },
    {
      path: "clinical-case/:id/make-decision",
      element: <MakeDecesion />,
    },
    // {
    //   path: "diagram-explorer",
    //   element: <BioDigitalExplorer />,
    // },
    {
      path: "bio-digital", // Alias for easier access if they want
      element: <BioDigitalExplorer />,
    },
    {
      path: "bio-digital/details",
      element: <BioDigitalDetailView />,
    },
    {
      path: "diagram-details", // Maintained for backward compatibility link
      element: <BioDigitalDetailView />,
    },
    {
      path: "courses",
      element: <Courses />,
    },
    {
      path: "gamified-learning",
      element: <GamifiedLearning />,
    },
    {
      path: "gamified-learning/daily-challenges",
      element: <DailyChallenge />,
    },
    {
      path: "daily-challenge-quiz/:id",
      element: <DailyChallengeQuiz />,
    },

    // {
    //   path: "osce",
    //   element: <OSCE />,
    // },
    // {
    //   path: "osce-station",
    //   element: <OSCEStation />,
    // },
    {
      path: "osce",
      element: <OSCEStation />,
    },
    {
      path: "practice-with-checklist/:id",
      element: <PracticeWithChecklist />,
    },
    {
      path: "osce-tutorial",
      element: <OSCETutorial />,
    },
    {
      path: "check-list-result",
      element: <CheckListResult />,
    },
    {
      path: "download-notes",
      element: <DownloadNotes />,
    },
    {
      path: "create-note",
      element: <CreateNotes />,
    },
    {
      path: "generated-notes/:id",
      element: <GeneratedNoteDetails />,
    },
    {
      path: "notes/:id",
      element: <SingleNoteView />,
    },
    {
      path: "quiz-page/:id?",
      element: <QuizPage />,
    },
    {
      path: "quiz-analysis/:id",
      element: <MyQuizAnalysisTab />,
    },
    {
      path: "quiz-collection",
      element: <QuizCollection />,
    },
    {
      path: "all-generated-quiz",
      element: <AllGeneratedQuiz />,
    },
    {
      path: "quiz/:id",
      element: <Quiz />,
    },
    {
      path: "quiz-answer-overview/:id",
      element: <AnswerOverview />,
    },
    {
      path: "flashcard-page",
      element: <FlashcardPage />,
      children: [],
    },
    {
      path: "flashcard-generator",
      element: <FlashCardGenerator />,
    },
    {
      path: "flashcard-collection",
      element: <FlashCardCollection />,
    },
    {
      path: "all-flash-card",
      element: <AllGeneratedFlashCard />, //this is all flashcard component
    },
    {
      path: "solve-flash-card/:id",
      element: <SolveFlashCard />,
    },
    {
      path: "resources",
      element: <CareerResourcePage />,
    },
    {
      path: "my-resources",
      element: <MyResource />,
    },
    // {
    //   path: "smart-study",
    //   element: <StudyPlan />,
    // },
    {
      path: "create-study-plan",
      element: <CreateStudyPlan />,
    },
    // {
    //   path: "my-plan",
    //   element: <MyPlan />,
    // },
    {
      path: "smart-study",
      element: <MyPlan />,
    },
    {
      path: "weekly-plan/:id",
      element: <WeeklyPlan />,
    },
    // {
    //   path: "drug-cards",
    //   element: <DrugCard />,
    // },
    {
      path: "drug-cards",
      element: <DrugSearchCard />,
    },
    {
      path: "your-drug-cards",
      element: <YourDrugCard />,
    },
    {
      path: "student-profile",
      element: <EditStudentProfile />,
    },
    // {
    //   path: "student-profile",
    //   element: <StudentProfile />,
    // },
    {
      path: "edit-student-profile",
      element: <EditStudentProfile />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "help",
      element: <HelpSupport />,
    },
    {
      path: "test",
      element: <McqBank />,
    },
  ],
};

export default dashboardRoutes;
