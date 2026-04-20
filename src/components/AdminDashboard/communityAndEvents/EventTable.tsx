import CommonSpace from "@/common/space/CommonSpace";
import {
  EventsOverview,
  SingleEvent,
} from "@/store/features/adminDashboard/ContentResources/event/types/allEvent";
import { useState } from "react";
import Tabs from "../reuseable/Tabs";
import AllEvent from "./AllEvent";
import UpcomingEvent from "./UpcomingEvent";
const tabs = [
  { label: "Overview", value: "overview" },
  { label: "All Events", value: "all" },
];
interface EventTableProps {
  eventData: SingleEvent[];
  overview: EventsOverview;
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handleEditClick: (event: SingleEvent) => void;
}
const EventTable: React.FC<EventTableProps> = ({
  eventData,
  overview,
  totalPages,
  currentPage,
  handlePageChange,
  handleEditClick,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>
      <CommonSpace>
        <div>
          {activeTab === "overview" && <UpcomingEvent overview={overview} />}
        </div>
        <div>
          {activeTab === "all" && (
            <AllEvent
              events={eventData}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handleEditClick={handleEditClick}
            />
          )}
        </div>
      </CommonSpace>
    </div>
  );
};

export default EventTable;
