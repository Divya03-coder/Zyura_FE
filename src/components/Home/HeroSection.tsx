import CommonWrapper from "@/common/CommonWrapper";
import heroIcon1 from "@/assets/home/hero_icon_1.png";
import heroIcon2 from "@/assets/home/hero_icon_2.png";
import heroIcon3 from "@/assets/home/hero_icon_3.svg";
import bannerImage from "@/assets/home/heroBanner2.png";
import PrimaryButton from "../reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: 1,
    icon: heroIcon1,
    title: "Student",
    alt: "student icon",
  },
  {
    id: 2,
    icon: heroIcon2,
    title: "Professional",
    alt: "professional icon",
  },
  {
    id: 3,
    icon: heroIcon3,
    title: "Mentor",
    alt: "mentor icon",
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FAFAFA]">
      <CommonWrapper>
        <div className="lg:grid grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="py-10 md:py-16">
            <h1 className="text-3xl md:text-5xl font-bold text-[#1E293B] mb-4">
              Welcome to Your Medical <br /> Student Hub
            </h1>
            <p className="text-base md:text-lg text-[#334155]">
              Learn smarter, connect faster, succeed together.
            </p>

            {/* Role Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 md:my-8 lg:my-10 max-w-2xl">
              {roles.map(({ id, icon, title, alt }) => (
                <div
                  key={id}
                  className="rounded-lg border bg-blue-50 border-[#0EA5E94D]/30 p-4 md:p-5"
                >
                  <img src={icon} alt={alt} />
                  <h3 className="text-sm md:text-lg font-semibold text-blue-800 mt-2 text-nowrap">
                    {title}
                  </h3>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-5 items-center">
              <PrimaryButton
                onClick={() => {
                  navigate("/dashboard/smart-study");
                }}
                className="bg-teal-600"
              >
                Join Study Group
              </PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  navigate("/dashboard/quiz-page");
                }}
              >
                Take a Quiz
              </PrimaryButton>
            </div>
          </div>

          {/* Right Banner */}
          <div className="hidden lg:block pt-10">
            <img src={bannerImage} alt="Hero banner" />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
