import profileBg from "@/assets/dashboard/profileBg.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import EditMentorProfileModal from "./EditMentorProfileModal";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";

export default function MentorProfilePage() {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);

  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (imgUrl: string) => setModalImage(imgUrl);
  const closeModal = () => setModalImage(null);

  const profile = user?.profile;
  const account = user?.account;

  return (
    <div className="my-6 sm:my-10">
      {/* Background Image */}
      <img
        src={profileBg}
        alt="Profile Background"
        className="w-full object-cover h-32 sm:h-48 lg:h-60"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-9 -mt-5 mb-10 px-3 sm:px-6 lg:px-11">
        {/* Profile Card */}
        <div className="col-span-1">
          <div className="bg-white border border-slate-300 rounded-lg p-4 sm:p-6">
            <div className="text-center">
              <img
                src={profile?.profile_photo || "/default-avatar.png"}
                alt="Profile"
                className="mx-auto w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-full border border-gray-200"
              />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mt-2">
                {profile?.firstName} {profile?.lastName}
              </h3>
              <p className="text-sm sm:text-base text-slate-700">
                {profile?.currentRole || "Mentor"}
              </p>
            </div>

            <div className="mt-6 space-y-4 text-sm sm:text-base">
              <div>
                <p className="font-medium">Average rating</p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Star className="text-[#21A391]" />
                  <p className="text-sm sm:text-base text-[#475569]">
                    4.8 <span>(60 Reviews)</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-2">
                  <p className="flex flex-col text-sm font-medium">
                    Completion Rate
                    <span className="text-sm font-normal text-[#475569]">
                      93%
                    </span>
                  </p>
                  <Link to={"/mentor/mentor-review"}>
                    <p className="text-blue-main underline cursor-pointer text-sm sm:text-base">
                      View Review
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full sm:w-auto h-12 mt-5 bg-blue-main hover:bg-blue-600 cursor-pointer"
          >
            Edit Profile
          </Button>
        </div>

        {/* Profile Information */}
        <div className="col-span-1 lg:col-span-2 bg-white border border-slate-300 rounded-lg p-5 sm:p-7 lg:p-9">
          <h3 className="text-lg sm:text-xl text-slate-900 font-medium border-b pb-2">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
            {[
              { label: "First Name", value: profile?.firstName || "N/A" },
              { label: "Last Name", value: profile?.lastName || "N/A" },
              {
                label: "Email Address",
                value: account?.email || "N/A",
                full: true,
              },
              {
                label: "Medical Specialty",
                value: profile?.specialty || "N/A",
              },
              {
                label: "Current Role",
                value: profile?.currentRole || "N/A",
              },
              {
                label: "Post Graduate",
                value: profile?.postgraduateDegree || "N/A",
              },
              {
                label: "Year of Experience",
                value: profile?.professionalExperience?.toString() || "0",
              },
              {
                label: "Bio",
                value: profile?.bio || "N/A",
                full: true,
                large: true,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`grid gap-2 ${item.full ? "md:col-span-2" : ""}`}
              >
                <Label className="text-[#2D2D2D]">{item.label}</Label>
                <div
                  className={`p-3 rounded-md text-[#716E6E] bg-[#EFF6FF66] border border-blue-50 ${
                    item.large ? "min-h-[100px]" : ""
                  }`}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div></div>

        {/* Basic & Bank Info */}
        <div className="col-span-1 lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5 sm:p-6 space-y-5">
          <h2 className="text-base sm:text-lg font-semibold underline">
            Basic info
          </h2>
          <div className="flex flex-wrap gap-4">
            {profile?.degree && (
              <div>
                <p className="text-sm font-medium mb-1">Your Degree</p>
                <img
                  src={profile.degree}
                  alt="Degree"
                  className="w-28 sm:w-40 h-20 object-cover cursor-pointer border rounded"
                  onClick={() => openModal(profile.degree!)}
                />
              </div>
            )}
            {profile?.identity_card && (
              <div>
                <p className="text-sm font-medium mb-1">
                  NID/Passport/Driving License
                </p>
                <div
                  className="w-28 sm:w-40 h-20 bg-gray-100 flex items-center justify-center cursor-pointer border rounded text-xs text-center p-2"
                  onClick={() =>
                    profile.identity_card?.endsWith(".pdf")
                      ? window.open(profile.identity_card, "_blank")
                      : openModal(profile.identity_card!)
                  }
                >
                  {profile.identity_card.endsWith(".pdf") ? (
                    "View PDF Document"
                  ) : (
                    <img
                      src={profile.identity_card}
                      alt="NID"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            )}
            {profile?.certificate && (
              <div>
                <p className="text-sm font-medium mb-1">
                  Professional Certificate
                </p>
                <img
                  src={profile.certificate}
                  alt="Certificate"
                  className="w-28 sm:w-40 h-20 object-cover cursor-pointer border rounded"
                  onClick={() => openModal(profile.certificate!)}
                />
              </div>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-semibold underline mt-4">
            Bank info
          </h2>
          <div className="space-y-1 text-sm sm:text-base">
            <p className="font-medium">Account Details</p>
            <p>Name: {profile?.bankInformation?.accountHolderName || "N/A"}</p>
            <p>Bank Name: {profile?.bankInformation?.bankName || "N/A"}</p>
            <p>
              Account Number: {profile?.bankInformation?.accountNumber || "N/A"}
            </p>
            <p>
              Routing Number: {profile?.bankInformation?.routingNumber || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={modalImage}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <EditMentorProfileModal open={open} setOpen={setOpen} user={user} />
    </div>
  );
}
