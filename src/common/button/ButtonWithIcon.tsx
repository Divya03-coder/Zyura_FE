import type { ReactNode, ComponentType, ComponentPropsWithoutRef } from "react";

interface ButtonWithIconProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  icon?: ComponentType<{ className?: string }>;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  children,
  icon: Icon,
  className = "",
  ...props
}) => (
  <button
    {...props}
    className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm text-white font-Geist  bg-[#1D4ED8] cursor-pointer ${className}`}
  >
    {Icon && <Icon className="min-w-4 min-h-4" />}
    {children}
  </button>
);

export default ButtonWithIcon;
