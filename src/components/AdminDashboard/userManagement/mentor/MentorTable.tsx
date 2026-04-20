import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonDropdown from "@/common/custom/CommonDropdown";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import CommonHeader from "@/common/header/CommonHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { slugify } from "@/help/help";
import { useGetMentorsDataQuery } from "@/store/features/adminDashboard/UserManagement/mentorManagementApi";
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronDownSharp } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";
const dropdownItems = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const tableHeaders = [
  { label: "SL", align: "text-left sm:table-cell hidden" },
  { label: "Name", align: "text-center" },
  { label: "Medical Specialty", align: "text-center lg:table-cell hidden" },
  { label: "Experience", align: "text-center lg:table-cell hidden" },
  { label: "Institution", align: "text-center xl:table-cell hidden" },
  { label: "Designation", align: "text-center xl:table-cell hidden" },
  { label: "Status", align: "text-center sm:table-cell hidden" },

  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};

const MentorTable = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Filter");
  const { data, isLoading } = useGetMentorsDataQuery({
    page,
    status,
    searchTerm: search,
  });

  const mentors = data?.data || [];

  return (
    <div>
      <div className="py-5">
        <DashboardSearch
          onChange={(val) => setSearch(val)}
          className=" rounded-none! my-5"
        />
      </div>

      <div className="flex items-center justify-between pb-5">
        <CommonHeader>Mentor Profile</CommonHeader>
        <CommonDropdown
          items={dropdownItems.map((item) => ({
            label: item.label,
            onClick: () => {
              setStatus(item.value);
              setSelectedStatus(item.label);
              setPage(1);
            },
          }))}
          trigger={
            <ButtonWithIcon
              className="  bg-white text-[#09090B]! flex flex-row-reverse!"
              icon={IoChevronDownSharp}
            >
              {selectedStatus}
            </ButtonWithIcon>
          }
        />
      </div>
      <LoadingStatus isLoading={isLoading} items={mentors} itemName="mentors" />
      {!isLoading && mentors.length > 0 && (
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
            {mentors.map((p, i) => (
              <TableRow key={p._id} className={tableDesign.bodyRow}>
                <TableCell
                  className={`sm:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{i + 1}</div>
                </TableCell>
                <TableCell className={`${tableDesign.cell}`}>
                  <div>
                    {p.firstName} {p.lastName}
                  </div>
                </TableCell>
                <TableCell
                  className={`lg:table-cell hidden  ${tableDesign.cell}`}
                >
                  <div>{p.specialty}</div>
                </TableCell>
                <TableCell
                  className={`lg:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.professionalExperience} years</div>
                </TableCell>
                <TableCell
                  className={`xl:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.hospitalOrInstitute}</div>
                </TableCell>
                <TableCell
                  className={` xl:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.currentRole}</div>
                </TableCell>
                <TableCell
                  className={`sm:table-cell hidden ${tableDesign.cell}`}
                >
                  <div
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
    ${
      p.profileVerification === "APPROVED"
        ? "bg-blue-100 text-blue-700"
        : "bg-red-100 text-red-700"
    }
  `}
                  >
                    {p.profileVerification}
                  </div>
                </TableCell>
                <TableCell className={`${tableDesign.cell}`}>
                  <div className="flex justify-center gap-3  ">
                    <Link
                      to={`/admin/mentor-profile/${p.accountId}/${slugify(
                        p.firstName
                      )}`}
                      className="text-[#1D4ED8] cursor-pointer"
                    >
                      <LuEye size={24} />
                    </Link>
                    <span className="text-[#B91C1C] cursor-pointer">
                      <BiSolidEdit size={24} />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {mentors.length > 0 && (
        <div className="my-10">
          <Pagination
            currentPage={page}
            totalPages={data?.meta?.totalPages || 1}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
};

export default MentorTable;
