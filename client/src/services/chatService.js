import { supabase } from "./supabase";

export async function getConversation(productId, buyerId) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("product_id", productId)
    .eq("buyer_id", buyerId)
    .single();

  if (error && error.code !== "PGRST116") {
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createConversation(
  productId,
  buyerId,
  sellerId
) {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      product_id: productId,
      buyer_id: buyerId,
      seller_id: sellerId,
    })
    .select()
    .single();

  return { data, error };
}

export async function getConversations(userId) {
  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      products(title),      
      seller:profiles!conversations_seller_fk(
        full_name,
        avatar_url
      ),
      buyer:profiles!conversations_buyer_fk(
        full_name,
        avatar_url
      )
    `)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order("created_at", {
      ascending: false,
    });

  console.log(data);
  console.log(error);

  return {
    data,
    error,
  };
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at");

  return { data, error };
}

export async function sendMessage(
  conversation_id,
  sender_id,
  message
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id,
      sender_id,
      message,
    })
    .select()
    .single();

  return { data, error };
}