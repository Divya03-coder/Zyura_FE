import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import StudentDashboardHeader from "./StudentDashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import SocketTracker from "@/common/SocketTracker";
import ScrollToTop from "@/common/ScrollToTop";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <SocketTracker />
      <ScrollToTop />
      {/* Top Header with Hamburger */}
      <StudentDashboardHeader onMenuClick={() => setSidebarOpen(true)} />

      {/* Navigation Bar (Keep all existing navigation) */}
      {/* <DashboardNavbar /> */}

      <div className="flex">
        {/* Mobile Sidebar in Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px]">
            <DashboardSidebar
              collapsed={false}
              onLinkClick={() => setSidebarOpen(false)}
            />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "lg:ml-20" : "lg:ml-[280px]"
          }`}
        >
          <div className="px-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;