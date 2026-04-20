import Spinner from "@/common/button/Spinner";
import Pagination from "@/common/custom/Pagination";
import CommonSpace from "@/common/space/CommonSpace";
import StudentTypeCard from "@/components/AdminDashboard/Content&Resources/content/StudentTypeCard";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useGetStudentTypeApiQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useGetProfessionalTypeApiQuery } from "@/store/features/adminDashboard/ContentResources/professionalType/professionalTypeApi";
import {
  ContentFor,
  setContentFor,
} from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

const StudentsCard = () => {
  const { contentFor } = useAppSelector(
    (state: RootState) => state.staticContent
  );
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const { data: studentTypeData, isLoading: loadingForStudent } =
    useGetStudentTypeApiQuery({
      page: currentPage,
      limit,
    });
  const { data: professionalTypeData, isLoading: loadingForProfession } =
    useGetProfessionalTypeApiQuery({
      page: currentPage,
      limit,
    });

  const isLoading =
    contentFor === "student" ? loadingForStudent : loadingForProfession;

  const dataToRender =
    contentFor === "student"
      ? studentTypeData?.data
      : professionalTypeData?.data;

  const totalPage =
    contentFor === "student"
      ? studentTypeData?.meta?.totalPages
      : professionalTypeData?.meta?.totalPages;

  const dispatch = useDispatch();
  const tabs = [
    { label: "Student", value: "student" },
    { label: "Professional", value: "professional" },
  ];

  // pagination

  const handleContentFor = (value: ContentFor) => {
    dispatch(setContentFor(value as ContentFor));
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:gap-10">
        <DashboardTopSection
          title="Content Management"
          description="Manage students and professionals."
        />

        <Tabs
          tabs={tabs}
          active={contentFor}
          onChange={(value) => handleContentFor(value as ContentFor)}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : dataToRender?.length === 0 ? (
        <h1>No Data Found</h1>
      ) : (
        <CommonSpace>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {dataToRender?.map((student, i) => (
              <StudentTypeCard key={student._id} index={i} data={student} />
            ))}
          </div>
        </CommonSpace>
      )}

      {dataToRender && dataToRender.length > 0 && (
        <div className="mb-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage ?? 1}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      )}
    </div>
  );
};

export default StudentsCard;
