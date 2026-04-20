import { selectUser } from "@/store/features/auth/auth.slice";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

type UserRole = "STUDENT" | "MENTOR" | "ADMIN" | "PROFESSIONAL";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.account?.role as UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
