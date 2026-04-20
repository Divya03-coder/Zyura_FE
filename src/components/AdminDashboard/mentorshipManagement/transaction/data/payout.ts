export interface PayoutProps {
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
  students: string;
  sessionFee: {
    amount: number;
    sessionStatus: string | "Pending" | "Completed";
  };
  platformFee: {
    amount: number;
    commission: number;
  };
  netAmount: number;
  status: string | "Pending" | "Completed" | "Processing";
}

export const payoutData: PayoutProps[] = [
  {
    id: 1,
    sessionDetails: {
      name: "Cardiology Basics",
      date: "2025-09-15",
      time: "60min",
      specialty: "Cardiology",
    },
    mentor: {
      name: "Dr. Alice Bennett",
      email: "alice.bennett@example.com",
    },
    students: "John, Sarah",
    sessionFee: {
      amount: 200,
      sessionStatus: "Completed",
    },
    platformFee: {
      amount: 30,
      commission: 15,
    },
    netAmount: 170,
    status: "Completed",
  },
  {
    id: 2,
    sessionDetails: {
      name: "Neuro Exam Review",
      date: "2025-09-16",
      time: "60min",
      specialty: "Neurology",
    },
    mentor: {
      name: "Dr. Brian Carter",
      email: "brian.carter@example.com",
    },
    students: "James, Lily",
    sessionFee: {
      amount: 250,
      sessionStatus: "Completed",
    },
    platformFee: {
      amount: 40,
      commission: 16,
    },
    netAmount: 210,
    status: "Processing",
  },
  {
    id: 3,
    sessionDetails: {
      name: "Dermatology Essentials",
      date: "2025-09-17",
      time: "60min",
      specialty: "Dermatology",
    },
    mentor: {
      name: "Dr. Claire Gomez",
      email: "claire.gomez@example.com",
    },
    students: "Emma",
    sessionFee: {
      amount: 150,
      sessionStatus: "Completed",
    },
    platformFee: {
      amount: 25,
      commission: 16.7,
    },
    netAmount: 125,
    status: "Completed",
  },
  {
    id: 4,
    sessionDetails: {
      name: "Orthopedics Review",
      date: "2025-09-18",
      time: "60min",
      specialty: "Orthopedics",
    },
    mentor: {
      name: "Dr. Dan Foster",
      email: "dan.foster@example.com",
    },
    students: "Oliver, Ava",
    sessionFee: {
      amount: 300,
      sessionStatus: "Pending",
    },
    platformFee: {
      amount: 50,
      commission: 16.7,
    },
    netAmount: 250,
    status: "Pending",
  },
  {
    id: 5,
    sessionDetails: {
      name: "Advanced ECG Interpretation",
      date: "2025-09-19",
      time: "30min",
      specialty: "Cardiology",
    },
    mentor: {
      name: "Dr. Rachel Adams",
      email: "rachel.adams@example.com",
    },
    students: "Mason, Mia",
    sessionFee: {
      amount: 220,
      sessionStatus: "Completed",
    },
    platformFee: {
      amount: 35,
      commission: 15.9,
    },
    netAmount: 185,
    status: "Completed",
  },
  {
    id: 6,
    sessionDetails: {
      name: "Basic Anatomy Q&A",
      date: "2025-09-20",
      time: "45min",
      specialty: "Anatomy",
    },
    mentor: {
      name: "Dr. Ethan Brown",
      email: "ethan.brown@example.com",
    },
    students: "Sophia",
    sessionFee: {
      amount: 180,
      sessionStatus: "Completed",
    },
    platformFee: {
      amount: 30,
      commission: 16.7,
    },
    netAmount: 150,
    status: "Processing",
  },
  {
    id: 7,
    sessionDetails: {
      name: "Clinical Reasoning Case Study",
      date: "2025-09-21",
      time: "50min",
      specialty: "General Medicine",
    },
    mentor: {
      name: "Dr. Fiona Gray",
      email: "fiona.gray@example.com",
    },
    students: "Liam, Zoe",
    sessionFee: {
      amount: 270,
      sessionStatus: "Completed",
    },
    platformFee: {
      amount: 45,
      commission: 16.7,
    },
    netAmount: 225,
    status: "Completed",
  },
  {
    id: 8,
    sessionDetails: {
      name: "OB-GYN Prep Session",
      date: "2025-09-22",
      time: "50min",
      specialty: "Gynecology",
    },
    mentor: {
      name: "Dr. Grace Lee",
      email: "grace.lee@example.com",
    },
    students: "Noah, Chloe",
    sessionFee: {
      amount: 200,
      sessionStatus: "Completed",
    },
    platformFee: {
      amount: 32,
      commission: 16,
    },
    netAmount: 168,
    status: "Processing",
  },
  {
    id: 9,
    sessionDetails: {
      name: "Pediatric Cases Overview",
      date: "2025-09-23",
      time: "60min",
      specialty: "Pediatrics",
    },
    mentor: {
      name: "Dr. Henry Liu",
      email: "henry.liu@example.com",
    },
    students: "Lucas",
    sessionFee: {
      amount: 160,
      sessionStatus: "Pending",
    },
    platformFee: {
      amount: 28,
      commission: 17.5,
    },
    netAmount: 132,
    status: "Pending",
  },
  {
    id: 10,
    sessionDetails: {
      name: "Pharmacology Deep Dive",
      date: "2025-09-24",
      time: "60min",
      specialty: "Pharmacology",
    },
    mentor: {
      name: "Dr. Olivia Khan",
      email: "olivia.khan@example.com",
    },
    students: "Ella, Jack",
    sessionFee: {
      amount: 260,
      sessionStatus: "Completed",
    },
    platformFee: {
      amount: 42,
      commission: 16.2,
    },
    netAmount: 218,
    status: "Completed",
  },
];
