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

  // ================================
  // LOAD EXISTING MESSAGES
  // ================================

  useEffect(() => {
    if (!chat) return;

    async function loadMessages() {
      const { data, error } = await getMessages(chat._id);

      if (error) {
        console.error(error);
        return;
      }

      setMessages(data || []);
    }

    loadMessages();
  }, [chat]);

  // ================================
  // JOIN CONVERSATION
  // ================================

  useEffect(() => {
    if (!chat) return;

    socket.emit(
      "join_conversation",
      chat._id
    );

    return () => {
      socket.emit(
        "leave_conversation",
        chat._id
      );
    };
  }, [chat]);

  // ================================
  // RECEIVE NEW MESSAGES
  // ================================

  useEffect(() => {
    if (!chat) return;

    function handleReceiveMessage(newMessage) {
      const conversationId =
        typeof newMessage.conversation === "object"
          ? newMessage.conversation?._id
          : newMessage.conversation;

      // Ignore messages from other conversations
      if (conversationId !== chat._id) {
        return;
      }

      setMessages((prev) => {
        // Prevent duplicate messages
        const exists = prev.some(
          (msg) => msg._id === newMessage._id
        );

        if (exists) {
          return prev;
        }

        return [...prev, newMessage];
      });

      // Refresh conversation list
      refreshConversations?.();
    }

    socket.on(
      "receive_message",
      handleReceiveMessage
    );

    return () => {
      socket.off(
        "receive_message",
        handleReceiveMessage
      );
    };
  }, [chat, refreshConversations]);

  // ================================
  // NO CHAT SELECTED
  // ================================

  if (!chat) {
    return null;
  }

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ================================
          HEADER
      ================================= */}

      <div className="shrink-0 border-b border-stone-200 bg-white">
        <ChatHeader
          chat={chat}
          closeChat={closeChat}
        />
      </div>

      {/* ================================
          MESSAGES
      ================================= */}

      <div className="flex-1 min-h-0 bg-stone-50">
        <MessageList
          messages={messages}
        />
      </div>

      {/* ================================
          MESSAGE INPUT
      ================================= */}

      <div className="shrink-0 border-t border-stone-200 bg-white">
        <MessageInput
          conversationId={chat._id}
          onNewMessage={(message) => {
            setMessages((prev) => {
              // Prevent duplicate message
              const exists = prev.some(
                (msg) => msg._id === message._id
              );

              if (exists) {
                return prev;
              }

              return [...prev, message];
            });
          }}
          refreshConversations={
            refreshConversations
          }
        />
      </div>

    </div>
  );
}