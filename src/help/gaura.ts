import { PostStudyModeTree } from "@/store/features/adminDashboard/ContentResources/MCQ/types/tree";

// Helper to update the tree based on depth & action
export const getUpdatedTree = (
  tree: PostStudyModeTree,
  depth: number,
  parentNames: { subject?: string; system?: string; topic?: string },
  itemTitle: string,
  action: "add" | "rename" | "delete",
  newTitle?: string
): PostStudyModeTree => {
  const newTree = structuredClone(tree); // deep copy

  // Depth 0 → Subject level
  if (depth === 0) {
    // Only rename/delete applies at subject level in your design?
    if (action === "rename") newTree.subjectName = newTitle || itemTitle;
    if (action === "delete") newTree.systems = []; // deleting all systems? optional
    if (action === "add") {
      // Add new system
      newTree.systems.push({ name: newTitle || "", topics: [] });
    }
  }

  // Depth 1 → System level
  if (depth === 1) {
    const system = newTree.systems.find((s) => s.name === itemTitle);
    if (!system) return newTree;

    if (action === "rename") system.name = newTitle || itemTitle;
    if (action === "delete")
      newTree.systems = newTree.systems.filter((s) => s.name !== itemTitle);
    if (action === "add") system.topics.push({ topicName: newTitle || "" });
  }

  // Depth 2 → Topic level
  if (depth === 2) {
    const system = newTree.systems.find((s) => s.name === parentNames.system);
    if (!system) return newTree;

    const topic = system.topics.find((t) => t.topicName === itemTitle);
    if (!topic) return newTree;

    if (action === "rename") topic.topicName = newTitle || itemTitle;
    if (action === "delete")
      system.topics = system.topics.filter((t) => t.topicName !== itemTitle);
    if (action === "add") topic.subTopics?.push(newTitle || "");
    if (action === "add" && !topic.subTopics)
      topic.subTopics = [newTitle || ""];
  }

  // Depth 3 → SubTopic level
  if (depth === 3) {
    const system = newTree.systems.find((s) => s.name === parentNames.system);
    if (!system) return newTree;
    const topic = system.topics.find((t) => t.topicName === parentNames.topic);
    if (!topic || !topic.subTopics) return newTree;

    if (action === "rename") {
      topic.subTopics = topic.subTopics.map((sub) =>
        sub === itemTitle ? newTitle || itemTitle : sub
      );
    }
    if (action === "delete") {
      topic.subTopics = topic.subTopics.filter((sub) => sub !== itemTitle);
    }
  }

  return newTree;
};
