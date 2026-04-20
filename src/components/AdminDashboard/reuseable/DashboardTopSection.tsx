import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonHeader from "@/common/header/CommonHeader";
import MediumHeader from "@/common/header/MediumHeader";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { FaPlus } from "react-icons/fa6";

interface ManagementHeaderProps {
  title: string;
  description?: string;
  className?: string;
  buttonText?: string;
  action?: () => void;
  descriptionClassName?: string;
}

const DashboardTopSection = ({
  title,
  description,
  className,
  buttonText,
  descriptionClassName,
  action,
}: ManagementHeaderProps) => {
  const { type } = useAppSelector((state: RootState) => state.staticContent);
  return (
    <div
      className={`flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6  ${className} `}
    >
      <div className="space-y-2 ">
        {title && <MediumHeader>{title}</MediumHeader>}
        {description && (
          <div className="w-full ">
            <CommonHeader className={`${descriptionClassName}`}>
              {description}
            </CommonHeader>
          </div>
        )}
      </div>
      {type !== "exam" && (
        <div className="flex gap-4.5 items-center">
          {buttonText && (
            <ButtonWithIcon
              icon={FaPlus}
              className="w-full lg:w-auto flex justify-center  shrink-0 "
            >
              <p onClick={action}>{buttonText}</p>
            </ButtonWithIcon>
          )}
        </div>
      )}
    </div>
  );
};
export default DashboardTopSection;
