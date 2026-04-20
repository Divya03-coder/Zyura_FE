import MentorPayoutCard from "./MentorPayoutCard";
const mentorPayouts = [
  {
    name: "Dr. Robert Smith",
    initials: "RS",
    specialty: "Cardiology",
    memberSince: "2023-08-15",
    totalEarnings: 1800,
    sessions: 24,
    pendingAmount: 150,
    lastPayoutDate: "25/09/2025",
    payoutMethod: "Bank Transfer",
  },
  {
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    specialty: "Neurology",
    memberSince: "2022-05-10",
    totalEarnings: 2400,
    sessions: 30,
    pendingAmount: 200,
    lastPayoutDate: "20/09/2025",
    payoutMethod: "PayPal",
  },
  {
    name: "Dr. Michael Lee",
    initials: "ML",
    specialty: "Orthopedics",
    memberSince: "2021-11-25",
    totalEarnings: 1500,
    sessions: 18,
    pendingAmount: 100,
    lastPayoutDate: "22/09/2025",
    payoutMethod: "Bank Transfer",
  },
  {
    name: "Dr. Emily Davis",
    initials: "ED",
    specialty: "Pediatrics",
    memberSince: "2023-01-05",
    totalEarnings: 2100,
    sessions: 26,
    pendingAmount: 180,
    lastPayoutDate: "24/09/2025",
    payoutMethod: "Check",
  },
];

const MentorEaring = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10 ">
      {mentorPayouts.map((mentor, index) => (
        <MentorPayoutCard key={index} {...mentor} />
      ))}
    </div>
  );
};

export default MentorEaring;
