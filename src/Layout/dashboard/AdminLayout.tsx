import CommonWrapper from "@/common/CommonWrapper";
import AdminSidebar from "@/components/AdminDashboard/reuseable/AdminSidebar";
import DashboardHeader from "@/components/AdminDashboard/reuseable/DashboardHeader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { pathname } = useLocation();

  const hideSidebar =
    pathname.startsWith("/admin/student-profile/") ||
    pathname.startsWith("/admin/professional-profile/") ||
    pathname.startsWith("/admin/mentor-profile/");

  return (
    <div className="w-full min-h-screen bg-slate">
      <div className="w-full flex items-center justify-between bg-white">
        <DashboardHeader sidebarOpen={sidebarOpen} />
        <div className="lg:hidden pr-4">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger className="cursor-pointer" asChild>
              <button className="p-2 rounded-md border border-slate-200">
                <Menu className="h-6 w-6 cursor-pointer" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-70">
              <AdminSidebar
                sidebarOpen={true}
                onLinkClick={() => setSidebarOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex items-start px-4.5 pt-6 gap-6">
        {!hideSidebar && (
          <div className="hidden lg:block">
            <AdminSidebar sidebarOpen={true} />
          </div>
        )}

        <div className="flex-1">
          {hideSidebar ? (
            <CommonWrapper>
              <Outlet />
            </CommonWrapper>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
