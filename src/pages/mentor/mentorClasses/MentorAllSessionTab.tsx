import MentorSessionCard from "../MentorSessionCard";

export default function MentorAllSessionTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(null)
        .map((_, i) => (
          <MentorSessionCard key={i} session={null} />
        ))}
    </div>
  );
}
