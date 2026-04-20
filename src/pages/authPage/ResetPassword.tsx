import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import signupImage from "../../assets/signUp/signUpImage.png";
import logo from "../../assets/signUp/logo.png";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/store/features/auth/auth.api";

// Schema
const resetPasswordSchema = z.object({
  otp: z.string().nonempty("OTP is required"),
  newPassword: z
    .string()
    .nonempty("New password is required")
    .min(6, "Password must be at least 6 characters"),
});

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async (formData: ResetPasswordInputs) => {
    const email = localStorage.getItem("resetEmail"); // ✅ Get email
    if (!email) {
      toast.error("No email found. Please try again.");
      navigate("/forgot-password");
      return;
    }

    try {
      await resetPassword({
        email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      }).unwrap();

      // toast.success(result.message || "Password reset successful!");
      localStorage.removeItem("resetEmail"); // ✅ Clear local storage
      navigate("/login"); // Redirect to login
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Reset failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center">
        <img
          src={signupImage}
          alt="Signup Illustration"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-6 left-6">
          <img src={logo} alt="Logo" />
        </div>
        <div className="absolute bottom-6 left-6 bg-white/80 p-4 rounded-lg text-sm max-w-sm">
          <p className="italic text-gray-700">
            “This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="mt-2 font-semibold text-gray-900">Sofia Davis</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-[450px] border border-[#E2E8F0] p-8 rounded-[8px]">
          <h2 className="text-2xl font-semibold text-[#09090B]">
            Reset Password
          </h2>
          <p className="text-sm font-normal text-[#64748B] leading-5 mb-6 mt-2">
            Enter the OTP sent to your email and your new password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* OTP */}
            <div>
              <h3 className="text-sm text-[#020617] font-medium mb-2 mt-4">
                OTP
              </h3>
              <input
                type="text"
                placeholder="Enter OTP"
                {...register("otp")}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp.message}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <h3 className="text-sm text-[#020617] font-medium mb-2 mt-4">
                New Password
              </h3>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("newPassword")}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-500 hover:text-gray-700 select-none"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-blue-main text-sm font-medium text-[#FAFAFA] p-3 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting || isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="text-sm text-center text-[#020617] mt-4">
            Back to{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
