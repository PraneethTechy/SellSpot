import { useAuth } from "../../context/AuthContext";

export default function MessageBubble({ message }) {
  const { user } = useAuth();

  const isMine = message.sender_id === user.id;

  return (
    <div
      className={`flex mb-4 ${
        isMine ? "justify-end" : "justify-start"
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
          transition-all

          ${
            isMine
              ? "bg-amber-500 text-white rounded-br-md"
              : "bg-white border border-stone-200 text-neutral-800 rounded-bl-md"
          }
        `}
      >
        <p className="leading-relaxed text-[15px]">
          {message.text}
        </p>

        <p
          className={`text-xs mt-2 text-right ${
            isMine
              ? "text-amber-100"
              : "text-stone-400"
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
}