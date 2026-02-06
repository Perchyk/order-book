export function Skeleton() {
  return (
    <div className="bg-[#181A20] rounded-lg p-4 animate-pulse">
      {/* Header */}
      <div className="flex justify-between mb-2">
        <p className="text-sm font-semibold">Order Book</p>
        <div className="h-4 w-4 bg-neutral-700 rounded" />
      </div>

      <hr className="my-2 -mx-4 h-px border-t-0 bg-neutral-100 dark:bg-white/10" />

      {/* Mode icons and tick size menu */}
      <div className="flex gap-2 mb-4 items-center justify-between">
        <div className="flex gap-2">
          <div className="h-4 w-4 bg-neutral-700 rounded" />
          <div className="h-4 w-4 bg-neutral-700 rounded" />
          <div className="h-4 w-4 bg-neutral-700 rounded" />
        </div>
        <div className="h-6 w-12 bg-neutral-700 rounded" />
      </div>

      {/* Table header */}
      <div className="h-3 w-full bg-neutral-700 rounded mb-2" />

      {/* Table rows */}
      <div className="min-h-127.5 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-neutral-700 rounded" />
        ))}
      </div>

      {/* Buy/Sell ratio skeleton */}
      <div className="flex items-center gap-2 mt-4">
        <div className="h-3 w-12 bg-neutral-700 rounded" />
        <div className="flex-1 h-1 bg-neutral-700 rounded" />
        <div className="h-3 w-12 bg-neutral-700 rounded" />
      </div>
    </div>
  )
}
