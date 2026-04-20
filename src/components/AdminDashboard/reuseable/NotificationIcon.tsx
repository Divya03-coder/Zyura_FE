import React from "react";

interface NotificationIconProps {
  icon: React.ReactNode;
  count?: number;
  color?: string;
  size?: string;
  className?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  icon,
  count = 0,
  color = "bg-blue-500",
  size = "text-2xl",
  className,
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <span className={size}>{icon}</span>
      {count > 0 && (
        <div
          className={`absolute -top-2 -right-2 ${color} w-5 h-5 rounded-full flex items-center justify-center bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] text-white text-xs font-medium`}
        >
          {count > 99 ? "99+" : count}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
