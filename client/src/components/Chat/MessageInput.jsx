import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import { sendMessage } from "../../services/chatService";

export default function MessageInput({
  conversationId,
  onNewMessage,
  refreshConversations,
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim() || loading) {
      return;
    }

    setLoading(true);

    const messageText = message.trim();

    const { data, error } = await sendMessage(
      conversationId,
      messageText
    );

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      onNewMessage(data);
    }

    setMessage("");

    refreshConversations?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 p-3 md:p-4"
    >
      {/* Message Input */}

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="
          flex-1
          rounded-2xl
          border
          border-stone-300
          bg-stone-50
          px-4
          py-3
          md:px-5
          outline-none
          transition
          focus:border-amber-500
          focus:ring-4
          focus:ring-amber-100
        "
      />

      {/* Send Button */}

      <button
        type="submit"
        disabled={!message.trim() || loading}
        className="
          bg-amber-500
          hover:bg-amber-600
          disabled:bg-stone-300
          disabled:cursor-not-allowed
          text-white
          rounded-2xl
          transition
          flex
          items-center
          justify-center
          h-12
          w-12
          md:w-auto
          md:px-6
          gap-2
          font-medium
        "
      >
        <SendHorizontal size={20} />

        <span className="hidden md:inline">
          {loading ? "Sending..." : "Send"}
        </span>
      </button>
    </form>
  );
}