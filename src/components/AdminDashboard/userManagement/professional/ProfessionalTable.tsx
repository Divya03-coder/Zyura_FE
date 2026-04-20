import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonDropdown from "@/common/custom/CommonDropdown";
import CommonHeader from "@/common/header/CommonHeader";
import { IoChevronDownSharp } from "react-icons/io5";

import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { slugify } from "@/help/help";
import { useGetProfessionalDataQuery } from "@/store/features/adminDashboard/UserManagement/professionalUserApi";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";
const dropdownItems = [
  { label: "All", value: "" },
  { label: "1 year", value: "1 year" },
  { label: "2 years", value: "2 years" },
  { label: "3 years", value: "3 years" },
  { label: "4 years", value: "4 years" },
  { label: "5 years", value: "5 years" },
  { label: "6 years", value: "6 years" },
  { label: "7 years", value: "7 years" },
  { label: "8 years", value: "8 years" },
  { label: "9 years", value: "9 years" },
  { label: "10+ years", value: "10+ years" },
];

const tableHeaders = [
  { label: "SL", align: "text-center sm:table-cell hidden" },
  { label: "Name", align: "text-center" },
  { label: "Country", align: "text-center sm:table-cell hidden" },
  { label: "Experience", align: "text-center xl:table-cell hidden" },
  { label: "Hospital/Institute", align: "text-center xl:table-cell hidden" },
  { label: "Post-Graduate", align: "text-center lg:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};
const ProfessionalTable = () => {
  const [page, setPage] = useState(1);
  const [experience, setExperience] = useState("");
  const [search, setSearch] = useState("");
  const [selectedExperienceLabel, setSelectedExperienceLabel] =
    useState("Filter");

  const limit = 10;
  const { data, isLoading } = useGetProfessionalDataQuery({
    page,
    limit,
    experience,
    search,
  });

  const professionalData = data?.data || [];
  return (
    <div>
      <DashboardSearch
        onChange={(val) => setSearch(val)}
        className=" !rounded-none mb-5 "
      />
      <div className="flex items-center justify-between pb-5">
        <CommonHeader>Professional Profile</CommonHeader>
        <CommonDropdown
          items={dropdownItems.map((item) => ({
            label: item.label,
            onClick: () => {
              setExperience(item.value);
              setSelectedExperienceLabel(item.label);
              setPage(1);
            },
          }))}
          trigger={
            <ButtonWithIcon
              className="  bg-[#fff] !text-[#09090B] flex !flex-row-reverse"
              icon={IoChevronDownSharp}
            >
              {selectedExperienceLabel}
            </ButtonWithIcon>
          }
        />
      </div>

      <LoadingStatus
        isLoading={isLoading}
        items={professionalData}
        itemName="professional"
      />

      {!isLoading && professionalData.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className={tableDesign.header}>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.label}
                  className={`${tableDesign.cellHeader} ${header.align} `}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {professionalData.map((p, index) => (
              <TableRow key={p._id} className={tableDesign.bodyRow}>
                <TableCell
                  className={`sm:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{(page - 1) * limit + index + 1}</div>
                </TableCell>
                <TableCell className={`${tableDesign.cell}`}>
                  <div>
                    {p.firstName} {p.lastName}
                  </div>
                </TableCell>
                <TableCell
                  className={`sm:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.country}</div>
                </TableCell>
                <TableCell
                  className={`xl:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.experience}</div>
                </TableCell>
                <TableCell
                  className={`lg:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.institution}</div>
                </TableCell>
                <TableCell
                  className={`xl:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.post_graduate}</div>
                </TableCell>
                <TableCell className={`${tableDesign.cell}`}>
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/professional-profile/${p.accountId}/${slugify(
                        p.firstName
                      )}`}
                      className="text-[#1D4ED8] cursor-pointer"
                    >
                      <LuEye size={24} />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {professionalData.length > 0 && (
        <div className="my-10">
          <Pagination
            currentPage={page}
            totalPages={data?.meta.totalPages || 1}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
};

export default ProfessionalTable;
