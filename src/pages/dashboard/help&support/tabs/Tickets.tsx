import { useEffect, useState } from "react";
import { Ticket } from "lucide-react";
import TicketsList from "../TicketsList";
// import ChatWindow from "../ChatWindow";
import CreateTicketModal from "../CreateTicketModal";
import { mockTickets } from "../../../../data/mockData";
import { useGetSingleUserReportQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";

export default function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState(mockTickets[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);

  const { data: reportresponse, isLoading } = useGetSingleUserReportQuery({});
  useEffect(() => {
    if (reportresponse?.data) {
      setTickets(reportresponse.data);
    }
  }, [reportresponse]);

  console.log(tickets);

  const handleCreateTicket = () => {
    // ... (rest of the function remains the same)
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            All Ticket
          </h2>
        </div>
      </div>

      <div className="gap-6 min-h-96">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : tickets.length > 0 ? (
          <TicketsList
            tickets={tickets}
            selectedTicket={selectedTicket}
            onSelectTicket={setSelectedTicket}
          />
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-bold text-lg">No Tickets found</p>
            <p className="text-slate-400 text-sm mt-1">
              You haven't submitted any tickets yet.
            </p>
          </div>
        )}
      </div>

      {/* Main Content - List and Chat */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-96"> */}
      {/* Tickets List - Left */}
      {/* <div className="lg:col-span-1">
          <TicketsList
            tickets={tickets}
            selectedTicket={selectedTicket}
            onSelectTicket={setSelectedTicket}
          />
        </div> */}

      {/* Chat Window - Right */}
      {/* <div className="">
          {selectedTicket ? (
            <ChatWindow ticket={selectedTicket} />
          ) : (
            <div className="bg-white rounded-lg border border-border h-full flex items-center justify-center p-6 text-center">
              <p className="text-muted-foreground">
                Select a ticket to start chatting
              </p>
            </div>
          )}
        </div>
      </div> */}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <CreateTicketModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTicket}
        />
      )}
    </div>
  );
}
