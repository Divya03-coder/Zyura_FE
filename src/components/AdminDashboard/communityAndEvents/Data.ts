export interface AllEventData {
  id: number;
  event: {
    eventName: string;
    doctorName: string;
  };
  type: string | "Seminar" | "Workshop";
  registration: number;
  price: string;
  date: string;
}

export const allEvents: AllEventData[] = [
  {
    id: 1,
    event: {
      eventName: "Advanced Cardiology Seminar",
      doctorName: "Dr. John Smith",
    },
    type: "Seminar",
    registration: 120,
    price: "$50",
    date: "2025-02-15",
  },
  {
    id: 2,
    event: {
      eventName: "Pediatric Emergency Workshop",
      doctorName: "Dr. Sarah Johnson",
    },
    type: "Workshop",
    registration: 80,
    price: "$40",
    date: "2025-02-20",
  },
  {
    id: 3,
    event: { eventName: "Neurology Conference", doctorName: "Dr. Emily Davis" },
    type: "Seminar",
    registration: 150,
    price: "$60",
    date: "2025-03-05",
  },
  {
    id: 4,
    event: {
      eventName: "Orthopedic Surgery Workshop",
      doctorName: "Dr. Michael Lee",
    },
    type: "Workshop",
    registration: 60,
    price: "$45",
    date: "2025-03-12",
  },
  {
    id: 5,
    event: {
      eventName: "Dermatology Updates Seminar",
      doctorName: "Dr. Olivia Brown",
    },
    type: "Seminar",
    registration: 95,
    price: "$55",
    date: "2025-03-25",
  },
  {
    id: 6,
    event: {
      eventName: "ENT Surgical Workshop",
      doctorName: "Dr. Daniel Wilson",
    },
    type: "Workshop",
    registration: 70,
    price: "$50",
    date: "2025-04-02",
  },
  {
    id: 7,
    event: {
      eventName: "Gastroenterology Seminar",
      doctorName: "Dr. Sophia Martinez",
    },
    type: "Seminar",
    registration: 110,
    price: "$65",
    date: "2025-04-10",
  },
  {
    id: 8,
    event: {
      eventName: "Radiology Imaging Workshop",
      doctorName: "Dr. James Anderson",
    },
    type: "Workshop",
    registration: 55,
    price: "$35",
    date: "2025-04-18",
  },
  {
    id: 9,
    event: {
      eventName: "Psychiatry Awareness Seminar",
      doctorName: "Dr. Ava Thompson",
    },
    type: "Seminar",
    registration: 130,
    price: "$45",
    date: "2025-05-01",
  },
  {
    id: 10,
    event: {
      eventName: "Critical Care Workshop",
      doctorName: "Dr. William Garcia",
    },
    type: "Workshop",
    registration: 90,
    price: "$70",
    date: "2025-05-08",
  },
];
