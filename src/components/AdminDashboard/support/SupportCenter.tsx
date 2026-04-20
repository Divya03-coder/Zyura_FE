import Spinner from "@/common/button/Spinner";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/common/custom/useDebounce";
import CommonSpace from "@/common/space/CommonSpace";
import { useGetAllReportForAdminQuery } from "@/store/features/adminDashboard/support/support";
import { ReportItem } from "@/store/features/adminDashboard/support/types/support";
import { useState } from "react";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";
import DashboardTopSection from "../reuseable/DashboardTopSection";
import Tabs from "../reuseable/Tabs";
import TicketDetail from "./TicketDetail";
import TicketList from "./TicketList";

const SupportCenter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllReportForAdminQuery({
    page: currentPage,
    limit: 20,
  });

  const totalPages = data?.meta.totalPages ?? 1;
  const [selectedTicket, setSelectedTicket] = useState<ReportItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const tickets = data?.data ?? [];
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      ticket.status.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && ticket.status === activeTab;
  });

  const getTabCount = (status: string) => {
    if (status === "all") return tickets.length;
    return tickets.filter((t) => t.status === status).length;
  };

  const tabs = [
    { label: `All Tickets (${getTabCount("all")})`, value: "all" },
    { label: `In-Progress (${getTabCount("IN_REVIEW")})`, value: "IN_REVIEW" },
    { label: `Resolved (${getTabCount("RESOLVED")})`, value: "RESOLVED" },
    { label: `Rejected (${getTabCount("REJECTED")})`, value: "REJECTED" },
  ];

  // handle pagination

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex h-screen flex-col ">
      <DashboardTopSection
        title="Support Center"
        description="Manage support tickets and customer inquiries"
      />
      <CommonSpace>
        <div className="flex flex-wrap justify-between gap-2   bg-white p-6 ">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          <div className="w-full xl:w-[734px]">
            <DashboardSearch
              value={searchTerm}
              onChange={setSearchTerm}
              className="!rounded-sm "
            />
          </div>
        </div>
      </CommonSpace>
      {isLoading ? (
        <Spinner />
      ) : filteredTickets.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">No tickets found</p>
        </div>
      ) : (
        <div className="flex flex-col 2xl:flex-row   justify-center items-start gap-2">
          <TicketList
            tickets={filteredTickets}
            setSelectedTicket={setSelectedTicket}
            setSelectedIndex={setSelectedIndex}
          />
          {selectedTicket && (
            <div className=" w-full 2xl:w-185  shrink-0 overflow-hidden">
              <TicketDetail
                ticket={selectedTicket}
                selectedIndex={selectedIndex ?? 0}
                setSelectedTicket={setSelectedTicket}
              />
            </div>
          )}
        </div>
      )}

      {filteredTickets.length > 0 && (
        <div className="py-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SupportCenter;
