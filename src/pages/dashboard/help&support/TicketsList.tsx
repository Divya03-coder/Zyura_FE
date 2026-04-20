// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ChevronRight, CircleAlert, CircleCheck, Clock } from "lucide-react";

// export default function TicketsList({
//   tickets,
//   selectedTicket,
//   onSelectTicket,
// }: any) {
//   return (
//     <div className="space-y-5 bg-white rounded-lg border border-gray-200 p-4 h-64 lg:h-full overflow-y-auto">
//       {tickets.map((ticket: any) => (
//         <button
//           key={ticket.id}
//           onClick={() => onSelectTicket(ticket)}
//           className={`w-full text-left p-4 rounded-lg transition border border-slate-300 cursor-pointer ${
//             selectedTicket?.id === ticket.id
//               ? "bg-blue-50 border border-slate-400"
//               : "hover:bg-gray-50 border"
//           }`}
//         >
//           <div className="items-start justify-between gap-2">
//             <div className="flex-1 flex items-center justify-between">
//               <h3 className="font-normal text-foreground">
//                 {ticket.title}
//               </h3>
//               <div className="flex items-center gap-2 mt-2 flex-wrap">
//                 <span
//                   className={`text-xs px-2 py-1 rounded ${ticket.statusColor}`}
//                 >
//                   {ticket.status === "In Progress" ? (
//                     <div className="flex items-center gap-1 ">
//                       <CircleAlert width={16} />
//                       {ticket.status}
//                     </div>
//                   ) : null}
//                   {ticket.status === "Resolved" ? (
//                     <div className="flex items-center gap-1 ">
//                       <CircleCheck width={16} />
//                       {ticket.status}
//                     </div>
//                   ) : null}
//                 </span>
//                 {/* <span
//                   className={`text-xs px-2 py-1 rounded-full ${ticket.priorityColor}`}
//                   >
//                   {ticket.priority}
//                   </span> */}
//                 {selectedTicket?.id === ticket.id && (
//                   <ChevronRight className="w-5 h-5 text-primary flex-shrink-0" />
//                 )}
//               </div>
//             </div>
//             <p className="text-xs text-muted-foreground">{ticket.id}</p>
//           </div>
//           <p className="text-sm font-normal text-[#717182] my-5">{ticket.description}</p>
//           <p className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
//             <Clock className="w-4 h-4" />
//             {ticket.createdAt}
//           </p>
//         </button>
//       ))}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, Clock } from "lucide-react";

export default function TicketsList({
  tickets,
  selectedTicket,
  onSelectTicket,
}: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-6 space-y-5 bg-white rounded-lg border border-gray-200 p-4 h-64 lg:h-full overflow-y-auto">
      {tickets.map((ticket: any) => {
        const isSelected = selectedTicket?._id === ticket._id;

        // Format date
        const createdAt = new Date(ticket.createdAt).toLocaleDateString();

        // Dynamic status color
        const statusColor =
          ticket.status === "IN_REVIEW"
            ? "bg-yellow-100 text-yellow-800"
            : ticket.status === "RESOLVED"
            ? "bg-green-300 text-green-800"
            : ticket.status === "REJECTED"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700";

        return (
          <button
            key={ticket._id}
            onClick={() => onSelectTicket(ticket)}
            className={`w-full text-left p-4 rounded-lg transition border cursor-pointer ${
              isSelected
                ? "bg-blue-50 border-blue-400"
                : "hover:bg-gray-50 border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              {/* Left: Name */}
              <h3 className="font-medium text-foreground">{ticket.name}</h3>

              {/* Right: Status + Chevron */}
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
                  {ticket.status}
                </span>

                {isSelected && (
                  <ChevronRight className="w-5 h-5 text-primary" />
                )}
              </div>
            </div>

            {/* MCQ ID */}
            <p className="text-xs text-muted-foreground">
              MCQ ID: {ticket.report?.mcqId}
            </p>

            {/* Description */}
            <p className="text-sm text-[#717182] my-3">{ticket.report?.text}</p>

            {/* Feedback */}
            <p className="text-sm text-[#717182] my-3">
              {ticket?.note
                ? `Feedback: ${ticket.note} `
                : "Feedback: On-going"}
            </p>

            {/* Created at */}
            <p className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <Clock className="w-4 h-4" />
              {createdAt}
            </p>
          </button>
        );
      })}
    </div>
  );
}
