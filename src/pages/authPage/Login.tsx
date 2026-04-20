/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import signupImage from "../../assets/signUp/signUpImage.png";
// import logo from "../../assets/signUp/logo.png";
import {
  useLazyGetMeQuery,
  useLoginMutation,
  useSignInWithGoogleMutation,
} from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/features/auth/auth.slice";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { auth, googleProvider } from "@/config/firebase.config";
import { signInWithPopup } from "firebase/auth";

const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const [signInWithGoogle, { isLoading: isSocialLoading }] = useSignInWithGoogleMutation();
  const [getMeTrigger] = useLazyGetMeQuery(); // lazy query trigger
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAuthSuccess = async (accessToken: string) => {
    Cookies.set("accessToken", accessToken);
    const meData = await getMeTrigger(undefined, false).unwrap();
    const user = meData?.data;
    const role = user?.account?.role;
    
    dispatch(
      setUser({
        accessToken,
        user,
      })
    );

    const roleRoutes: Record<string, string> = {
      ADMIN: "/admin",
      MENTOR: "/mentor",
      STUDENT: "/dashboard",
      PROFESSIONAL: "/dashboard",
    };

    navigate(roleRoutes[role] || "/", { replace: true });
  };

  const onSubmit = async (loginFormData: LoginFormInputs) => {
    try {
      const res = await login({
        email: loginFormData.email,
        password: loginFormData.password,
      }).unwrap();

      if (res?.success) {
        await handleAuthSuccess(res.data.accessToken);
      } else {
        toast.error(res?.error?.data?.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(
        err?.data?.message || "Something went wrong. Please try again."
      );
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const res = await signInWithGoogle({
        email: user.email || "",
        name: user.displayName || "",
        photo: user.photoURL || "",
      }).unwrap();
      
      if (res?.success) {
        await handleAuthSuccess(res.data.accessToken);
        toast.success("Logged in successfully with Google");
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error(err?.data?.message || "Google login failed");
      }
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
          <Link to="/">
            <img src="/logo.svg" alt="Logo" className="w-40 h-16 lg:h-20 " />
            {/* <img src={logo} alt="" /> */}
          </Link>
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
          <h2 className="text-2xl font-semibold text-[#09090B]">Login</h2>
          <p className="text-sm font-normal text-[#64748B] leading-5 mb-6 mt-2">
            Enter your email below to login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <h3 className="text-sm text-[#020617] font-medium leading-5 mb-2 mt-4">
                Email
              </h3>
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-[#020617] font-medium leading-5 mb-2 mt-4">
                  Password
                </h3>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-[#020617] font-medium mb-2 mt-4 hover:underline cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="********"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-500 hover:text-gray-700 select-none"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading || isSocialLoading}
              className="w-full bg-blue-main text-sm font-medium text-[#FAFAFA] p-3 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting || isLoading || isSocialLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            disabled={isSubmitting || isLoading || isSocialLoading}
            className="w-full flex items-center justify-center text-sm text-[#3F3F46] font-medium border border-[#D2D6DB] p-[8px] rounded-lg hover:bg-gray-100 mt-2 cursor-pointer disabled:opacity-50"
          >
            <FcGoogle className="mr-2 text-xl" />
            {isSocialLoading ? "Connecting..." : "Google"}
          </button>

          <p className="text-sm text-center text-[#020617] mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
