export default function ConversationSkeleton() {
  return (
    <div className="h-full flex flex-col bg-stone-50 animate-pulse">

      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-stone-200" />

          <div>
            <div className="h-6 w-36 rounded bg-stone-200" />
            <div className="mt-2 h-4 w-24 rounded bg-stone-200" />
          </div>

        </div>

      </div>

      {/* Conversation Cards */}
      <div className="flex-1 p-3 space-y-3">

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-stone-200" />

            <div className="flex-1">

              <div className="h-5 w-36 rounded bg-stone-200" />

              <div className="mt-3 h-4 w-24 rounded bg-stone-200" />

              <div className="mt-3 h-4 w-full rounded bg-stone-200" />

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}