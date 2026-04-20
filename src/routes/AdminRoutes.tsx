import CreateContent from "@/components/AdminDashboard/Content&Resources/content/medical/createContent/CreateContent";
import ParentComponent from "@/components/AdminDashboard/Content&Resources/content/ParentComponent";
import StudentsCard from "@/components/AdminDashboard/Content&Resources/content/students/StudentsCard";
import BookUploadForm from "@/components/AdminDashboard/Content&Resources/resources/book/BookUploadForm";
import UploadResourceForm from "@/components/AdminDashboard/Content&Resources/resources/carrier/UploadResourceForm";
import ResourcesTab from "@/components/AdminDashboard/Content&Resources/resources/ResourcesTab";
import MentorProfile from "@/components/AdminDashboard/userManagement/profile/MentorProfile";
import ProfessionalProfile from "@/components/AdminDashboard/userManagement/profile/ProfessionalProfile";
import StudentProfile from "@/components/AdminDashboard/userManagement/profile/StudentProfile";
import AdminLayout from "@/Layout/dashboard/AdminLayout";
import CreateEvents from "@/pages/AdminDashboard/communityAndEvents/CreateEvents";
import ResourceManagement from "@/pages/AdminDashboard/contentAndResourse/ResourceManagement";

import ContentManagement from "@/pages/AdminDashboard/contentAndResourse/ContentManagement";
import AdminDashboard from "@/pages/AdminDashboard/dashboard/AdminDashboard";
import Faq from "@/pages/AdminDashboard/faq/Faq";
import Transaction from "@/pages/AdminDashboard/mentorshipManagement/Transaction";
import CreatePlan from "@/pages/AdminDashboard/planManagement/CreatePlan";
import Setting from "@/pages/AdminDashboard/settings/Setting";
import Support from "@/pages/AdminDashboard/support/Support";
import CopyUrl from "@/pages/AdminDashboard/url/CopyUrl";
import Mentor from "@/pages/AdminDashboard/userManagement/Mentor";
import Professional from "@/pages/AdminDashboard/userManagement/Professional";
import Student from "@/pages/AdminDashboard/userManagement/Student";

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
    {
      path: "students",
      element: <Student />,
    },
    {
      path: "professional",
      element: <Professional />,
    },
    {
      path: "mentor",
      element: <Mentor />,
    },
    {
      path: "student-profile/:id/:name",
      element: <StudentProfile />,
    },
    {
      path: "professional-profile/:id/:name",
      element: <ProfessionalProfile />,
    },
    {
      path: "mentor-profile/:id/:name",
      element: <MentorProfile />,
    },

    {
      path: "content-management",
      element: <ContentManagement />,
      children: [
        {
          index: true,
          element: <StudentsCard />,
        },
        {
          path: "students",
          element: <StudentsCard />,
        },

        {
          path: "dashboard/:studentName",
          element: <ParentComponent />,
          children: [
            {
              path: "create-content",
              element: <CreateContent />,
            },
          ],
        },
      ],
    },

    {
      path: "resource-management",
      element: <ResourceManagement />,

      children: [
        {
          path: "",
          element: <ResourcesTab />,
        },
        {
          path: "create-carrier",
          element: <UploadResourceForm />,
        },
        {
          path: "upload-books",
          element: <BookUploadForm />,
        },
      ],
    },

    {
      path: "transaction",
      element: <Transaction />,
    },
    {
      path: "create-events",
      element: <CreateEvents />,
    },
    {
      path: "create-plan",
      element: <CreatePlan />,
    },
    {
      path: "support",
      element: <Support />,
    },
    {
      path: "faq",
      element: <Faq />,
    },

    {
      path: "settings",
      element: <Setting />,
    },
    {
      path: "url-copy",
      element: <CopyUrl />,
    },
  ],
};

export default adminRoutes;
