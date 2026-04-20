import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import Spinner from "@/common/button/Spinner";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/common/custom/useDebounce";
import CommonSpace from "@/common/space/CommonSpace";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";
import { useGetResourceCarrierQuery } from "@/store/features/adminDashboard/ContentResources/resourceCariier/resourceCarrierApi";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";

const ResourceSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [viewAll, setViewAll] = useState(false);
  const [viewAllPage, setViewAllPage] = useState<number>(5);

  const { data, isLoading } = useGetResourceCarrierQuery({
    page: currentPage,
    limit: viewAllPage,
    searchTerm: debouncedSearchTerm,
  });

  const cardLists = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewAll = () => {
    setViewAll(true);
    setViewAllPage(data?.meta.total ?? 0);
    setCurrentPage(1);
  };
  return (
    <div>
      <CommonSpace>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-10 ">
          <DashboardSearch
            value={searchTerm}
            onChange={setSearchTerm}
            className=" rounded-none! w-full  md:max-w-[734px]! "
          />
          <ButtonWithIcon
            icon={FaPlus}
            className="w-full sm:w-auto flex justify-center  shrink-0 "
          >
            <Link to="create-carrier">Add Resource</Link>
          </ButtonWithIcon>
        </div>
      </CommonSpace>

      <div className={viewAll ? "mb-10" : ""}>
        {isLoading ? (
          <Spinner />
        ) : cardLists.length === 0 ? (
          <p className="flex justify-center">No Data Found</p>
        ) : (
          <ResourceCard data={cardLists} handleViewAll={handleViewAll} />
        )}
      </div>

      {cardLists.length > 0 && !viewAll && (
        <div className="py-10">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ResourceSection;
