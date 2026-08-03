import {
  X,
  UserRound,
  Package2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function ChatHeader({
  chat,
  closeChat,
}) {
  const { user } = useAuth();

  const isSeller = chat.seller_id === user.id;

  const otherUser = isSeller
    ? chat.buyer?.full_name
    : chat.seller?.full_name;

  const otherAvatar = isSeller
    ? chat.buyer?.avatar_url
    : chat.seller?.avatar_url;

  const initials = (otherUser || "U")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        bg-white
        border-b
        border-stone-200
        px-4
        md:px-6
        py-3
        md:py-4
        flex
        items-center
        justify-between
      "
    >
      {/* Left */}

      <div className="flex items-center gap-3 flex-1 min-w-0">

        {/* Avatar */}

        {otherAvatar ? (

          <img
            src={otherAvatar}
            alt={otherUser}
            className="
              w-11
              h-11
              md:w-12
              md:h-12
              rounded-full
              object-cover
              border-2
              border-amber-100
              shrink-0
            "
          />

        ) : (

          <div
            className="
              w-11
              h-11
              md:w-12
              md:h-12
              rounded-full
              bg-amber-100
              text-amber-700
              font-bold
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            {initials}
          </div>

        )}

        {/* Details */}

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <Package2
              size={16}
              className="text-amber-600 shrink-0"
            />

            <h2
              className="
                font-semibold
                text-base
                md:text-lg
                text-neutral-900
                truncate
              "
            >
              {chat.products?.title}
            </h2>

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              mt-1
              text-sm
              text-stone-500
            "
          >
            <UserRound
              size={14}
              className="shrink-0"
            />

            <span className="truncate">
              {otherUser}
            </span>

          </div>

        </div>

      </div>

      {/* Close */}

      <button
        onClick={closeChat}
        className="
          ml-3
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          text-stone-500
          hover:bg-stone-100
          hover:text-neutral-900
          transition
          shrink-0
        "
      >
        <X size={20} />
      </button>

    </div>
  );
}