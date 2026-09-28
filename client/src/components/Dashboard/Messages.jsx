import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getConversations } from "../../services/chatService";

import ConversationList from "../Chat/ConversationList";
import ChatPanel from "../Chat/ChatPanel";
import EmptyChat from "../Chat/EmptyChat";
import ConversationSkeleton from "../Skeleton/ConversationSkeleton";

export default function Messages() {

  const { user } = useAuth();

  const location = useLocation();

  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!user) return;

  //   loadConversations();
    
  // }, [user]);

  useEffect(() => {
  if (!user) return;

  loadConversations();
}, [user, location.key]);

async function loadConversations() {
  setLoading(true);

  const { data, error } = await getConversations();

  if (error) {
    console.log(error);
    setLoading(false);
    return;
  }

  // console.log("Conversations:", data);

  setConversations(data);

  if (location.state?.conversationId) {
    const chat = data.find(
      (item) => item._id === location.state.conversationId
    );

    if (chat) {
      setSelectedChat(chat);
    }
  }

  setLoading(false);
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
          {loading ? (
  <ConversationSkeleton />
) : (
  <ConversationList
    conversations={conversations}
    selectedChat={selectedChat}
    setSelectedChat={setSelectedChat}
  />
)}
        </div>

        <div className="flex-1 overflow-hidden">

          {selectedChat ? (
         

            <ChatPanel
  chat={selectedChat}
  closeChat={() => setSelectedChat(null)}
  refreshConversations={loadConversations}
/>
          ) : (
            <EmptyChat />
          )}

        </div>

      </div>

      {/* Mobile */}

      <div className="md:hidden h-full">

        {!selectedChat ? (

           loading ? (
    <ConversationSkeleton />
  ) : (
    <ConversationList
      conversations={conversations}
      selectedChat={selectedChat}
      setSelectedChat={setSelectedChat}
    />
  )

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
  refreshConversations={loadConversations}
/>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}