import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import {
  ContentModeType,
  setContentModeType,
} from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import ExamMode from "./medical/examMode/ExamMode";
import StudyMode from "./medical/studyMode/StudyMode";
export const tabs = [
  { label: "Study Mode", value: "study" },
  { label: "Exam Mode", value: "exam" },
];
const ParentComponent = () => {

  const { pathname } = useLocation();
  const { profileType, type } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  const dispatch = useDispatch();

  const outletVisible = pathname.includes("create-content");
  return (
    <>
      {outletVisible ? (
        <Outlet />
      ) : (
        <div>
          <div>
            <DashboardTopSection
              title={`${profileType ?? ""} Content Inventory`}
              description={`Manage and organize content for ${profileType ?? ""}`}
            />
          </div>
          <CommonSpace>
            <Tabs
              tabs={tabs}
              active={type}
              onChange={(value) =>
                dispatch(setContentModeType(value as ContentModeType))
              }
            />
          </CommonSpace>

          <div>{type === "study" && <StudyMode />}</div>
          <div>{type === "exam" && <ExamMode />}</div>
        </div>
      )}
    </>
  );
};

export default ParentComponent;
