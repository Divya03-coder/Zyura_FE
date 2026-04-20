import { Skeleton } from "../ui/skeleton";

const CommonSkeletonLoader = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-64 w-full bg-gray-200" />
      <div className="flex gap-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-32 bg-gray-200" />
        ))}
      </div>
      <Skeleton className="h-96 w-full bg-gray-200" />
    </div>
  );
};

export default CommonSkeletonLoader;
