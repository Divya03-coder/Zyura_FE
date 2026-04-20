import CommonSpace from "@/common/space/CommonSpace";
import StudentTypeCard from "@/components/AdminDashboard/Content&Resources/content/StudentTypeCard";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { useGetStudentTypeApiQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";

const StudentsCard = () => {
  const { data: studentTypeData } = useGetStudentTypeApiQuery({});

  return (
    <div>
      <DashboardTopSection
        title="Content Management"
        description="Manage mentors and their mentees."
      />

      {/* Student cards */}
      <CommonSpace>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentTypeData?.data?.map((student, i) => (
            <StudentTypeCard key={student._id} index={i} data={student} />
          ))}
        </div>
      </CommonSpace>
    </div>
  );
};

export default StudentsCard;
