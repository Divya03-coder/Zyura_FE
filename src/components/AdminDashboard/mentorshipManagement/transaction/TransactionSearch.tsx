import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonDropdown from "@/common/custom/CommonDropdown";
import { IoChevronDownSharp } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";

const dropdownItems = [
  { label: "Edit" },
  { label: "Delete" },
  { label: "Share" },
];
const TransactionSearch = () => {
  return (
    <div className="flex flex-col xl:flex-row items-start  lg:items-center justify-between">
      <div className=" w-[734px]">
        <DashboardSearch className=" !rounded-none my-5" />
      </div>

      <div className="flex gap-2">
        <CommonDropdown
          items={dropdownItems}
          trigger={
            <ButtonWithIcon
              className=" bg-[#fff] !text-[#09090B] flex !flex-row-reverse"
              icon={IoChevronDownSharp}
            >
              Filter by Month
            </ButtonWithIcon>
          }
        />
        <ButtonWithIcon icon={MdOutlineFileDownload}>Export</ButtonWithIcon>
      </div>
    </div>
  );
};

export default TransactionSearch;
