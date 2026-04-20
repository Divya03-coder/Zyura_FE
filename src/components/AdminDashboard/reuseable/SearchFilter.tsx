import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";
import CommonButton from "@/common/button/CommonButton";
import { IoFilterSharp } from "react-icons/io5";

const SearchFilter = () => {
  return (
    <div className=" w-full flex items-center justify-between">
      <DashboardSearch />
      <div className="flex gap-2 ">
        <CommonButton className="!py-3">Download as pdf</CommonButton>
        <ButtonWithIcon
          icon={IoFilterSharp}
          className=" bg-[#18181B] text-white"
        >
          Filter
        </ButtonWithIcon>
      </div>
    </div>
  );
};

export default SearchFilter;
