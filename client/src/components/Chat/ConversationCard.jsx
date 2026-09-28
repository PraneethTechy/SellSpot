import { useAuth } from "../../context/AuthContext";

export default function ConversationCard({ chat, selected, onClick }) {
  const { user } = useAuth();

  const isSeller = chat.seller?._id === user._id;

  const otherUser = isSeller ? chat.buyer : chat.seller;

  const name = otherUser?.name;

  const avatar = otherUser?.profileImage;

  const initials = (name || "U")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        text-left
        rounded-2xl
        p-4
        border
        transition-all
        duration-300
        min-h-22

        ${
          selected
            ? "bg-amber-50 border-amber-400 shadow-md"
            : "bg-white border-stone-200 hover:border-amber-300 hover:shadow-sm"
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}

        <div className="shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="
                w-12
                h-12
                md:w-14
                md:h-14
                rounded-full
                object-cover
                border-2
                border-amber-100
              "
            />
          ) : (
            <div
              className="
                w-12
                h-12
                md:w-14
                md:h-14
                rounded-full
                bg-amber-100
                text-amber-700
                font-bold
                flex
                items-center
                justify-center
                text-sm
                md:text-base
              "
            >
              {initials}
            </div>
          )}
        </div>

        {/* Content */}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-neutral-900 truncate text-base">
              {name}
            </h3>

            {chat.time && (
              <span className="text-xs text-stone-400 whitespace-nowrap">
                {chat.time}
              </span>
            )}
          </div>

          <div className="mt-2">
            <span
              className="
                inline-block
                bg-stone-100
                text-stone-600
                text-xs
                px-3
                py-1
                rounded-full
                truncate
                max-w-full
              "
            >
              {chat.product?.title}{" "}
            </span>
          </div>

          {chat.lastMessage && (
            <p className="mt-2 text-sm text-stone-500 truncate">
              {chat.lastMessage}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
