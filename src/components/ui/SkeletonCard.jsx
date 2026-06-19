export default function SkeletonCard() {
  return (
    <div className="bg-white shadow-card overflow-hidden">
      <div className="skeleton aspect-square w-full" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-3 w-1/4 rounded mt-2" />
      </div>
    </div>
  );
}
