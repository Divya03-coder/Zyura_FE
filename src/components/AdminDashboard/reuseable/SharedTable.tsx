// import type { FC } from "react";
// import { Eye, Download } from "lucide-react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";

// interface BookingTableProps {
//   bookings: Booking[];
//   statusColors?: Record<Booking["status"], string>;
//   onViewClick?: (booking: Booking) => void;
//   onDownloadClick?: (booking: Booking) => void;
// }

// const defaultStatusColors: Record<Booking["status"], string> = {
//   Pending: "text-orange-600",
//   Cancelled: "text-red-600",
//   Rejected: "text-red-600",
//   Accepted: "text-green-600",
//   "In-progress": "text-blue-600",
// };

// export const bookingTableHead = [
//   { key: "sl", label: "SL" },
//   { key: "bookingId", label: "Booking ID" },
//   { key: "bookingDate", label: "Booking Date" },
//   { key: "serviceLocation", label: "Service Location" },
//   { key: "customerInfo", label: "Customer Info" },
//   { key: "providerInfo", label: "Provider Info" },
//   { key: "totalAmount", label: "Total Amount" },
//   { key: "status", label: "Status" },
//   { key: "action", label: "Action" },
// ];

// const SharedTable: FC<BookingTableProps> = ({
//   bookings = [], // Added default empty array to prevent undefined error
//   statusColors = defaultStatusColors,
//   onViewClick,
//   onDownloadClick,
// }) => {
//   return (
//     <div className="w-full">
//       <div className="overflow-x-auto sm:overflow-x-visible">
//         <div className="min-w-[800px] sm:min-w-full">
//           <Table className="border border-border text-center">
//             <TableHeader>
//               <TableRow className="bg-[#EFF6FF] text-base text-[#2C2C2C] font-medium">
//                 {bookingTableHead.map((col) => (
//                   <TableHead
//                     key={col.key}
//                     className="border border-border text-center min-w-[120px] whitespace-nowrap"
//                   >
//                     {col.label}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {bookings.map((booking) => (
//                 <TableRow
//                   key={booking.sl}
//                   className="hover:bg-gray-50 text-[#2C2C2C] text-base font-normal"
//                 >
//                   <TableCell className="border border-border text-center py-4 min-w-[60px]">
//                     {booking.sl.toString().padStart(2, "0")}
//                   </TableCell>
//                   <TableCell className="border border-border text-center min-w-[120px] whitespace-nowrap">
//                     {booking.bookingId}
//                   </TableCell>
//                   <TableCell className="border border-border text-center min-w-[140px]">
//                     <div>
//                       <p className="whitespace-nowrap">
//                         {booking.bookingDate.date}
//                       </p>
//                       <p className="whitespace-nowrap">
//                         {booking.bookingDate.time}
//                       </p>
//                     </div>
//                   </TableCell>
//                   <TableCell className="border border-border text-center min-w-[150px]">
//                     <div
//                       className="max-w-[150px] truncate"
//                       title={booking.serviceLocation}
//                     >
//                       {booking.serviceLocation}
//                     </div>
//                   </TableCell>
//                   <TableCell className="border border-border text-center min-w-[140px]">
//                     <div>
//                       <p
//                         className="whitespace-nowrap truncate max-w-[140px]"
//                         title={booking.customerInfo.name}
//                       >
//                         {booking.customerInfo.name}
//                       </p>
//                       <p className="whitespace-nowrap">
//                         {booking.customerInfo.phone}
//                       </p>
//                     </div>
//                   </TableCell>
//                   <TableCell className="border border-border text-center min-w-[140px]">
//                     <div>
//                       <p
//                         className="whitespace-nowrap truncate max-w-[140px]"
//                         title={booking.providerInfo.name}
//                       >
//                         {booking.providerInfo.name}
//                       </p>
//                       <p className="whitespace-nowrap">
//                         {booking.providerInfo.phone}
//                       </p>
//                     </div>
//                   </TableCell>
//                   <TableCell className="border border-border text-center min-w-[100px] whitespace-nowrap">
//                     {booking.totalAmount}
//                   </TableCell>
//                   <TableCell
//                     className={`border border-border text-center font-medium min-w-[100px] whitespace-nowrap ${
//                       statusColors[booking.status]
//                     }`}
//                   >
//                     {booking.status}
//                   </TableCell>
//                   <TableCell className="border border-border text-center min-w-[80px]">
//                     <div className="flex justify-center gap-3 text-blue-500">
//                       <button
//                         className="hover:text-blue-700"
//                         onClick={() => onViewClick?.(booking)}
//                       >
//                         <Eye size={18} />
//                       </button>
//                       <button
//                         className="hover:text-blue-700"
//                         onClick={() => onDownloadClick?.(booking)}
//                       >
//                         <Download size={18} />
//                       </button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SharedTable;
