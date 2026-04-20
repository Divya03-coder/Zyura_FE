import FaviconUpdater from "@/components/FaviconUpdater";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SocketTracker from "@/common/SocketTracker";
import ScrollToTop from "@/common/ScrollToTop";

const Layout: React.FC = () => {
  return (
    <div>
      <FaviconUpdater />
      <SocketTracker />
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
