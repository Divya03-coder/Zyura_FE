import Spinner from "@/common/button/Spinner";
import EventForm from "@/components/AdminDashboard/communityAndEvents/EventForm";
import EventTable from "@/components/AdminDashboard/communityAndEvents/EventTable";
import EventTop from "@/components/AdminDashboard/communityAndEvents/EventTop";
import { useGetEventQuery } from "@/store/features/adminDashboard/ContentResources/event/eventApi";
import {
  EventsOverview,
  SingleEvent,
} from "@/store/features/adminDashboard/ContentResources/event/types/allEvent";
import { useState } from "react";

const CreateEvents = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SingleEvent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const handleCreateEvent = () => {
    setShowCreateEvent(true);
    setEditingEvent(null);
  };

  // Pass currentPage and limit to the query
  const { data, isLoading } = useGetEventQuery({
    page: currentPage,
    limit,
  });

  const eventData = data?.data.events ?? [];
  const overview = data?.data.overview ?? [];
  const totalPages = data?.meta.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //handleEdit

  const handleEditClick = (event: SingleEvent) => {
    setEditingEvent(event);
    setShowCreateEvent(true);
  };

  return (
    <>
      <div>
        {showCreateEvent ? (
          <div>
            <EventForm
              handleCancel={() => setShowCreateEvent(false)}
              initialData={editingEvent || undefined}
            />
          </div>
        ) : (
          <div>
            {isLoading ? (
              <Spinner />
            ) : eventData.length === 0 ? (
              <p>No events found</p>
            ) : (
              <div>
                <EventTop
                  handleCreateEvent={handleCreateEvent}
                  overview={overview as EventsOverview}
                />
                <EventTable
                  eventData={eventData}
                  overview={overview as EventsOverview}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  handleEditClick={handleEditClick}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CreateEvents;
