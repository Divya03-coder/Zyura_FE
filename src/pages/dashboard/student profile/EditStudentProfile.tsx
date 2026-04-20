/* eslint-disable @typescript-eslint/no-explicit-any */
import profileBg from "@/assets/dashboard/profileBg.png";
import { Button } from "@/components/ui/button";
import EditStudentProfileModal from "./EditStudentProfileModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "@/store/features/auth/auth.slice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  useLazyGetMeQuery,
  useUpdateProfileMutation,
} from "@/store/features/auth/auth.api";
import { useAppDispatch } from "@/hooks/useRedux";

export default function EditStudentProfile() {
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [getMe] = useLazyGetMeQuery();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfileImage = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("image", selectedImage);
      formDataToSend.append("data", JSON.stringify({}));

      const res = await updateProfile(formDataToSend).unwrap();

      if (res.success) {
        const meRes = await getMe(undefined).unwrap();

        dispatch(
          setUser({
            accessToken: Cookies.get("accessToken"),
            user: meRes?.data,
          })
        );

        // toast.success("Profile image updated successfully!");

        // reset states
        setSelectedImage(null);
        setPreviewImage(null);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);

    // preview
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const user = useSelector(selectUser);
  console.log("user",user);
  console.log("user",typeof user?.profile?.phone);

  return (
    <div className="my-8 md:my-10">
      {/* Background Image */}
      <img src={profileBg} alt="Profile Background" className="w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 -mt-5 mb-10 px-2 md:px-11">
        {/* Profile Card */}
        <div className="col-span-1">
          <div className="bg-white border border-slate-300 rounded-[8px] p-4 md:p-6">
            <div className="text-center">
              {/* <img
                src={user?.profile?.profile_photo}
                alt=""
                className="mx-auto w-28 h-28 object-cover rounded-full"
              /> */}

              <div className="text-center">
                <img
                  src={
                    previewImage ||
                    user?.profile?.profile_photo ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="mx-auto w-28 h-28 object-cover rounded-full border"
                />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profileImage"
                  onChange={handleImageChange}
                />

                {!selectedImage && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3"
                    onClick={() =>
                      document.getElementById("profileImage")?.click()
                    }
                  >
                    Update Profile Picture
                  </Button>
                )}

                {selectedImage && (
                  <div className="flex gap-3 mt-4">
                    <Button
                      onClick={handleUpdateProfileImage}
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading || isLoading ? "Uploading..." : "Save Photo"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setSelectedImage(null);
                        setPreviewImage(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-semibold text-black mt-2">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h3>
              <p className="text-slate-700">{user?.profile?.studentType}</p>
            </div>

            <div className="mt-6 space-y-3 text-sm sm:text-base">
              {user?.account?.role === "STUDENT" && (
                <p>
                  <span className="font-medium">University:</span>{" "}
                  {user?.profile?.university}
                </p>
              )}
              {user?.account?.role === "PROFESSIONAL" && (
                <p>
                  <span className="font-medium">institution:</span>{" "}
                  {user?.profile?.institution}
                </p>
              )}
              {user?.account?.role === "STUDENT" && (
                <p>
                  <span className="font-medium">Year of Study:</span>{" "}
                  {user?.profile?.year_of_study}
                </p>
              )}
              {user?.account?.role === "PROFESSIONAL" && (
                <p>
                  <span className="font-medium">Year of Experience:</span>{" "}
                  {user?.profile?.experience}
                </p>
              )}
              {user?.account?.role === "STUDENT" && (
                <p>
                  <span className="font-medium">Preparing For:</span>{" "}
                  {user?.profile?.preparingFor?.length
                    ? user.profile.preparingFor
                        .map((item) => item.examName)
                        .join(", ")
                    : "N/A"}
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={() => setOpen((prev) => !prev)}
            className="w-3xs h-12 mt-5 bg-blue-main hover:bg-blue-600 cursor-pointer"
          >
            Edit Profile
          </Button>
        </div>

        {/* Personal Info */}
        <div className="col-span-1 md:col-span-2 bg-white border border-slate-300 rounded-[8px] px-5 sm:px-7 lg:px-9 py-7 sm:py-9 lg:py-11">
          <div>
            <h3 className="text-lg sm:text-xl text-slate-900 font-medium border-b-2 border-b-slate-300 pb-2">
              Personal Information
            </h3>

            <div className="mt-4 sm:mt-6 space-y-4">
              {[
                {
                  label: "Name",
                  value: `${user?.profile?.firstName} ${user?.profile?.lastName}`,
                },
                { label: "Email", value: user?.account?.email },
                { label: "Phone", value: user?.profile?.phone },
                { label: "Country", value: user?.profile?.country },

                // STUDENT-specific fields
                ...(user?.account?.role === "STUDENT"
                  ? [
                      {
                        label: "University",
                        value: user?.profile?.university || "N/A",
                      },
                      {
                        label: "Preparing For",
                        value: user?.profile?.preparingFor?.length
                          ? user.profile.preparingFor
                              .map((item) => item.examName)
                              .join(", ")
                          : "N/A",
                      },
                    ]
                  : []),

                // PROFESSIONAL-specific fields
                ...(user?.account?.role === "PROFESSIONAL"
                  ? [
                      {
                        label: "Institution",
                        value: user?.profile?.institution || "N/A",
                      },
                      {
                        label: "Post Graduate",
                        value: user?.profile?.post_graduate || "N/A",
                      },
                      {
                        label: "Profession",
                        value: user?.profile?.professionName || "N/A",
                      },
                    ]
                  : []),

                { label: "Bio", value: user?.profile?.bio || "N/A" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-red-400 border-dotted pb-2"
                >
                  <h4 className="text-slate-800 font-medium">{item.label}:</h4>
                  <p className="text-slate-800 text-sm sm:text-base mt-1 sm:mt-0">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EditStudentProfileModal open={open} setOpen={setOpen} user={user} />
    </div>
  );
}
