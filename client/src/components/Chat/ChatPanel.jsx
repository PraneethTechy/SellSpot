import { useEffect, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { getMessages } from "../../services/chatService";
import socket from "../../services/socket";

export default function ChatPanel({
  chat,
  closeChat,
  refreshConversations,
}) {
  
  const [messages, setMessages] = useState([]);

  

  useEffect(() => {
    if (!chat) return;

    loadMessages();
  }, [chat]);

  async function loadMessages() {
    const { data, error } = await getMessages(chat.id);

    if (error) {
      console.log(error);
      return;
    }

    setMessages(data);
  }

  useEffect(() => {
    if (!chat) return;

    socket.emit("join_conversation", chat.id);

    return () => {
      socket.off("receive_message");
    };
  }, [chat]);

  useEffect(() => {
    if (!chat) return;

    function handleReceiveMessage(newMessage) {
      if (newMessage.conversation_id !== chat.id) return;

      setMessages((prev) => {
        const exists = prev.some(
          (msg) => msg.id === newMessage.id
        );

        if (exists) return prev;

        return [...prev, newMessage];
      });

      refreshConversations?.();
    }

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [chat]);

  if (!chat) return null;

  return (
    <div
      className="
        flex
        flex-col
        h-full
        bg-white
      "
    >
      {/* Header */}

      <div className="shrink-0 border-b border-stone-200 bg-white">

        <ChatHeader
          chat={chat}
          closeChat={closeChat}
        />

      </div>

      {/* Messages */}

      <div
        className="
          flex-1
          overflow-hidden
          min-h-0
          bg-stone-50
        "
      >
        <MessageList
          messages={messages}
        />
      </div>

      {/* Input */}

      <div
        className="
          shrink-0
          border-t
          border-stone-200
          bg-white
          pb-safe
        "
      >
        <MessageInput
          conversationId={chat.id}
          onNewMessage={(message) =>
            setMessages((prev) => [
              ...prev,
              message,
            ])
          }
          refreshConversations={refreshConversations}
        />
      </div>

    </div>
  );
}