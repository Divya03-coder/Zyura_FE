import CommonWrapper from "@/common/CommonWrapper";
import MentorCard from "./MentorCard";
import PrimaryButton from "../reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function MentorSection() {
  const navigate = useNavigate();
  return (
    <div className="py-10 md:py-16">
      <CommonWrapper>
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 md:mb-8 lg:mb-12 gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bricolage text-black font-semibold text-center md:text-left">
            Expert Mentorship for Tomorrow's Doctors
          </h2>
          <PrimaryButton
            onClick={() => {
              navigate("/dashboard/all-mentor");
            }}
            className="px-6 py-3"
          >
            All Professor
          </PrimaryButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
        </div>
      </CommonWrapper>
    </div>
  );
}
