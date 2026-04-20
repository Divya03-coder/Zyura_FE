import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";

export default function ConnectMentorCard() {
  return (
    <Link to={"/dashboard/mentor-profile"}>
      <div className="bg-[#F9FAFB] px-[11px] py-[12px] rounded-[8px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://media.istockphoto.com/id/2194078950/photo/profile-picture-of-smiling-confident-arabic-businessman.webp?a=1&b=1&s=612x612&w=0&k=20&c=42Z7FDi1u5Ogevtd0xMUkTWM7hDzrre4YOlbHKvK_T8="
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="space-y-[6px]">
              <h3 className="font-medium">Dr. James Wilson</h3>
              <p className="text-sm text-[#6B7280]">
                Availability: Weekends, Evenings
              </p>
              <p className="text-sm text-[#6B7280]">Cardiology • English</p>
            </div>
          </div>
          <Button className="text-[#007BFF] bg-white border border-blue-main rounded-[6px] py-2 px-4 hover:bg-blue-main hover:text-white cursor-pointer">
            <LinkIcon /> Connect
          </Button>
        </div>
      </div>
    </Link>
  );
}
