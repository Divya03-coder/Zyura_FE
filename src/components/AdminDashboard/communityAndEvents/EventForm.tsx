import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CustomSwitch from "@/common/custom/CustomSwitch";
import MediumHeader from "@/common/header/MediumHeader";
import CommonSpace from "@/common/space/CommonSpace";
import { FC, useState } from "react";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import DashboardTopSection from "../reuseable/DashboardTopSection";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@/store/features/adminDashboard/ContentResources/event/eventApi";
import { SingleEvent } from "@/store/features/adminDashboard/ContentResources/event/types/allEvent";
import { CreateEventForm, createEventSchema } from "./createEventSchema";

interface EventFormProps {
  handleCancel: () => void;
  initialData?: SingleEvent;
}

const EventForm: FC<EventFormProps> = ({ handleCancel, initialData }) => {
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateEventForm>({
    resolver: zodResolver(createEventSchema),
    defaultValues: initialData
      ? {
          eventTitle: initialData.eventTitle,
          eventType: initialData.eventType,
          eventFormat: initialData.eventFormat,
          category: initialData.category,
          description: initialData.description,
          eventData: initialData.eventData,
          startTime: initialData.startTime,
          eventDuration: initialData.eventDuration,
          instructor: initialData.instructor,
          eventPrice: initialData.eventPrice,
          meetingDetails: initialData.meetingDetails,
        }
      : undefined,
  });

  const [isPricingEnabled, setIsPricingEnabled] = useState(
    initialData?.eventPrice ? false : true
  );
  const inputClass = {
    input:
      "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
    label:
      "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
  };

  const seminarOptions = [
    { label: "Seminar", value: "Seminar" },
    { label: "Workshop", value: "Workshop" },
    { label: "Conference", value: "Conference" },
  ] as const;

  const onSubmit = async (data: CreateEventForm) => {
    const payload = { ...data, eventPrice: data.eventPrice ?? 0 };
    console.log("payload", payload);

    if (initialData?._id) {
      await updateEvent({ id: initialData._id, data: payload }).unwrap();
    } else {
      await createEvent(payload).unwrap();
    }
    handleCancel();
  };

  return (
    <div>
      <DashboardTopSection
        title={initialData ? "Edit Event" : "Create New Event"}
        description={
          initialData
            ? "Update event details."
            : "Create a new online event, seminar, or workshop with detailed scheduling and pricing options."
        }
      />

      <CommonSpace>
        <CommonBorderWrapper className="!border-0 !rounded-none">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <MediumHeader className="!text-xl !font-normal ">
              Basic Information
            </MediumHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className={inputClass.label}>Event Title</label>
                <input
                  {...register("eventTitle")}
                  placeholder="Event Title"
                  className={inputClass.input}
                />
                {errors.eventTitle && (
                  <p className="text-red-500 text-xs">
                    {errors.eventTitle.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Event Type</label>
                <CommonSelect
                  item={seminarOptions}
                  value={watch("eventType")}
                  onValueChange={(v) => setValue("eventType", v)}
                  className="w-full mb-4 !border-[#9DA4AE] !bg-white"
                />
                {errors.eventType && (
                  <p className="text-red-500 text-xs">
                    {errors.eventType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className={inputClass.label}>Format</label>
                <CommonSelect
                  item={seminarOptions}
                  value={watch("eventFormat")}
                  onValueChange={(v) => setValue("eventFormat", v)}
                  className="w-full !border-[#9DA4AE] !bg-white"
                />
                {errors.eventFormat && (
                  <p className="text-red-500 text-xs">
                    {errors.eventFormat.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Category</label>
                <CommonSelect
                  item={seminarOptions}
                  value={watch("category")}
                  onValueChange={(v) => setValue("category", v)}
                  className="w-full !border-[#9DA4AE] !bg-white"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className={inputClass.label}>Description</label>
              <textarea
                {...register("description")}
                placeholder="Enter description"
                className={inputClass.input}
              />
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className={inputClass.label}>Event Data</label>
              <input
                {...register("eventData")}
                placeholder="Enter event data"
                className={inputClass.input}
              />
              {errors.eventData && (
                <p className="text-red-500 text-xs">
                  {errors.eventData.message}
                </p>
              )}
            </div>

            <MediumHeader className="!text-xl !font-normal mb-3">
              Schedule & Duration
            </MediumHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className={inputClass.label}>Start Time</label>
                <input
                  {...register("startTime")}
                  type="datetime-local"
                  className={inputClass.input}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-xs">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div>
                <label className={inputClass.label}>Duration</label>
                <input
                  {...register("eventDuration")}
                  placeholder="Duration"
                  className={inputClass.input}
                />
                {errors.eventDuration && (
                  <p className="text-red-500 text-xs">
                    {errors.eventDuration.message}
                  </p>
                )}
              </div>
            </div>

            <MediumHeader className="!text-xl !font-normal mb-3">
              Instructor
            </MediumHeader>
            <input
              {...register("instructor")}
              placeholder="Instructor"
              className={inputClass.input}
            />
            {errors.instructor && (
              <p className="text-red-500 text-xs">
                {errors.instructor.message}
              </p>
            )}

            <MediumHeader className="!text-xl !font-normal mb-3">
              Pricing
            </MediumHeader>

            <div className="flex items-center gap-2">
              <label className={inputClass.label}>Pricing</label>

              <CustomSwitch
                checked={isPricingEnabled}
                onChange={(v) => setIsPricingEnabled(v)}
              />

              {!isPricingEnabled && (
                <input
                  {...register("eventPrice", { valueAsNumber: true })}
                  type="number"
                  placeholder="Enter price"
                  className={inputClass.input}
                />
              )}
            </div>

            <MediumHeader className="!text-xl !font-normal mb-3">
              Meeting Details
            </MediumHeader>

            <div>
              <label className={inputClass.label}>Meeting Link</label>
              <input
                {...register("meetingDetails")}
                placeholder="Meeting Link (Zoom, Teams, etc.)"
                className={inputClass.input}
              />
              {errors.meetingDetails && (
                <p className="text-red-500 text-xs">
                  {errors.meetingDetails.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pb-5 sm:pb-0">
              <CommonButton
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </CommonButton>

              <CommonButton
                type="submit"
                disabled={isCreating || isUpdating}
                className="!bg-blue-600 !text-white"
              >
                {initialData
                  ? isUpdating
                    ? "Updating..."
                    : "Update Event"
                  : isCreating
                  ? "Creating..."
                  : "Create and Publish"}
              </CommonButton>
            </div>
          </form>
        </CommonBorderWrapper>
      </CommonSpace>
    </div>
  );
};

export default EventForm;
