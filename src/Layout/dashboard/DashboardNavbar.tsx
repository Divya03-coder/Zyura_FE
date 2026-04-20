import { useState } from "react";
import {
  Search,
  Settings,
  User,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
  Globe,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import { useAppDispatch } from "@/store/hook";
import { logout } from "@/store/features/auth/auth.slice";
import Cookies from "js-cookie";

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Cookies.remove("accessToken"); // Remove token
    dispatch(logout()); // Clear Redux state
    navigate("/login"); // Redirect to login
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleItemClick = (item: any) => {
    setIsProfileOpen(false);
    if (item.action) item.action();
    else navigate(item.href);
  };

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "MCQ Bank", href: "/dashboard/mcq-bank" },
    { name: "Flash Cards", href: "/dashboard/flashcard-page" },
    { name: "Clinical Cases", href: "/dashboard/clinical-case-generator" },
    { name: "Download Notes", href: "/dashboard/download-notes" },
    { name: "OSCE / Clinical Skills Lab", href: "/dashboard/osce" },
    { name: "Diagram Explorer", href: "/dashboard/bio-digital" },
    { name: "AI Tutor", href: "/dashboard/ai-tutor" },
    { name: "Gamified Learning", href: "/dashboard/gamified-learning" },
  ];

  const moreItems = [
    { name: "CME/CPD Courses", href: "/dashboard/courses" },
    { name: "Quiz Generator", href: "/dashboard/quiz-page" },
    { name: "Community & Event", href: "/dashboard/community-event" },
    { name: "Smart Study", href: "/dashboard/smart-study" },
    { name: "Drug Cards/Pharmacology", href: "/dashboard/drug-cards" },
    { name: "Mentorship", href: "/dashboard/mentorship" },
    { name: "Resources", href: "/dashboard/resources" },
  ];

  const profileItems = [
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Profile", icon: User, href: "/dashboard/student-profile" },
    { name: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
    { name: "Logout", icon: LogOut, href: "#", action: handleLogout },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  const isMoreSectionActive = () =>
    moreItems.some((item) => isActiveRoute(item.href));

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <CommonWrapper>
        <div className="flex justify-between items-center">
          {/* Logo + Search */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/dashboard">
              <img src="/logo.svg" alt="Logo" className="w-40 h-16 lg:h-20 " />
            </Link>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Type to search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-main focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language & Notifications */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-2">
                <Globe className="h-5 w-5" /> <span>En</span>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-sm focus:outline-none"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">EH</span>
                </div>
                <span className="hidden lg:block text-gray-700 font-medium">
                  Emma Harrison
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        Profile & Settings
                      </p>
                    </div>
                    {profileItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleItemClick(item)}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <item.icon className="h-4 w-4 text-gray-600" />
                        </div>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-wrap justify-between lg:items-center lg:space-x-2 mt-2">
          {navigationItems.slice(0, 10).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-3 py-2 font-medium text-sm transition-colors duration-200 text-nowrap ${
                isActiveRoute(item.href)
                  ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isMoreSectionActive()
                  ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              More <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isMoreOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMoreOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  {moreItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                        isActiveRoute(item.href)
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </CommonWrapper>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                  isActiveRoute(item.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-2 border-t border-gray-200">
              <p className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                More
              </p>
              {moreItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    isActiveRoute(item.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Logout */}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-white px-4 py-2 rounded-md bg-red-600 font-medium hover:bg-red-700 cursor-pointer mt-2"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
