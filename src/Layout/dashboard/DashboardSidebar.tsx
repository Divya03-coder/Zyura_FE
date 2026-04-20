import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC } from "react";
import { cn } from "@/lib/utils";

import { SidebarItem, sidebarItems } from "./sidebarConfig";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onLinkClick?: () => void;
}

const DashboardSidebar: FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  onLinkClick,
}) => {
  const groupedItems = sidebarItems.reduce(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {} as Record<string, SidebarItem[]>,
  );

  const renderNavItem = (item: SidebarItem) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.path === "/dashboard"}
      onClick={(e) => {
        if (item.disabled) {
          e.preventDefault();
          return;
        }
        onLinkClick?.();
      }}
      className={({ isActive }) =>
        cn(
          `flex items-center gap-3 px-1.5 py-2 rounded-lg transition-all duration-200 group relative ${item.fieldBg}`,
          collapsed ? "justify-center" : "",
          item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
          !item.disabled &&
            (isActive
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-50"),
        )
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={cn(
              "flex items-center justify-center rounded-lg transition-colors",
              collapsed ? "w-9 h-9" : "w-8 h-8",
              isActive ? "bg-blue-100" : item.iconBgColor,
            )}
          >
            {item.isImageIcon ? (
              <img
                src={item.icon as string}
                alt={item.label}
                className={cn(
                  "shrink-0 object-contain",
                  collapsed ? "h-6 w-6" : "h-6 w-6",
                )}
              />
            ) : (
              <item.icon
                className={cn(
                  "shrink-0",
                  collapsed ? "h-6 w-6" : "h-6 w-6",
                  isActive ? "text-blue-700" : item.iconColor,
                )}
              />
            )}
          </div>
          {!collapsed && <span className="text-sm truncate">{item.label}</span>}

          {/* Tooltip for collapsed state */}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              {item.label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-30",
        collapsed ? "w-20" : "w-[280px]",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div
          className={cn(
            "flex items-center border-b border-gray-200",
            collapsed ? "justify-center px-2 h-16" : "px-4 h-16",
          )}
        >
          {!collapsed && <img src="/logo.svg" alt="Logo" className="h-10" />}
          {collapsed && (
            <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
          )}
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 thin-scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* Main Navigation */}
          <div className="space-y-1 mb-6">
            {groupedItems.main?.map((item) => renderNavItem(item))}
          </div>

          {/* AI Tools */}
          {!collapsed && (
            <div className="px-3 mb-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                AI Tools
              </h3>
            </div>
          )}
          {collapsed && <div className="border-t border-gray-200 my-3" />}
          <div className="space-y-1 mb-6">
            {groupedItems["AI Tools"]?.map((item) => renderNavItem(item))}
          </div>

          {/* Study Materials */}
          {!collapsed && (
            <div className="px-3 mb-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Study Materials
              </h3>
            </div>
          )}
          {collapsed && <div className="border-t border-gray-200 my-3" />}
          <div className="space-y-1 mb-6">
            {groupedItems["Study Materials"]?.map((item) =>
              renderNavItem(item),
            )}
          </div>
        </div>

        {/* Bottom Items */}
        {/* <div className="border-t border-gray-200 p-3 space-y-1">
          {groupedItems.bottom?.map((item) => renderNavItem(item))}

          
          <button
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-700 hover:bg-red-50 hover:text-red-600 group relative",
              collapsed ? "justify-center" : ""
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-red-100 transition-colors",
                collapsed ? "w-9 h-9" : "w-8 h-8"
              )}
            >
              <LogOut
                className={cn(
                  "flex-shrink-0 text-gray-600 group-hover:text-red-600",
                  collapsed ? "h-5 w-5" : "h-4 w-4"
                )}
              />
            </div>
            {!collapsed && <span className="text-sm">Logout</span>}

            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div> */}

        {/* Toggle Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-3 w-3 text-gray-600" />
            ) : (
              <ChevronLeft className="h-3 w-3 text-gray-600" />
            )}
          </button>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
