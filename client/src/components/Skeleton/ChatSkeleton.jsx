export default function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white animate-pulse">

      {/* Header */}
      <div className="border-b border-stone-200 px-6 py-4 flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-stone-200" />

        <div>
          <div className="h-5 w-44 rounded bg-stone-200" />
          <div className="mt-2 h-4 w-28 rounded bg-stone-200" />
        </div>

      </div>

      {/* Messages */}
      <div className="flex-1 bg-stone-50 p-6 space-y-5">

        <div className="flex justify-start">
          <div className="w-56 h-14 rounded-2xl bg-stone-200" />
        </div>

        <div className="flex justify-end">
          <div className="w-44 h-14 rounded-2xl bg-stone-200" />
        </div>

        <div className="flex justify-start">
          <div className="w-64 h-14 rounded-2xl bg-stone-200" />
        </div>

        <div className="flex justify-end">
          <div className="w-36 h-14 rounded-2xl bg-stone-200" />
        </div>

      </div>

      {/* Input */}
      <div className="border-t border-stone-200 p-4 flex gap-3">

        <div className="flex-1 h-12 rounded-2xl bg-stone-200" />

        <div className="w-24 h-12 rounded-2xl bg-stone-200" />

      </div>

    </div>
  );
}