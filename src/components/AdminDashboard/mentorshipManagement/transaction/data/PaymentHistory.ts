export interface PaymentProps {
  id: number;
  sessionDetails: {
    name: string;
    date: string;
    time: string;
    specialty: string;
  };
  mentor: {
    name: string;
    email: string;
  };
  paidOn: {
    date: string;
    time: string;
  };

  amountPaid: number;
  paymentMethod: string | "PayPal" | "Bank Transfer";
  status: string | "paid" | "unpaid";
}

export const paymentData: PaymentProps[] = [
  {
    id: 1,
    sessionDetails: {
      name: "Cardiology Consultation",
      date: "2025-09-01",
      time: "10:00 AM",
      specialty: "Cardiology",
    },
    mentor: {
      name: "Dr. Robert Smith",
      email: "robert.smith@example.com",
    },
    paidOn: {
      date: "2025-09-05",
      time: "02:00 PM",
    },
    amountPaid: 150,
    paymentMethod: "Bank Transfer",
    status: "paid",
  },
  {
    id: 2,
    sessionDetails: {
      name: "Neurology Assessment",
      date: "2025-09-02",
      time: "11:30 AM",
      specialty: "Neurology",
    },
    mentor: {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
    },
    paidOn: {
      date: "2025-09-06",
      time: "01:00 PM",
    },
    amountPaid: 200,
    paymentMethod: "PayPal",
    status: "paid",
  },
  {
    id: 3,
    sessionDetails: {
      name: "Orthopedics Checkup",
      date: "2025-09-03",
      time: "09:00 AM",
      specialty: "Orthopedics",
    },
    mentor: {
      name: "Dr. Michael Lee",
      email: "michael.lee@example.com",
    },
    paidOn: {
      date: "2025-09-07",
      time: "11:00 AM",
    },
    amountPaid: 180,
    paymentMethod: "Bank Transfer",
    status: "unpaid",
  },
  {
    id: 4,
    sessionDetails: {
      name: "Pediatrics Follow-up",
      date: "2025-09-04",
      time: "02:00 PM",
      specialty: "Pediatrics",
    },
    mentor: {
      name: "Dr. Emily Davis",
      email: "emily.davis@example.com",
    },
    paidOn: {
      date: "2025-09-08",
      time: "03:00 PM",
    },
    amountPaid: 170,
    paymentMethod: "PayPal",
    status: "paid",
  },
  {
    id: 5,
    sessionDetails: {
      name: "Dermatology Consultation",
      date: "2025-09-05",
      time: "01:00 PM",
      specialty: "Dermatology",
    },
    mentor: {
      name: "Dr. Karen Martinez",
      email: "karen.martinez@example.com",
    },
    paidOn: {
      date: "2025-09-09",
      time: "04:00 PM",
    },
    amountPaid: 160,
    paymentMethod: "Bank Transfer",
    status: "paid",
  },
  {
    id: 6,
    sessionDetails: {
      name: "Gastroenterology Session",
      date: "2025-09-06",
      time: "03:00 PM",
      specialty: "Gastroenterology",
    },
    mentor: {
      name: "Dr. David Brown",
      email: "david.brown@example.com",
    },
    paidOn: {
      date: "2025-09-10",
      time: "12:00 PM",
    },
    amountPaid: 190,
    paymentMethod: "PayPal",
    status: "unpaid",
  },
  {
    id: 7,
    sessionDetails: {
      name: "Psychiatry Consultation",
      date: "2025-09-07",
      time: "10:30 AM",
      specialty: "Psychiatry",
    },
    mentor: {
      name: "Dr. Laura Wilson",
      email: "laura.wilson@example.com",
    },
    paidOn: {
      date: "2025-09-11",
      time: "02:30 PM",
    },
    amountPaid: 210,
    paymentMethod: "Bank Transfer",
    status: "paid",
  },
  {
    id: 8,
    sessionDetails: {
      name: "Endocrinology Follow-up",
      date: "2025-09-08",
      time: "12:00 PM",
      specialty: "Endocrinology",
    },
    mentor: {
      name: "Dr. James Taylor",
      email: "james.taylor@example.com",
    },
    paidOn: {
      date: "2025-09-12",
      time: "01:30 PM",
    },
    amountPaid: 175,
    paymentMethod: "PayPal",
    status: "paid",
  },
  {
    id: 9,
    sessionDetails: {
      name: "Rheumatology Session",
      date: "2025-09-09",
      time: "11:00 AM",
      specialty: "Rheumatology",
    },
    mentor: {
      name: "Dr. Olivia Martinez",
      email: "olivia.martinez@example.com",
    },
    paidOn: {
      date: "2025-09-13",
      time: "03:00 PM",
    },
    amountPaid: 165,
    paymentMethod: "Bank Transfer",
    status: "unpaid",
  },
  {
    id: 10,
    sessionDetails: {
      name: "Oncology Consultation",
      date: "2025-09-10",
      time: "09:30 AM",
      specialty: "Oncology",
    },
    mentor: {
      name: "Dr. Richard Clark",
      email: "richard.clark@example.com",
    },
    paidOn: {
      date: "2025-09-14",
      time: "04:30 PM",
    },
    amountPaid: 220,
    paymentMethod: "PayPal",
    status: "paid",
  },
];
