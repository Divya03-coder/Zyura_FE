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
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { PaymentProps } from "./data/PaymentHistory";

interface AllStudentProfileTable {
  payment: PaymentProps[];
}

const getStatusClasses = (status: string) => {
  if (status === "unpaid")
    return "text-[#CA8A04] bg-[#FEFCE8]   border-[#CA8A04]";
  if (status === "paid") return "text-[#15803D] bg-[#F0FDF4] border-[#15803D]";
  return "text-gray-700 bg-gray-100";
};

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};

const tableHeaders = [
  { label: "Session Details", align: "text-left" },
  { label: "Mentor", align: "text-center xl:table-cell hidden" },
  { label: "Amount Paid", align: "text-center hidden 2xl:table-cell" },
  { label: "Payment Method", align: "text-center xl:table-cell hidden" },
  { label: "Paid On", align: "text-center 2xl:table-cell hidden" },
  { label: "Status", align: "text-center" },
  { label: "Action", align: "text-center" },
];
const PaymentHistory: FC<AllStudentProfileTable> = ({ payment }) => {
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
          {payment.map((p) => (
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
              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div className="flex flex-col">
                  <div> {p.mentor.name}</div>
                  <div> {p.mentor.email}</div>
                </div>
              </TableCell>
              <TableCell
                className={`2xl:table-cell hidden ${tableDesign.cell}`}
              >
                <div className="flex flex-col">
                  <p className="text-[#15803D] font-medium font-geist text-lg">
                    {p.amountPaid}
                  </p>

                  <p>After fees</p>
                </div>
              </TableCell>
              <TableCell
                className={`xl:table-cell hidden  ${tableDesign.cell}`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <span
                      className={
                        p.paymentMethod === "PayPal"
                          ? "text-[#9810FA]"
                          : "text-[#155DFC]"
                      }
                    >
                      <GoDotFill size={20} />
                    </span>
                    {p.paymentMethod}
                  </div>
                  <div> {p.mentor.email}</div>
                </div>
              </TableCell>
              <TableCell
                className={`2xl:table-cell hidden ${tableDesign.cell}`}
              >
                <div className="flex flex-col">
                  <div> {p.paidOn.date}</div>
                  <div> {p.paidOn.time}</div>
                </div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div>
                  <button
                    className={` ${getStatusClasses(
                      p.status
                    )} px-4 py-2 rounded-full border capitalize `}
                  >
                    {p.status}
                  </button>
                </div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div className="flex items-center justify-center gap-3  ">
                  <span>
                    <BsFillFileEarmarkPdfFill size={20} />
                  </span>
                  <p className="text-[#0A0A0A]">Receipt</p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistory;
