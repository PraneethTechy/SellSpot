export default function MyProductsSkeleton() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-9 w-52 bg-stone-200 rounded animate-pulse" />
          <div className="mt-2 h-4 w-72 bg-stone-200 rounded animate-pulse" />
        </div>

        <div className="h-11 w-36 bg-stone-200 rounded-xl animate-pulse" />
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-stone-200 rounded-xl p-3 flex items-center justify-between animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-stone-200" />

              <div>
                <div className="h-5 w-44 bg-stone-200 rounded" />

                <div className="mt-3 flex gap-3">
                  <div className="h-4 w-20 bg-stone-200 rounded" />
                  <div className="h-4 w-28 bg-stone-200 rounded" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-24 h-10 rounded-lg bg-stone-200" />
              <div className="w-24 h-10 rounded-lg bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}