import mentorImage1 from "@/assets/home/mentor1.png";
import PrimaryButton from "../reusable/PrimaryButton";

export default function MentorCard() {
  return (
    <div className="bg-slate-50 p-[14px] rounded-[20px]">
      <img
        src={mentorImage1}
        alt="mentorImage"
        className="rounded-[10px] mx-auto w-full mb-5"
      />
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-black leading-7 font-inter">
            Azad Kibria
          </h3>
          <p className="text-lg text-blue-800 font-medium leading-6">
            Dermatologist
          </p>
        </div>
        <PrimaryButton>+</PrimaryButton>
      </div>
    </div>
  );
}
