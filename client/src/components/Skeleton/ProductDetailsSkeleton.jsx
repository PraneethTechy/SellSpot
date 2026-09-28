export default function ProductDetailsSkeleton() {
  return (
    <section className="bg-stone-100 min-h-screen py-10 animate-pulse">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Images */}
          <div>

            <div className="w-full h-130 rounded-3xl bg-stone-200" />

            <div className="flex gap-4 mt-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-24 h-24 rounded-xl bg-stone-200"
                />
              ))}
            </div>

          </div>

          {/* Details */}
          <div>

            <div className="h-10 w-3/4 rounded bg-stone-200" />

            <div className="mt-5 h-8 w-40 rounded bg-stone-200" />

            <div className="mt-6 h-5 w-56 rounded bg-stone-200" />

            <div className="mt-10 space-y-3">
              <div className="h-4 w-full rounded bg-stone-200" />
              <div className="h-4 w-full rounded bg-stone-200" />
              <div className="h-4 w-4/5 rounded bg-stone-200" />
            </div>

            {/* Seller Card */}
            <div className="mt-10 border border-stone-200 rounded-2xl bg-white p-5">

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-stone-200" />

                <div className="flex-1">

                  <div className="h-5 w-40 rounded bg-stone-200" />

                  <div className="mt-3 h-4 w-28 rounded bg-stone-200" />

                </div>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-10">

              <div className="flex-1 h-12 rounded-xl bg-stone-200" />

              <div className="flex-1 h-12 rounded-xl bg-stone-200" />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}