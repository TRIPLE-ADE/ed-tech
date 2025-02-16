interface SkeletonLoaderProps {
  lines?: number;
}

export function SkeletonLoader({ lines = 5 }: SkeletonLoaderProps) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-200 rounded" />
      ))}
    </div>
  );
}
