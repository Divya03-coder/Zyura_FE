/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { UserRound } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  useLazyGetMeQuery,
  useUpdateProfileMutation,
} from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUser, selectToken } from "@/store/features/auth/auth.slice";
import { useSelector } from "react-redux";

interface EditMentorProfileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
}

export default function EditMentorProfileModal({
  open,
  setOpen,
  user,
}: EditMentorProfileModalProps) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [getMe] = useLazyGetMeQuery();
  const dispatch = useAppDispatch();
  const token = useSelector(selectToken);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      specialty: "",
      currentRole: "",
      postgraduateDegree: "",
      professionalExperience: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (user?.profile) {
      reset({
        firstName: user.profile.firstName || "",
        lastName: user.profile.lastName || "",
        email: user.account?.email || "",
        specialty: user.profile.specialty || "",
        currentRole: user.profile.currentRole || "",
        postgraduateDegree: user.profile.postgraduateDegree || "",
        professionalExperience: user.profile.professionalExperience || "",
        bio: user.profile.bio || "",
      });
    }
  }, [user, reset, open]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        role: "MENTOR",
        mentor: {
          firstName: data.firstName,
          lastName: data.lastName,
          specialty: data.specialty,
          currentRole: data.currentRole,
          postgraduateDegree: data.postgraduateDegree,
          professionalExperience: Number(data.professionalExperience),
          bio: data.bio,
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(payload));

      const res = await updateProfile(formDataToSend).unwrap();

      if (res.success) {
        toast.success("Profile updated successfully");

        // Refresh user data in store
        const meRes = await getMe(undefined, false).unwrap();
        dispatch(
          setUser({
            user: meRes?.data,
            accessToken: token,
          })
        );

        setOpen(false);
      }
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] overflow-y-scroll max-h-[90vh] lg:overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <UserRound className="w-6 h-6" /> Profile Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Enter first name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Enter last name"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className="md:col-span-2 grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                {...register("email")}
                disabled
                className="bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 italic font-normal">
                Email cannot be changed here.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="specialty">Medical Specialty</Label>
              <Input
                id="specialty"
                {...register("specialty", {
                  required: "Specialty is required",
                })}
                placeholder="e.g. Cardiology"
                className={errors.specialty ? "border-red-500" : ""}
              />
              {errors.specialty && (
                <span className="text-red-500 text-xs">
                  {errors.specialty.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currentRole">Current Role</Label>
              <Input
                id="currentRole"
                {...register("currentRole", {
                  required: "Current role is required",
                })}
                placeholder="e.g. Resident Doctor"
                className={errors.currentRole ? "border-red-500" : ""}
              />
              {errors.currentRole && (
                <span className="text-red-500 text-xs">
                  {errors.currentRole.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="postgraduateDegree">Post Graduate Degree</Label>
              <Input
                id="postgraduateDegree"
                {...register("postgraduateDegree")}
                placeholder="e.g. MD, MS"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="professionalExperience">Year of Experience</Label>
              <Input
                id="professionalExperience"
                type="number"
                {...register("professionalExperience")}
                placeholder="e.g. 5"
              />
            </div>

            <div className="grid col-span-1 md:col-span-2 gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                rows={5}
                placeholder="Write about yourself..."
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-white pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-main hover:bg-blue-600 text-white cursor-pointer min-w-[120px]"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}