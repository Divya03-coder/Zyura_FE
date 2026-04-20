/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ConfirmBooking.jsx
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BsInfoLg } from "react-icons/bs";
import { ArrowLeft } from "lucide-react";
import { useBookSessionMutation } from "@/store/features/mentor/mentor.api";
import { useMastercardCheckout } from "@/hooks/useMastercardCheckout";
import { toast } from "sonner";
type BookingProps = {
  price: number;
  duration: number;
  sessions: number;
  mentorName: string;
  specialty: string;
  mentorId: string;
  mentor: any;
};

type AvailableSlot = {
  date: string;
  displayDate: string;
  day: string;
  spots: number;
};

type TimeSlot = {
  time: string;
  available: boolean;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

// ---------------- Component ----------------
const BookingPage = () => {
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState<AvailableSlot | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // Get props from route state or query params
  const bookingProps: BookingProps = location.state || {
    price: parseInt(new URLSearchParams(location.search).get("price") || "0"),
    duration: parseInt(
      new URLSearchParams(location.search).get("duration") || "0"
    ),
    sessions: parseInt(
      new URLSearchParams(location.search).get("sessions") || "1"
    ),
    mentorName: new URLSearchParams(location.search).get("mentor") || "",
    specialty: new URLSearchParams(location.search).get("specialty") || "",
    mentorId: new URLSearchParams(location.search).get("mentorId") || "",
  };

  // Sync sessions with bookingProps
  useEffect(() => {
    setSessions(bookingProps.sessions);
  }, [bookingProps.sessions]);

  // ---------------- Logic to get dates from mentor availability ----------------
  const getDatesFromAvailability = (availability: any[]) => {
    const dates: AvailableSlot[] = [];
    const today = new Date();
    const daysMap: Record<string, string> = {
      Sunday: "0",
      Monday: "1",
      Tuesday: "2",
      Wednesday: "3",
      Thursday: "4",
      Friday: "5",
      Saturday: "6",
    };

    const shortDaysMap: Record<string, string> = {
      Sunday: "SUN",
      Monday: "MON",
      Tuesday: "TUE",
      Wednesday: "WED",
      Thursday: "THU",
      Friday: "FRI",
      Saturday: "SAT",
    };

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayName = Object.keys(daysMap).find(
        (key) => daysMap[key] === d.getDay().toString()
      );

      const tutorDay = availability.find((a) => a.day === dayName);
      if (tutorDay) {
        dates.push({
          date: d.toISOString().split("T")[0],
          displayDate: `${monthNames[d.getMonth()]} ${d.getDate()}`,
          day: shortDaysMap[dayName!],
          spots: tutorDay.time.length,
        });
      }
    }
    return dates;
  };

  const fetchAvailableDates = async (mentor: any) => {
    if (!mentor?.availability) return [];
    return getDatesFromAvailability(mentor.availability);
  };

  const fetchTimeSlots = async (mentor: any, date: string) => {
    if (!mentor?.availability) return [];
    const d = new Date(date);
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[d.getDay()];
    const tutorDay = mentor.availability.find((a: any) => a.day === dayName);

    if (tutorDay) {
      return tutorDay.time.map((t: string) => ({ time: t, available: true }));
    }
    return [];
  };

  const [bookSession, { isLoading: isBooking }] = useBookSessionMutation();
  const { startCheckout } = useMastercardCheckout();

  // ---------------- Handlers ----------------
  useEffect(() => {
    const loadDates = async () => {
      const dates = await fetchAvailableDates(bookingProps.mentor);
      setAvailableSlots(dates);
    };
    loadDates();
  }, [bookingProps.mentor]);

  const handleDateSelect = async (date: AvailableSlot) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setLoading(true);
    const slots = await fetchTimeSlots(bookingProps.mentor, date.date);
    setTimeSlots(slots);
    setLoading(false);
  };

  const handleTimeSelect = (time: TimeSlot) => setSelectedTime(time);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    const bookingData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      issue: formData.message,
      mentorAccountId: bookingProps.mentor?.accountId || bookingProps.mentorId,
      date: selectedDate.date,
      time: selectedTime.time,
      sessionDuration: `${bookingProps.duration} minutes`,
      sessionValue: bookingProps.price * sessions,
      redirectUrl: `${window.location.origin}/checkout/success?type=mentor_session`,
    };

    try {
      const response = await bookSession(bookingData).unwrap();
      if (response.success && response.data?.sessionId) {
        // URL parameters will be used for verification (no sessionStorage needed)
        // const successUrl = `${window.location.origin}/checkout/success?orderId=${response.data.paymentId}&type=mentor_session`;
        startCheckout(response.data.sessionId,);
      } else {
        toast.error("Failed to initiate booking. Please try again.");
      }
    } catch (error: any) {
      console.error("Booking failed:", error);
      toast.error(error?.data?.message || "Booking failed. Please try again.");
    }
  };

  const handleIncrease = () => setSessions((prev) => prev + 1);
  const handleDecrease = () =>
    setSessions((prev) => (prev > 1 ? prev - 1 : prev));

  const total = bookingProps.price * sessions;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-7 rounded">
        <div className="flex items-center gap-1">
          <Link
            to={`/dashboard/mentor-profile/${
              bookingProps.mentor?.accountId || bookingProps.mentorId
            }`}
          >
            {" "}
            <ArrowLeft size={20} className="mb-1" />
          </Link>
          <h1 className="text-xl font-semibold text-[#111827] mt-7 mb-8">
            Confirm booking
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Information and Availability */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div>
                <CardHeader>
                  <CardTitle className="text-xl text-[#111827] font-semibold mb-4">
                    Contact information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm text-[#111827] font-medium"
                      >
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-sm text-[#111827] font-medium"
                      >
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm text-[#111827] font-medium"
                    >
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm text-[#111827] font-medium"
                    >
                      {/* Message for {bookingProps.mentorName} (optional) */}
                      Type Your Issue
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Add any special requests or notes..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </div>

              {/* Availability Preview */}
              <div>
                <CardHeader>
                  <CardTitle className="text-xl text-[#111827] font-semibold mb-3">
                    Availability
                  </CardTitle>
                  <div className="flex items-center gap-3 bg-[#EBF5FF] py-4 pl-4 rounded-[6px] mb-7">
                    <div className="bg-[#76A9FA] p-1 rounded-full">
                      <BsInfoLg className="text-white" />
                    </div>
                    <p className="max-w-[500px] text-sm text-[#224F9C]">
                      This is just a preview of the mentor's availability.
                      You'll be able to reserve a spot after you confirm
                      booking.
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Date Preview */}
                  <div className="mb-6">
                    <h3 className="text-sm text-[#111827] font-bold mb-3">
                      Date Preview
                    </h3>
                    <p className="text-sm text-[#4A4A4A] mb-4">
                      {availableSlots.length} available days in the next 30
                      days.
                    </p>

                    <div className="overflow-x-auto">
                      <div className="grid grid-cols-8 gap-2 min-w-max">
                        {availableSlots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleDateSelect(slot)}
                            className={`text-center p-2 rounded-lg border transition-all space-y-1 cursor-pointer ${
                              selectedDate?.date === slot.date
                                ? "border-[#21A391] bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="text-xs font-medium text-[#6B7280]">
                              {slot.day}
                            </div>
                            <div className="text-sm font-semibold text-[#111827]">
                              {slot.displayDate}
                            </div>
                            <div
                              className={`text-xs text-[#118577] font-medium`}
                            >
                              {slot.spots} spots
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Available Times */}
                  <div>
                    <h3 className="text-sm text-[#111827] font-bold mb-3">
                      Available Times
                    </h3>
                    {/* <p className="text-sm text-[#4A4A4A] mb-4">
                      In your local time (Asia/Dhaka).
                    </p> */}

                    {/* Time slots */}
                    {loading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    ) : selectedDate ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleTimeSelect(slot)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                              selectedTime?.time === slot.time
                                ? "border-blue-500 bg-blue-500 text-white shadow-md"
                                : slot.available
                                ? "border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                                : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600 text-center">
                          Please select a date to view available time slots
                        </p>
                      </div>
                    )}

                    {/* Selected Date & Time Summary */}
                    {(selectedDate || selectedTime) && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">
                          Selected Slot:
                        </h4>
                        <div className="flex flex-wrap gap-4 text-sm">
                          {selectedDate && (
                            <span className="bg-white px-3 py-1 rounded border">
                              📅 {selectedDate.displayDate} ({selectedDate.day})
                            </span>
                          )}
                          {selectedTime && (
                            <span className="bg-white px-3 py-1 rounded border">
                              ⏰ {selectedTime.time}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 border border-slate-300 p-6 rounded-[8px]">
                <div className="space-y-4">
                  <div className="flex items-center gap-6 border-b border-slate-300 pb-5">
                    <img
                      src={
                        bookingProps.mentor?.profile_photo ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYgW4c4mScN4iMaoZM2YNPO2iV7aaxtmDVg&s"
                      }
                      alt="mentor profile"
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div>
                      <h4 className="text-[#0F172A] font-medium">
                        {bookingProps.mentorName}
                      </h4>
                      <h4 className="text-[#0F172A] text-sm opacity-80">
                        {bookingProps.specialty}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#111827]">
                        Price per Session
                      </span>
                      <span className="text-sm text-[#111827]">
                        ${bookingProps.price}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-[#111827]">Duration</span>
                      <span className="text-sm text-[#111827]">
                        {bookingProps.duration} minutes
                      </span>
                    </div>

                    <div className="flex justify-between items-center my-4">
                      <span className="text-sm text-[#111827]">
                        Number of Sessions
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleDecrease}
                        >
                          -
                        </Button>
                        <span className="text-sm text-[#111827]">
                          {sessions}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleIncrease}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Selected Slot Info */}
                    {(selectedDate || selectedTime) && (
                      <>
                        <hr />
                        <div className="space-y-2">
                          {selectedDate && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Date</span>
                              <span className="text-sm text-[#111827]">
                                {selectedDate.displayDate}
                              </span>
                            </div>
                          )}
                          {selectedTime && (
                            <div className="flex justify-between text-sm">
                              <span className="text-sm text-[#111827]">
                                Time
                              </span>
                              <span className="text-sm text-[#111827]">
                                {selectedTime.time}
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <hr />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    disabled={!selectedDate || !selectedTime || isBooking}
                  >
                    {!selectedDate || !selectedTime
                      ? "Select Date & Time"
                      : isBooking
                      ? "Processing..."
                      : "Go To Checkout"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By clicking "Go to checkout", you agree to our Terms of
                    Service and Cancellation Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
