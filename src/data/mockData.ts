/* eslint-disable @typescript-eslint/no-explicit-any */
export const mockTickets: any = [
  {
    id: "TKT-001",
    title: "Unable to access flashcard deck",
    issueType: "Technical",
    description: "I created a custom flashcard deck yesterday but now I cannot find it in my library.",
    status: "Resolved",
    statusColor: "bg-green-100 text-green-800 border border-green-300",
    priority: "High",
    priorityColor: "bg-red-100 text-red-800",
    createdAt: "10/15/2025",
    messages: [
      {
        sender: "user",
        text: "I created a custom flashcard deck yesterday but cannot find it in my library.",
        timestamp: "10:32 AM",
      },
      {
        sender: "admin",
        text: "Thank you for reaching out. We understand this is frustrating. Could you please provide the deck name and the date it was created?",
        timestamp: "10:45 AM",
      },
      {
        sender: "user",
        text: 'The deck is called "Medical Terminology" and I created it on October 14th.',
        timestamp: "11:10 AM",
      },
      {
        sender: "admin",
        text: "Thanks for the details. We are investigating this issue. We will get back to you within 24 hours.",
        timestamp: "11:12 AM",
      },
    ],
  },
  {
    id: "TKT-002",
    title: "Question Report: ORE0001",
    issueType: "Content",
    description: "This question does not contain the correct answer.",
    status: "In Progress",
    statusColor: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    priority: "Medium",
    priorityColor: "bg-yellow-100 text-yellow-800",
    createdAt: "10/12/2025",
    messages: [
      {
        sender: "user",
        text: "This question (ORE0001) is incorrect. The answer provided does not match the question.",
        timestamp: "02:15 PM",
      },
      {
        sender: "admin",
        text: "Thank you for reporting this. Our team is reviewing the question now.",
        timestamp: "02:30 PM",
      },
    ],
  },
  {
    id: "TKT-003",
    title: "Unable to access flashcard deck",
    issueType: "Technical",
    description: "I created a custom flashcard deck yesterday but now I cannot find it.",
    status: "Resolved",
    statusColor: "bg-green-100 text-green-800 border border-green-300",
    priority: "Medium",
    priorityColor: "bg-yellow-100 text-yellow-800",
    createdAt: "10/10/2025",
    messages: [
      {
        sender: "user",
        text: "Unable to access my flashcard deck.",
        timestamp: "09:15 AM",
      },
      {
        sender: "admin",
        text: "We have resolved the issue. Please try accessing your deck again.",
        timestamp: "09:45 AM",
      },
    ],
  },
  {
    id: "TKT-004",
    title: "Unable to access flashcard deck",
    issueType: "Technical",
    description: "Access issue with custom deck.",
    status: "In Progress",
    statusColor: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    priority: "Low",
    priorityColor: "bg-green-100 text-green-800",
    createdAt: "10/08/2025",
    messages: [
      {
        sender: "user",
        text: "Unable to open my flashcard deck.",
        timestamp: "08:00 AM",
      },
    ],
  },
]
