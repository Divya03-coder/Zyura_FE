import AlertDialogBox from "@/common/custom/AlertDialogBox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteReportForAdminMutation } from "@/store/features/adminDashboard/support/support";
import { ReportItem } from "@/store/features/adminDashboard/support/types/support";
import { LuEye } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";

const tableHeaders = [
  { label: "Ticket #", align: "text-center lg:table-cell hidden" },
  { label: "Subject", align: "text-center" },
  { label: "User", align: "text-center xl:table-cell hidden" },
  { label: "Status", align: "text-center lg:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 !bg-white ",
  cell: "border border-border px-4 text-center",
};
interface TicketListProps {
  tickets: ReportItem[];
  setSelectedTicket: (ticket: ReportItem) => void;
  setSelectedIndex: (ticket: number) => void;
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "IN_REVIEW":
      return "bg-blue-100 text-blue-700";
    case "REJECTED":
      return "bg-yellow-100 text-yellow-700";
    case "RESOLVED":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  setSelectedTicket,
  setSelectedIndex,
}) => {
  const handleSelectTicket = (ticket: ReportItem) => {
    setSelectedTicket(ticket);
    setSelectedIndex(tickets.indexOf(ticket));
  };

  const [deleteTicket, { isLoading }] = useDeleteReportForAdminMutation();
  const handleDelete = async (id: string) => {
    await deleteTicket(id);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow className={tableDesign.header}>
          {tableHeaders.map((header) => (
            <TableHead
              key={header.label}
              className={`${tableDesign.cellHeader} ${header.align}`}
            >
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {tickets.map((ticket, i) => (
          <TableRow
            key={ticket._id}
            className={`${tableDesign.bodyRow} cursor-pointer`}
          >
            <TableCell
              onClick={() => handleSelectTicket(ticket)}
              className={` hidden lg:table-cell  ${tableDesign.cell}`}
            >
              #{i + 1}
            </TableCell>

            <TableCell className={tableDesign.cell}>
              {ticket.report.text}
            </TableCell>

            <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
              {ticket.name}
            </TableCell>

            <TableCell className={`lg:table-cell hidden ${tableDesign.cell}`}>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium  ${getStatusBadgeClass(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>
            </TableCell>

            <TableCell className={tableDesign.cell}>
              <div className="flex justify-center gap-3">
                <LuEye
                  onClick={() => handleSelectTicket(ticket)}
                  size={22}
                  className="text-[#1D4ED8] cursor-pointer"
                />
                <AlertDialogBox
                  action={() => handleDelete(ticket._id)}
                  isLoading={isLoading}
                  trigger={
                    <button className="text-[#B91C1C] cursor-pointer">
                      <RiDeleteBinLine size={24} />
                    </button>
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TicketList;
