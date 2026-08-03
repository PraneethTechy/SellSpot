import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { sendMessage } from "../../services/chatService";
import socket from "../../services/socket";

export default function MessageInput({
  conversationId,
  onNewMessage,
  refreshConversations,
}) {
  const { user } = useAuth();

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim()) return;

    const messageText = message.trim();

    const { data, error } = await sendMessage(
      conversationId,
      user.id,
      messageText
    );

    if (error) {
      console.error(error);
      return;
    }

    onNewMessage(data);

    socket.emit("send_message", data);

    setMessage("");

    refreshConversations?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        border-t
        border-stone-200
        p-3
        md:p-4
        flex
        items-end
        gap-3
      "
    >
      <input
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

      <button
        type="submit"
        disabled={!message.trim()}
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
          Send
        </span>
      </button>
    </form>
  );
}