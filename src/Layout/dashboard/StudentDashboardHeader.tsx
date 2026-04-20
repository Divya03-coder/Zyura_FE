import { useGetSettingsQuery } from "@/store/features/adminDashboard/settings/settingApi";
import { logout, selectUser } from "@/store/features/auth/auth.slice";
import { useAppDispatch } from "@/store/hook";
import Cookies from "js-cookie";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DashboardSearch from "./DashboardSearch";

interface StudentDashboardHeaderProps {
  onMenuClick: () => void;
}

const StudentDashboardHeader: React.FC<StudentDashboardHeaderProps> = ({
  onMenuClick,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    dispatch(logout());
    navigate("/login");
  };

  const profileMenuItems = [
    // { label: "Settings", onClick: () => navigate("/dashboard/settings") },
    { label: "Profile", onClick: () => navigate("/dashboard/student-profile") },
    { label: "Help & Support", onClick: () => navigate("/dashboard/help") },
    { label: "Logout", onClick: handleLogout, danger: true },
  ];

  const { data: settings } = useGetSettingsQuery();
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <Link to="/dashboard" className="flex-shrink-0">
            <img
              src={settings?.data?.platformLogo || "/logo.svg"}
              alt="Logo"
              className="h-12 lg:h-14"
            />
          </Link>
        </div>

        {/* Middle Section: Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <DashboardSearch className="bg-gray-50 border-gray-300" />
        </div>

        {/* Right Section: Icons + Profile */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Language Selector */}
          {/* <button className="hidden lg:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium">En</span>
          </button> */}

          {/* Notifications */}
          {/* <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {/* {user?.profile?.firstName.slice(0, 2)} */}
                  {user?.profile?.profile_photo ? (
                    <img
                      src={user?.profile?.profile_photo}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    user?.profile?.firstName.slice(0, 2)
                  )}
                </span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.profile?.firstName} {user?.profile?.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.profile?.studentType}
                </p>
              </div>
              <ChevronDown className="hidden lg:block h-4 w-4 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.profile?.firstName} {user?.profile?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {user?.account?.email}
                    </p>
                  </div>
                  {profileMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.onClick();
                        setIsProfileOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        item.danger
                          ? "text-red-600 hover:bg-red-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <DashboardSearch className="bg-gray-50 border-gray-300" />
      </div>
    </header>
  );
};

export default StudentDashboardHeader;
