export default function ProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-6 animate-pulse">

      {/* Page Header */}
      <div className="mb-6">
        <div className="h-8 w-44 bg-stone-200 rounded" />
        <div className="mt-3 h-4 w-80 bg-stone-200 rounded" />
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">

        {/* Hero Section */}
        <div className="px-8 py-8 border-b border-stone-100 bg-stone-50">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-6">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-stone-200" />

              <div>
                <div className="h-7 w-48 bg-stone-200 rounded" />

                <div className="mt-3 h-4 w-56 bg-stone-200 rounded" />

                <div className="mt-4 h-7 w-40 bg-stone-200 rounded-full" />
              </div>

            </div>

            {/* Button */}
            <div className="w-36 h-11 rounded-xl bg-stone-200" />

          </div>

        </div>

        {/* Info Cards */}
        <div className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border border-stone-100 rounded-xl p-4 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-200" />

                <div className="flex-1">
                  <div className="h-3 w-20 bg-stone-200 rounded" />

                  <div className="mt-3 h-5 w-36 bg-stone-200 rounded" />
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}