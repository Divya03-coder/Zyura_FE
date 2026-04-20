import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import logo from "@/assets/dashboard";
import profile from "@/assets/home/mentor1.png";
import CommonWrapper from "@/common/CommonWrapper";
import { useGetSettingsQuery } from "@/store/features/adminDashboard/settings/settingApi";
import { logout } from "@/store/features/auth/auth.slice";
import { useAppDispatch } from "@/store/hook";
import Cookies from "js-cookie";
// import { FaRegBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";
// import NotificationIcon from "./NotificationIcon";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
}

const DashboardHeader = ({ sidebarOpen }: DashboardHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: settings } = useGetSettingsQuery();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("accessToken");
    navigate("/login");
  };
  const headerContent = (
    <header className="sticky top-0 z-50 w-full h-[68px] bg-white px-4.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-7.5">
          <Link to={"/admin"}>
            <img
              className="w-[95px h-14"
              src={settings?.data?.platformLogo || "/logo.svg"}
              alt="logo"
            />
          </Link>
          <div className="hidden md:block">
            <DashboardSearch />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  English (en)
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white border border-border">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {lang.label} ({lang.code})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}

          {/* <NotificationIcon
            className="hidden md:flex"
            icon={<FaRegBell />}
            count={12}
            color="bg-[#E2E8F0]"
          /> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="ghost" className="gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile} />
                  <AvatarFallback>ADMIN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-border"
            >
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer hover:bg-gray-100"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );

  return !sidebarOpen ? (
    headerContent
  ) : (
    <CommonWrapper className="!w-full">{headerContent}</CommonWrapper>
  );
};

export default DashboardHeader;
