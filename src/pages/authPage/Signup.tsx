import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import signupImage from "../../assets/signUp/signUpImage.png";
// import logo from "../../assets/signUp/logo.png";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRegisterUserMutation, useSignInWithGoogleMutation, useLazyGetMeQuery, useGetAllStudentTypeQuery } from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import { auth, googleProvider } from "@/config/firebase.config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/features/auth/auth.slice";

const signupSchema = z.object({
  firstName: z.string().nonempty("First name is required"),   // ✅ kept
  lastName: z.string().nonempty("Last name is required"),     // ✅ kept
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
  studentType: z.string().nonempty("Profile type is required"),
  // ❌ removed phone (was never in schema before, caused the bug)
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [signInWithGoogle, { isLoading: isSocialLoading }] = useSignInWithGoogleMutation();
  const [getMeTrigger] = useLazyGetMeQuery();
  const { data: studentTypeData, isLoading: isStudentTypeLoading } = useGetAllStudentTypeQuery({});
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

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

  // Email signup
  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const result = await registerUser({
        firstName: data.firstName,   // ✅ added
        lastName: data.lastName,     // ✅ added
        email: data.email,
        password: data.password,
        studentType: data.studentType,
        // ❌ removed data.phone (not in schema)
      }).unwrap();

      if (result.success) {
        toast.success("Account created successfully");
        navigate("/login");
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Error: ", err);
    }
  };

  const handleGoogleSignup = async () => {
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
        toast.success("Signed up successfully with Google");
      }
    } catch (err: any) {
      console.error("Google signup error:", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error(err?.data?.message || "Google signup failed");
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
            {/* <img src={logo} alt="Logo" /> */}
          </Link>
        </div>
        <div className="absolute bottom-6 left-6 bg-white/80 p-4 rounded-lg text-sm max-w-sm">
          <p className="italic text-gray-700">
            "This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before."
          </p>
          <p className="mt-2 font-semibold text-gray-900">Sofia Davis</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-[#09090B]">
            Create an account
          </h2>
          <p className="text-sm font-normal text-[#71717A] leading-5 mb-6 mt-2">
            Enter your details below to create your student account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

            {/* ✅ First Name + Last Name — added side by side */}
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Last name"
                  {...register("lastName")}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
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

            {/* Profile Type */}
            <div>
              <select
                {...register("studentType")}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isStudentTypeLoading}
              >
                <option value="">Select your profile type</option>
                {studentTypeData?.data?.map((type: any) => (
                  <option key={type._id} value={type.typeName}>
                    {type.typeName}
                  </option>
                ))}
              </select>
              {errors.studentType && (
                <p className="text-red-500 text-sm">{errors.studentType.message}</p>
              )}
            </div>

            {/* ❌ Phone field removed — was never in schema, caused TS errors */}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password")}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-2 cursor-pointer text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Sign up button */}
            <button
              type="submit"
              className="w-full bg-blue-main text-sm font-medium text-[#FAFAFA] p-3 rounded-md hover:bg-blue-600 cursor-pointer disabled:opacity-50"
              disabled={isSubmitting || isLoading || isSocialLoading}
            >
              {isSubmitting || isLoading || isSocialLoading ? "Loading..." : "Sign up with Email"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-xs text-[#71717A] font-normal">
              OR CONTINUE WITH
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleSignup}
            disabled={isSubmitting || isLoading || isSocialLoading}
            className="w-full flex items-center justify-center text-sm text-[#3F3F46] font-medium border border-[#D2D6DB] p-[8px] rounded-lg hover:bg-gray-100 cursor-pointer disabled:opacity-50"
          >
            <FcGoogle className="mr-2 text-xl" />
            {isSocialLoading ? "Connecting..." : "Google"}
          </button>

          {/* Terms + Sign in */}
          <p className="text-xs text-[#71717A] font-normal mt-6 px-8 text-center">
            By clicking continue, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
            .
          </p>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;