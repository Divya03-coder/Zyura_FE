import image from "@/assets/home/mentor1.png";
import Spinner from "@/common/button/Spinner";
import { originalTitle } from "@/help/help";
import { useGetSingleMentorQuery } from "@/store/features/adminDashboard/UserManagement/mentorManagementApi";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
const MentorProfile = () => {
  const { id } = useParams();
  const { data: mentor, isLoading } = useGetSingleMentorQuery(id ?? "", {
    skip: !id,
  });

  const profile = mentor?.data;
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        profile && (
          <UserProfile
            fullName={
              originalTitle(
                profile?.profile_id.firstName +
                  " " +
                  profile?.profile_id.lastName
              ) ?? "John Doe"
            }
            university={
              profile.profile_id.hospitalOrInstitute ?? "Not provided"
            }
            country={profile.profile_id.country ?? "Not provided"}
            email={profile?.email ?? "sarah.johnson@email.com"}
            phone="+1 (555) 123-4567"
            preparingFor={profile?.profile_id.specialty ?? "Not provided"}
            bio={`${profile?.profile_id.postgraduateDegree} ${profile?.profile_id.hospitalOrInstitute} ${profile?.profile_id.country}`}
            profileImage={image}
            yearOfStudy={
              profile?.profile_id.postgraduateDegree ?? "Not provided"
            }
            profession={profile?.role ?? "Not provided"}
            backLink="/admin/mentor"
            role={profile?.role}
          />
        )
      )}
    </div>
  );
};

export default MentorProfile;
