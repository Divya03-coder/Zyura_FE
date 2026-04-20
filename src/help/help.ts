import {
  System,
  Topic,
} from "@/store/features/adminDashboard/ContentResources/MCQ/types/TreeResponse";

export const formatDate = (isoDate: string): string => {
  if (!isoDate) return "";
  const dateObj = new Date(isoDate);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

export const slugify = (text?: string) => {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const originalTitle = (slug: string): string => {
  if (!slug) return "";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const loadingList = new Array(4).fill(null);

export const toSlug = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-").trim();
export const formatLabel = (str: string): string => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function toBerhanTime(isoString: string) {
  const date = new Date(isoString);

  // Convert to EAT (UTC +3)
  const eatDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  let hours = eatDate.getHours();
  const minutes = eatDate.getMinutes().toString().padStart(2, "0");
  const seconds = eatDate.getSeconds().toString().padStart(2, "0");

  // Convert EAT → Ethiopian (Berhan) hours
  let ethHour = hours - 6;
  if (ethHour <= 0) ethHour += 12;

  // Final format like: 13/11/2025, 8:35:10
  const day = eatDate.getDate().toString().padStart(2, "0");
  const month = (eatDate.getMonth() + 1).toString().padStart(2, "0");
  const year = eatDate.getFullYear();

  return `${day}/${month}/${year}, ${ethHour}:${minutes}:${seconds}`;
}

export const mapCorrectOption = (option: string): "A" | "B" | "C" | "D" => {
  switch (option) {
    case "A":
    case "B":
    case "C":
    case "D":
      return option;
    default:
      return "A";
  }
};

export const mapDifficulty = (
  difficulty: string,
): "Basics" | "Intermediate" | "Advance" => {
  switch (difficulty) {
    case "Basics":
    case "Intermediate":
    case "Advance":
      return difficulty;
    default:
      return "Basics";
  }
};

export const createOptions = (items: string[]) =>
  items.map((item) => ({
    label: item,
    value: item,
  }));

export const sortByTitleAZ = <T extends { title: string }>(arr: T[]) =>
  [...arr].sort((a, b) => a.title.localeCompare(b.title));

// Count leaf nodes (subtopics or topics without subtopics)
export const countLeafNodes = (node: any): number => {
  // For Subject
  if (node.systems) {
    return node.systems.reduce(
      (acc: number, sys: System) => acc + countLeafNodes(sys),
      0,
    );
  }
  // For System
  if (node.topics) {
    return node.topics.reduce(
      (acc: number, topic: Topic) => acc + countLeafNodes(topic),
      0,
    );
  }
  // For Topic
  if (node.subTopics) {
    return node.subTopics.length > 0 ? node.subTopics.length : 1;
  }
  // For SubTopic or leaf node
  return 1;
};

export const urlFixer = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
