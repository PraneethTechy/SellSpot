import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getConversations } from "../../services/chatService";

import ConversationList from "../Chat/ConversationList";
import ChatPanel from "../Chat/ChatPanel";
import EmptyChat from "../Chat/EmptyChat";

export default function Messages() {

  const { user } = useAuth();

  const location = useLocation();

  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (!user) return;

    loadConversations();
  }, [user]);

  async function loadConversations() {
    
    const { data, error } = await getConversations(user.id);

    if (error) {
      console.log(error);
      return;
    }

    setConversations(data);

    if (location.state?.conversationId) {
      const chat = data.find(
        (item) => item.id === location.state.conversationId
      );

      if (chat) {
        setSelectedChat(chat);
      }
    }
  }

  return (
    <div
      className="
        bg-white
        border
        border-stone-200
        rounded-2xl
        shadow-sm
        overflow-hidden
        h-[calc(100vh-40px)]
      "
    >
      {/* Desktop */}

      <div className="hidden md:flex h-full">

        <div
          className="
            w-96
            border-r
            border-stone-200
            bg-stone-50
          "
        >
          <ConversationList
            conversations={conversations}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </div>

        <div className="flex-1 overflow-hidden">

          {selectedChat ? (
            <ChatPanel
              chat={selectedChat}
              closeChat={() => setSelectedChat(null)}
            />
          ) : (
            <EmptyChat />
          )}

        </div>

      </div>

      {/* Mobile */}

      <div className="md:hidden h-full">

        {!selectedChat ? (

          <ConversationList
            conversations={conversations}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />

        ) : (

          <div className="flex flex-col h-full">

            <div className="border-b border-stone-200 p-4">

              <button
                onClick={() => setSelectedChat(null)}
                className="
                  flex
                  items-center
                  gap-2
                  text-amber-600
                  font-medium
                "
              >
                <ArrowLeft size={20} />
                Back
              </button>

            </div>

            <div className="flex-1 overflow-hidden">

              <ChatPanel
                chat={selectedChat}
                closeChat={() => setSelectedChat(null)}
              />

            </div>

          </div>

        )}

      </div>

    </div>
  );
}