import React from "react";
import { Button } from "@/components/ui/button";

// Define the button variant props from shadcn/ui
type ButtonProps = React.ComponentProps<typeof Button>;

// Define our custom props
interface PrimaryButtonProps extends Omit<ButtonProps, "children"> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  bgType?: "gradient" | "solid";
  gradientColors?: string;
  bgColor?: string;
  title?: string;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  iconPosition = "right",
  bgType = "gradient",
  gradientColors = "from-blue-btn-1 to-blue-btn-2",
  bgColor = "bg-blue-500",
  className = "",
  title,
  variant = "default",
  size = "default",
  ...props
}) => {
  // Background classes based on type
  const backgroundClasses: string =
    bgType === "gradient"
      ? `bg-gradient-to-r ${gradientColors} border-0 `
      : `${bgColor} border-0 `;

  // Icon spacing classes
  const iconSpacingClasses: string = icon
    ? iconPosition === "left"
      ? "gap-2"
      : "gap-2 flex-row-reverse"
    : "";

  // Combine classes with shadcn button
  const customClasses: string = `rounded-[6px] cursor-pointer h-auto text-white hover:text-white ${backgroundClasses} ${iconSpacingClasses} ${className}`;

  return (
    <Button
      variant={variant}
      size={size}
      className={customClasses}
      title={title}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}

      {children && <span>{children}</span>}
    </Button>
  );
};

export default PrimaryButton;
