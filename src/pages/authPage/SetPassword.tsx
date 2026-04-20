
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from "react-router-dom";
import signupImage from "../../assets/signUp/signUpImage.png";
import logo from "../../assets/signUp/logo.png"

const signupSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"], // <-- show error under confirmPassword
        message: "Passwords do not match",
    });

type SignupFormInputs = z.infer<typeof signupSchema>;

const SetPassword = () => {
    // const [preview, setPreview] = useState<string | null>(null);
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormInputs>({
        resolver: zodResolver(signupSchema),
    });

    // const navigate = useNavigate();

    // Email signup
    const onSubmit = (data: SignupFormInputs) => {
        const formData = new FormData();
        formData.append("email", data.newPassword);
        // formData.append("password", data.password);

        console.log("Signup Data:", Object.fromEntries(formData));
        // navigate("/login");
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
                    {/* <h1 className="text-blue-600 font-bold text-lg">
            Medical Student Hub
          </h1> */}
                    <img src={logo} alt="" />
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
                <div className="w-full max-w-sm border border-[#E2E8F0] p-6 rounded-[8px]">
                    <h2 className="text-2xl font-semibold text-[#020617]">Password</h2>
                    <p className="max-w-[320px] text-sm font-normal text-[#64748B] leading-5 mb-6 mt-2">Set your password here. After saving, you'll be logged out.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        {/*New Password */}
                        <div>
                            <h3 className="text-sm text-[#020617] font-medium mb-2">New password</h3>
                            <input
                                type="password"
                                placeholder=""
                                {...register("newPassword")}
                                className="w-full p-3 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                            )}
                        </div>

                        {/* confirmPassword */}
                        <div>
                            <h3 className="text-sm text-[#020617] font-medium mb-2 mt-4">Confirm password</h3>
                            <input
                                type="password"
                                placeholder=""
                                {...register("confirmPassword")}
                                className="w-full p-3 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Sign up button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-sm font-medium text-[#FAFAFA] p-3 rounded-md hover:bg-gray-800 mt-6 cursor-pointer"
                        >
                            Save change
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetPassword;
