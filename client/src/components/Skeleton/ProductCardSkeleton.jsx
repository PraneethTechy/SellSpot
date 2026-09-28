export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm animate-pulse">
      {/* Image */}
      <div className="w-full h-60 bg-stone-200" />

      <div className="p-5">
        {/* Category */}
        <div className="w-20 h-5 rounded-full bg-stone-200" />

        {/* Title */}
        <div className="mt-4 h-6 w-4/5 rounded bg-stone-200" />

        {/* Price */}
        <div className="mt-4 h-8 w-28 rounded bg-stone-200" />

        {/* Location */}
        <div className="mt-5 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-stone-200" />
          <div className="h-4 w-32 rounded bg-stone-200" />
        </div>

        {/* Seller */}
        <div className="mt-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-200" />
          <div className="flex-1">
            <div className="h-4 w-28 rounded bg-stone-200" />
            <div className="mt-2 h-3 w-20 rounded bg-stone-200" />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 h-11 rounded-xl bg-stone-200" />
      </div>
    </div>
  );
}