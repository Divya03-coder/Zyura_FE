import ButtonWithIcon from "@/common/button/ButtonWithIcon";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";
import { LuDot } from "react-icons/lu";

import CommonButton from "@/common/button/CommonButton";
import { FiSend } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { PayoutProps } from "./data/payout";

const tableHeaders = [
  { label: "Session Details", align: "text-left" },
  { label: "Mentor", align: "text-center xl:table-cell hidden" },
  { label: "Students", align: "text-center lg:table-cell hidden" },
  { label: "Session Fee", align: "text-center xl:table-cell hidden" },
  { label: "Platform Fee", align: "text-center 2xl:table-cell hidden" },
  { label: "Net Amount", align: "text-center 2xl:table-cell hidden" },
  { label: "Status", align: "text-center hidden lg:table-cell" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};
interface AllStudentProfileTable {
  payout: PayoutProps[];
}

const getStatusClasses = (status: string) => {
  if (status === "Pending")
    return "text-[#CA8A04] bg-[#FEFCE8]   border-[#CA8A04]";
  if (status === "Processing")
    return "text-[#1D4ED8] bg-[#EFF6FF] border-[#1D4ED8]";
  if (status === "Completed")
    return "text-[#15803D] bg-[#F0FDF4] border-[#15803D]";
  return "text-gray-700 bg-gray-100";
};

const Payout: FC<AllStudentProfileTable> = ({ payout }) => {
  return (
    <div className="pb-10">
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
          {payout.map((p) => (
            <TableRow key={p.id} className={tableDesign.bodyRow}>
              <TableCell className="border border-border px-4 ">
                <div className="">
                  <div>{p.sessionDetails.name}</div>
                  <div className="flex ">
                    {p.sessionDetails.date}
                    <span className="flex  ">
                      <LuDot size={24} />
                      {p.sessionDetails.time}
                    </span>
                  </div>

                  <CommonButton className="!px-4 !rounded-full">
                    {p.sessionDetails.specialty}
                  </CommonButton>
                </div>
              </TableCell>

              <TableCell className={`hidden xl:table-cell ${tableDesign.cell}`}>
                <div className="flex flex-col">
                  <div> {p.mentor.name}</div>
                  <div> {p.mentor.email}</div>
                </div>
              </TableCell>
              <TableCell className={`hidden lg:table-cell ${tableDesign.cell}`}>
                <div>{p.students}</div>
              </TableCell>
              <TableCell className={`hidden xl:table-cell ${tableDesign.cell}`}>
                <div className="flex flex-col">
                  ${p.sessionFee.amount}
                  <p> Session {p.sessionFee.sessionStatus}</p>
                </div>
              </TableCell>
              <TableCell
                className={`hidden 2xl:table-cell ${tableDesign.cell}`}
              >
                <div className="flex flex-col">
                  <p className="text-[#B91C1C] font-medium font-geist text-lg">
                    -${p.platformFee.amount}
                  </p>
                  <p> {p.platformFee.commission}% commission</p>
                </div>
              </TableCell>
              <TableCell
                className={`hidden 2xl:table-cell ${tableDesign.cell}`}
              >
                <div className="flex flex-col">
                  <p className="text-[#15803D] font-medium font-geist text-lg">
                    {p.netAmount}
                  </p>

                  <p>After fees</p>
                </div>
              </TableCell>
              <TableCell className={`lg:table-cell hidden ${tableDesign.cell}`}>
                <div>
                  <button
                    className={` ${getStatusClasses(
                      p.status
                    )} px-4 py-2 rounded-full border `}
                  >
                    {p.status}
                  </button>
                </div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div className="flex items-center justify-center gap-3  ">
                  <span className="text-[#1D4ED8] cursor-pointer">
                    <LuEye size={24} />
                  </span>

                  <div>
                    <ButtonWithIcon
                      className="!bg-[#737373] hover:!bg-[#15803D]"
                      icon={FiSend}
                    >
                      Pay now
                    </ButtonWithIcon>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Payout;
