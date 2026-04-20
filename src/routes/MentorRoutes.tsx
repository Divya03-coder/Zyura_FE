// import MentorCommunityTabs from "@/components/mentorCommunity/MentorCommunityTabs";
import MentorLayout from "@/Layout/dashboard/MentorLayout";
import MentorCommunity from "@/pages/mentor/MentorCommunity";
import MentorDashboard from "@/pages/mentor/MentorDashboard";
import MentorEarnings from "@/pages/mentor/MentorEarnings";
import MentorMaterials from "@/pages/mentor/MentorMaterials";
import MentorSettings from "@/pages/mentor/MentorSettings";
import MentorProfilePage from "@/pages/mentor/mentorProfilePages/MentorProfilePage";
import MentorReviewPage from "@/pages/mentor/mentorProfilePages/MentorReviewPage";
import MentorQuestionBank from "@/pages/mentor/questionBank/MentorQuestionBank";
import MentorSessionDetails from "@/pages/mentor/MentorSessionDetails";
import RecentTransaction from "@/pages/mentor/RecentTransaction";
import CreateQuestionBank from "@/pages/mentor/questionBank/CreateQuestionBank";
import CreateQuestion from "@/pages/mentor/questionBank/CreateQuestion";
import MentorClasses from "@/pages/mentor/mentorClasses/MentorClasses";
import ForumDetail from "@/components/mentorCommunity/ForumDetail";
import PrivateRoute from "./PrivateRoute";

const mentorRoutes = {
  path: "/mentor",
  element: (
    <PrivateRoute allowedRoles={["MENTOR"]}>
      <MentorLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <MentorDashboard />,
    },
    {
      path: "question-bank",
      element: <MentorQuestionBank />,
    },
    {
      path: "create-question-bank",
      element: <CreateQuestionBank />,
    },
    {
      path: "create-question",
      element: <CreateQuestion />,
    },
    {
      path: "classes",
      element: <MentorClasses />,
    },
    {
      path: "session-details/:id",
      element: <MentorSessionDetails />,
    },
    {
      path: "materials",
      element: <MentorMaterials />,
    },
    {
      path: "earnings",
      element: <MentorEarnings />,
    },
    {
      path: "mentor-setting",
      element: <MentorSettings />,
    },
    {
      path: "mentor-community",
      element: <MentorCommunity />,
    },
    {
      path: "forum-details/:id",
      element: <ForumDetail />,
    },
    {
      path: "recent-transaction",
      element: <RecentTransaction />,
    },
    {
      path: "mentor-profile",
      element: <MentorProfilePage />,
    },
    {
      path: "mentor-review",
      element: <MentorReviewPage />,
    },
  ],
};

export default mentorRoutes;
