import api from "./apiClient";

// Get conversation for a product
export async function getConversation(productId) {
  try {
    const { data } = await api.get(`/conversations/${productId}`);

    return {
      data: data.conversation,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}

// Create new conversation
export async function createConversation(productId) {
  try {
    const { data } = await api.post("/conversations", {
      productId,
    });

    return {
      data: data.conversation,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}

// Get all conversations
export async function getConversations() {
  try {
    const { data } = await api.get("/conversations");

    return {
      data: data.conversations,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: error.response?.data || error,
    };
  }
}

// Get messages
export async function getMessages(conversationId) {
  try {
    const { data } = await api.get(
      `/messages/${conversationId}`
    );

    return {
      data: data.messages,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: error.response?.data || error,
    };
  }
}

// Send message
export async function sendMessage(
  conversationId,
  message
) {
  try {
    const { data } = await api.post("/messages", {
      conversationId,
      message,
    });

    return {
      data: data.newMessage,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}