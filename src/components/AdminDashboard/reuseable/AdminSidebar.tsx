import profile from "@/assets/home/mentor1.png";
import CommonHeader from "@/common/header/CommonHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
} from "lucide-react";
import { BiBookAlt, BiSolidCopy } from "react-icons/bi";
import { LuBookOpenText, LuShieldQuestion } from "react-icons/lu";

import { type FC } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { NavLink } from "react-router-dom";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  section: string;
  notification?: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
  onLinkClick?: () => void;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin",
    section: "Main",
  },
  // User Management
  {
    icon: Users,
    label: "Students",
    path: "/admin/students",
    section: "User Management",
  },
  {
    icon: Users,
    label: "Professionals",
    path: "/admin/professional",
    section: "User Management",
  },
  {
    icon: Users,
    label: "Mentors",
    path: "/admin/mentor",
    section: "User Management",
  },

  {
    icon: LuBookOpenText,
    label: "Content Management",
    path: "/admin/content-management",
    section: "Content & Resources",
  },
  {
    icon: BiBookAlt,
    label: "Resource Management ",
    path: "/admin/resource-management",
    section: "Content & Resources",
  },
  // Mentorship

  {
    icon: Receipt,
    label: "Transaction",
    path: "/admin/transaction",
    section: "Mentorship Management",
  },
  // Community
  {
    icon: Calendar,
    label: "Create Events",
    path: "/admin/create-events",
    section: "Community & Events",
  },
  // Plan
  {
    icon: CreditCard,
    label: "Pricing and Plan",
    path: "/admin/create-plan",
    section: "Plan Management",
  },
  // Support

  {
    icon: IoIosChatboxes,
    label: "Support",
    path: "/admin/support",
    section: "Support System",
  },
  {
    icon: LuShieldQuestion,
    label: "FAQ",
    path: "/admin/faq",
    section: "Support System",
  },

  //settings
  {
    icon: Settings,
    label: "White Level",
    path: "/admin/settings",
    section: "Settings",
  },
  {
    icon: BiSolidCopy,
    label: "Copy URL",
    path: "/admin/url-copy",
    section: "Settings",
  },
];

const AdminSidebar: FC<SidebarProps> = ({ sidebarOpen, onLinkClick }) => {
  const groupedItems = sidebarItems.reduce(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {} as Record<string, SidebarItem[]>,
  );

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-40 w-[280px] transition-transform duration-300 ease-in-out md:translate-x-0 md:static bg-white rounded-[10px] px-5 py-6`}
    >
      {/* <Menu onClick={onLinkClick} className="h-8 w-8 mx-auto cursor-pointer" /> */}
      {/* Profile */}
      <div className="flex items-center gap-3 bg-white border border-[#F1F5F9] rounded-[5px] px-3 py-2 mb-5">
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile} />
          <AvatarFallback>ADMIN</AvatarFallback>
        </Avatar>
        <div className="text-left font-Geist">
          <div className="text-sm text-slate-700">admin@admin.com</div>
          <div className="text-base text-slate-900">super-admin</div>
        </div>
      </div>
      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="mb-6">
            <CommonHeader className="mb-2">{section}</CommonHeader>
            <div className="space-y-1">
              {items.map((item) => (
                <NavLink
                  onClick={onLinkClick}
                  key={item.label}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full h-10 px-2 rounded ${
                      isActive
                        ? "bg-[#E2E8F0] text-orange font-medium"
                        : "hover:bg-muted/50"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;
