const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const getDateRange = (
  range: "all" | "30days" | "7days" | "90days" | "1year"
) => {
  const today = new Date();
  let start: Date | null = null;

  switch (range) {
    case "30days":
      start = new Date(today);
      start.setDate(today.getDate() - 30);
      break;
    case "7days":
      start = new Date(today);
      start.setDate(today.getDate() - 7);
      break;
    case "90days":
      start = new Date(today);
      start.setDate(today.getDate() - 90);
      break;
    case "1year":
      start = new Date(today);
      start.setFullYear(today.getFullYear() - 1);
      break;
    case "all":
    default:
      return { startDay: undefined, endDay: undefined };
  }

  return {
    startDay: formatDate(start),
    endDay: formatDate(today),
  };
};

export const stringToDate = (dateInput: string | Date): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getHourFromISO = (iso: string, local = false): number => {
  const date = new Date(iso);
  return local ? date.getHours() : date.getUTCHours();
};

export function timeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months =
    now.getMonth() -
    date.getMonth() +
    12 * (now.getFullYear() - date.getFullYear());
  const years = now.getFullYear() - date.getFullYear();

  if (seconds < 3600) {
    return "Just now";
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}
