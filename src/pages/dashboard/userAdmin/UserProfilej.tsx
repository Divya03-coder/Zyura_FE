import profileImage from "@/assets/dashboard/profileImage.png"
import profileBg from "@/assets/dashboard/profileBg.png";
import { Button } from "@/components/ui/button";
import UserInformation from "./UserInformation";
import nid from "@/assets/dashboard/nid.jpg";
import certificket from "@/assets/dashboard/certificket.jpg";
import degree from "@/assets/dashboard/degree.jpg";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const location = useLocation();
    const isUserProfile = location.pathname === "/admin/user-profile";
    const isMentorProfile = location.pathname === "/admin/mentor-profile";


    // ✅ Static data
    const userData = {
        fullName: "Emma Harrison",
        email: "emma@email.com",
        phone: "+1 (555) 123-4567",
        country: "Denmark",
        university: "Heriot-Watt University",
        bio: "Medical graduate passionate about global healthcare. Preparing for international licensing exams.",
        street: "123 Main Street",
        preparing: "PLAB",
        degree: degree,
        nid: nid,
        certificate: certificket,
        bankName: "Bank of Denmark",
        accountNumber: "123456789012",
    }

    return (
        <div className="my-8 md:my-10">
            {/* Background Image */}
            <img
                src={profileBg}
                alt="Profile Background"
                className="w-full rounded-md"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 -mt-10 mb-10 px-2 md:px-11 w-full">
                {/* Profile Card */}
                <div className="col-span-1 flex flex-col gap-5">
                    <div className="bg-white border border-slate-300 rounded-[8px] p-4 md:p-6">
                        <div className="text-center">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="mx-auto w-28 h-28 object-cover rounded-full"
                            />
                            <h3 className="text-xl font-semibold text-black mt-2">
                                {userData.fullName}
                            </h3>


                            {!isMentorProfile && (
                                <p className="text-slate-700">Medical Student</p>
                            )}
                            {!isUserProfile && (
                                <p className="text-slate-700">Mentor</p>
                            )}
                        </div>

                        {!isMentorProfile && (
                            <div className="mt-6 space-y-3 text-sm sm:text-base">
                                <p>
                                    <span className="font-medium">University:</span>{" "}
                                    {userData.university}
                                </p>
                                <p>
                                    <span className="font-medium">Year of Study:</span> 2nd Year
                                </p>
                                <p>
                                    <span className="font-medium">Preparing For:</span>{" "}
                                    {userData.preparing}
                                </p>
                            </div>
                        )}

                        {/* Mentor Profile info (rating, completion rate) hide when /admin/user-profile */}
                        {!isUserProfile && (
                            <div className="mt-6 space-y-3 text-sm sm:text-base">
                                <p>
                                    <span className="font-medium">Average rating </span>
                                </p>
                                <div className="flex items-center gap-3">
                                    <Rating
                                        style={{ maxWidth: 130 }}
                                        value={3}
                                        readOnly
                                    />
                                    <p className="text-sm text-[#475569]">4.8 <span>(60 Reviews)</span></p>
                                </div>
                                <p className="flex flex-col text-sm font-medium">
                                    Completion Rate
                                    <span className="text-sm font-normal text-[#475569]">93%</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            className="flex-1 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Deactivate User
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 px-6 py-2 border-gray-300"
                        >
                            Back
                        </Button>
                    </div>
                </div>

                {/* Child Component - Pass Static Data */}
                <div className="col-span-2">
                    <UserInformation data={userData} isUserProfile={isUserProfile} />
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
