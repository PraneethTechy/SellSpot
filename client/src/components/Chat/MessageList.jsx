import { useEffect, useRef } from "react";
import { MessageCircleMore } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function MessageList({ messages }) {
  const { user } = useAuth();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-5">
          <MessageCircleMore
            size={36}
            className="text-amber-600"
          />
        </div>

        <h3 className="text-xl font-semibold text-neutral-900">
          No messages yet
        </h3>

        <p className="mt-2 text-stone-500 max-w-sm">
          Start the conversation by sending your first message.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-5">
      <div className="space-y-4">

        {messages.map((message) => {
          const senderId =
            typeof message.sender === "object"
              ? message.sender?._id
              : message.sender;

          const isMine =
            senderId === user?._id;

          return (
            <div
              key={message._id}
              className={`flex ${
                isMine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[75%]
                  px-5
                  py-3
                  rounded-2xl
                  shadow-sm
                  break-words
                  ${
                    isMine
                      ? "bg-amber-500 text-white rounded-br-md"
                      : "bg-white border border-stone-200 text-neutral-800 rounded-bl-md"
                  }
                `}
              >
                <p className="text-[15px] leading-relaxed">
                  {message.message}
                </p>

                <p
                  className={`
                    text-[11px]
                    mt-2
                    text-right
                    ${
                      isMine
                        ? "text-amber-100"
                        : "text-stone-400"
                    }
                  `}
                >
                  {new Date(
                    message.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />

      </div>
    </div>
  );
}