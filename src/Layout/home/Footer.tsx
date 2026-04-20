import footerImage from "@/assets/home/footerImage.svg";
import footerBg from "@/assets/home/footerbg.png";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white relative overflow-hidden pt-44">
      {/* Footer Container */}
      <div className="relative">
        {/* Background Image */}
        <img
          src={footerBg}
          alt="Footer background"
          className="absolute top-0 left-0 w-full h-full object-top z-0"
        />
        {/* Right Side - Floating Image */}
        <img
          src={footerImage}
          alt="Medical consultation"
          className="absolute -top-32 right-4 md:right-8 lg:right-16 xl:right-92 z-10 w-[300px] md:w-[350px] lg:w-[500px] h-[300px] md:h-[350px] lg:h-[500px] object-cover rounded-full shadow-2xl"
        />
        {/* Footer Content */}
        <div className="relative z-20 pt-40 pb-10 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Left Side */}
            <div className="flex-1 max-w-lg">
              <h2 className="text-white text-2xl md:text-3xl font-light mb-8 md:mb-12">
                Ready to get started?
              </h2>

              <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                {/* Navigation Links */}
                <div>
                  <h3 className="text-white text-base font-medium mb-6 opacity-90">
                    Site Map
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        to="#"
                        className="text-white/70 text-sm hover:text-white transition-colors"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-white/70 text-sm hover:text-white transition-colors"
                      >
                        Articles
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-white/70 text-sm hover:text-white transition-colors"
                      >
                        Tools
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="text-white/70 text-sm hover:text-white transition-colors"
                      >
                        For Students
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Membership */}
                <div>
                  <h3 className="text-white text-base font-medium mb-6 opacity-90">
                    Membership
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        to="/signup"
                        className="text-white/70 text-sm hover:text-white transition-colors"
                      >
                        Become a Member
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="px-4 sm:px-6 lg:px-0 py-5 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-white/60 text-sm">
                © 2025 Medical Search Hub | All Rights Reserved
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">Follow us on</span>
                <div className="flex gap-3">
                  <Link
                    to="#"
                    className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <FaFacebook className="w-5 h-5 text-white" />
                  </Link>
                  <Link
                    to="#"
                    className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5 text-white" />
                  </Link>
                  <Link
                    to="#"
                    className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <FaTwitter className="w-5 h-5 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
