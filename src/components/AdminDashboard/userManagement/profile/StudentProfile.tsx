import image from "@/assets/home/mentor1.png"; // default profile image
import Spinner from "@/common/button/Spinner";
import { originalTitle } from "@/help/help";
import { useGetSingleStudentsQuery } from "@/store/features/adminDashboard/UserManagement/studentsManagementApi";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";

const StudentProfile = () => {
  const { id, name } = useParams<{ id: string; name: string }>();
  const { data: student, isLoading } = useGetSingleStudentsQuery(id ?? "", {
    skip: !id,
  });

  const profile = student?.data;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        profile && (
          <UserProfile
            fullName={
              `${profile.profile_id.firstName ?? ""} ${
                profile.profile_id.lastName ?? ""
              }`.trim() ||
              originalTitle(name as string) ||
              "John Doe"
            }
            email={profile.email ?? "sarah.johnson@email.com"}
            phone={profile.profile_id.point ?? "+1 (555) 123-4567"}
            country={profile.profile_id.country ?? "Not provided"}
            university={profile.profile_id.university ?? "Not provided"}
            preparingFor={
              profile.profile_id.preparingFor
                ?.map((p) => p.examName)
                .join(", ") ?? "Not provided"
            }
            bio={profile.profile_id.bio ?? "Not provided"}
            profileImage={profile?.profile_id?.profile_photo ?? image}
            yearOfStudy={profile?.profile_id?.year_of_study ?? ""}
            profession={profile.role}
            backLink="/admin/students"
            role={profile?.role}
          />
        )
      )}
    </div>
  );
};

export default StudentProfile;
