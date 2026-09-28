import { MessageCircle } from "lucide-react";
import ConversationCard from "./ConversationCard";

export default function ConversationList({
  conversations,
  selectedChat,
  setSelectedChat,
}) {
  return (
    <div className="h-full flex flex-col bg-stone-50">

      {/* Header */}

      <div className="sticky top-0 z-10 bg-white border-b border-stone-200 px-4 md:px-6 py-4 md:py-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-amber-100 flex items-center justify-center">

            <MessageCircle
              className="text-amber-600"
              size={20}
            />

          </div>

          <div>

            <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
              Messages
            </h2>

            <p className="text-sm text-stone-500">
              {conversations.length} Conversation
              {conversations.length !== 1 && "s"}
            </p>

          </div>

        </div>

      </div>

      {/* Conversation List */}

      <div className="flex-1 overflow-y-auto px-2 md:p-3 space-y-2">

        {conversations.length === 0 ? (

          <div className="h-full flex flex-col items-center justify-center text-center px-6">

            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-5">

              <MessageCircle
                className="text-amber-600"
                size={34}
              />

            </div>

            <h3 className="text-xl font-semibold text-neutral-900">
              No Messages Yet
            </h3>

            <p className="mt-2 text-stone-500">
              Start chatting with sellers or buyers.
            </p>

          </div>

        ) : (

          conversations.map((chat) => (

            <ConversationCard
    key={chat._id}
    chat={chat}
    selected={selectedChat?._id === chat._id}
    onClick={() => setSelectedChat(chat)}
/>

          ))

        )}

      </div>

    </div>
  );
}