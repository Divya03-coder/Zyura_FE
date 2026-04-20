// src/routes/AuthRoutes.tsx
import ForgotPassword from "@/pages/authPage/ForgotPassword";
import Login from "@/pages/authPage/Login";
import MultiStepRegisterForm from "@/pages/authPage/MultiStepRegisterForm";
import ResetPassword from "@/pages/authPage/ResetPassword";
import SetPassword from "@/pages/authPage/SetPassword";
import Signup from "@/pages/authPage/Signup";
// import VerificationOTP from "@/pages/authPage/VerificationOTP";

const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //   path: "/verification-otp",
  //   element: <VerificationOTP />,
  // },
  {
    path: "/set-password",
    element: <SetPassword />,
  },
  {
    path: "/multi-step-register",
    element: <MultiStepRegisterForm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
];

export default authRoutes;
