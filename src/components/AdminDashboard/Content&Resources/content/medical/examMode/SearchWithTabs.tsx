import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { DifficultyFilter, difficultyOptions } from "@/types";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchWithTabsProps {
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyFilter>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const SearchWithTabs: React.FC<SearchWithTabsProps> = ({
  difficulty,
  setDifficulty,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <CommonBorderWrapper className="space-y-4 w-full">
      <div className="flex flex-col xl:flex-row items-center gap-6">
        <div className="flex items-center gap-2 flex-1 bg-[#EFF6FF] border border-[#fff] rounded-md p-3 w-full xl:w-auto">
          <IoSearchOutline className="w-5 h-5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search ..."
            className="w-full outline-none"
          />
        </div>
        <CommonSelect
          item={difficultyOptions}
          value={difficulty}
          onValueChange={(val) => setDifficulty(val as DifficultyFilter)}
          className="w-full! xl:!w-[150px]"
        />
      </div>
    </CommonBorderWrapper>
  );
};

export default SearchWithTabs;
