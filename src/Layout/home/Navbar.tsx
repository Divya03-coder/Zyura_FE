import React, { useState } from "react";
import { scroller, Link as ScrollLink } from "react-scroll";
import CommonWrapper from "@/common/CommonWrapper";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logout, selectUser } from "@/store/features/auth/auth.slice";
import Cookies from "js-cookie";

const navLinks = [
  { to: "hero", label: "Home", type: "scroll" },
  { to: "tools", label: "Tools", type: "scroll" },
  { to: "study-plan", label: "Study Plan", type: "scroll" },
  { to: "ai-tools", label: "AI Tools", type: "scroll" },
  { to: "mentors", label: "Mentors", type: "scroll" },
  { to: "/pricing", label: "Pricing", type: "route" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser); // get logged in user
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout()); // clear Redux state
    Cookies.remove("accessToken"); // remove token
    navigate("/login"); // redirect
  };

  const handleRedirectToDashboard = () => {
    if (user?.account?.role === "ADMIN") {
      navigate("/admin");
      return;
    } else if (user?.account?.role === "MENTOR") {
      navigate("/mentor");
      return;
    } else if (
      user?.account?.role === "STUDENT" ||
      user?.account?.role === "PROFESSIONAL"
    ) {
      navigate("/dashboard");
      return;
    }
  };

  // Scroll logic that works even after navigation
  const handleScroll = (section: string) => {
    if (location.pathname !== "/") {
      // Go to home first
      navigate("/");
      // Wait a bit for the page to render, then scroll
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      }, 500);
    } else {
      // Already on home, just scroll
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  };

  return (
    <nav className="bg-slate-200 shadow sticky top-0 z-50 py-2">
      <CommonWrapper>
        <div className="px-4 sm:px- lg:px-0">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/logo.svg" alt="Logo" className="w-40 h-16 lg:h-20 " />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex md:justify-between text-[#09090B] font-medium">
              {navLinks.map((link) => {
                if (link.type === "scroll") {
                  if (location.pathname === "/") {
                    return (
                      <ScrollLink
                        key={link.to}
                        to={link.to}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        activeClass="text-[#0058B8]"
                        className="hover:text-[#0058B8] px-3 py-2 rounded-md cursor-pointer bg-transparent border-none whitespace-nowrap"
                      >
                        {link.label}
                      </ScrollLink>
                    );
                  } else {
                    return (
                      <button
                        key={link.to}
                        onClick={() => handleScroll(link.to)}
                        className="hover:text-[#0058B8] px-3 py-2 rounded-md cursor-pointer bg-transparent border-none whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                    );
                  }
                } else {
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`${
                        location.pathname === link.to ? "text-[#0058B8]" : ""
                      } hover:text-[#0058B8] px-3 py-2 rounded-md cursor-pointer`}
                    >
                      {link.label}
                    </Link>
                  );
                }
              })}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRedirectToDashboard}
                    className="text-white px-8 py-2 rounded-[6px] bg-blue-main font-medium hover:bg-blue-700 cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-white px-8 py-2 rounded-[6px] bg-red-600 font-medium hover:bg-red-700 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-white px-4 py-2 rounded-[6px] text-[#0058B8] font-medium cursor-pointer"
                  >
                    Registration
                  </Link>
                  <Link
                    to="/login"
                    className="text-white px-8 py-2 rounded-[6px] bg-[#0058B8] font-medium cursor-pointer"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-blue-700 hover:text-blue-900 focus:outline-none"
              >
                {!isOpen ? <Menu size={28} /> : <X size={28} />}
              </button>
            </div>
          </div>
        </div>
      </CommonWrapper>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-100 border-t border-blue-400/20">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map((link) => {
              if (link.type === "scroll") {
                if (location.pathname === "/") {
                  return (
                    <ScrollLink
                      key={link.to}
                      to={link.to}
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      activeClass="text-[#0058B8]"
                      className="block text-[#09090B] hover:text-[#0058B8] px-3 py-2 rounded-md font-medium cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </ScrollLink>
                  );
                } else {
                  return (
                    <button
                      key={link.to}
                      onClick={() => {
                        handleScroll(link.to);
                        setIsOpen(false);
                      }}
                      className="block w-full text-left text-[#09090B] hover:text-[#0058B8] px-3 py-2 rounded-md font-medium cursor-pointer bg-transparent border-none"
                    >
                      {link.label}
                    </button>
                  );
                }
              } else {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block ${
                      location.pathname === link.to
                        ? "text-[#0058B8]"
                        : "text-[#09090B]"
                    } hover:text-[#0058B8] px-3 py-2 rounded-md font-medium cursor-pointer`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              }
            })}

            {/* Mobile Auth & Dashboard */}
            {user ? (
              <div className="space-y-2 mt-4 border-t border-gray-200 pt-3">
                <button
                  onClick={() => {
                    handleRedirectToDashboard();
                    setIsOpen(false);
                  }}
                  className="w-full text-white px-4 py-2 rounded-md bg-blue-main font-medium hover:bg-blue-700 cursor-pointer"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-white px-4 py-2 rounded-md bg-red-600 font-medium hover:bg-red-700 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 mt-4 border-t border-gray-200 pt-3">
                <Link
                  to="/signup"
                  className="block w-full text-center bg-white px-4 py-2 rounded-md text-[#0058B8] font-medium cursor-pointer border border-[#0058B8] hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Registration
                </Link>
                <Link
                  to="/login"
                  className="block w-full text-center text-white px-4 py-2 rounded-md bg-[#0058B8] font-medium cursor-pointer hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
