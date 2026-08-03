import { supabase } from "./supabase";

export async function getProducts() {
  return await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function getProductById(id) {
  return await supabase.from("products").select("*").eq("id", id).single();
}

export async function addProduct(product) {
  return await supabase.from("products").insert(product);
}

export async function getMyProducts(userId) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function deleteProduct(productId) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  return { error };
}

export async function updateProduct(productId, updatedData) {
  console.log("Updating:", productId);

  const { data, error } = await supabase
    .from("products")
    .update(updatedData)
    .eq("id", productId)
    .select();

  console.log("Returned Data:", data);
  console.log("Returned Error:", error);

  return { data, error };
}

export async function getProductForEdit(productId) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId);

  console.log("Data:", data);
  console.log("Error:", error);

  return {
    data: data?.[0],
    error,
  };
}

export async function searchProducts(item, location) {
  let query = supabase.from("products").select("*");

  if (item) {
    query = query.ilike("title", `%${item}%`);
  }

  if (location) {
    query = query.ilike("location", `%${location}%`);
  }

  const { data, error } = await query;

  return { data, error };
}

export async function getProductsByCategory(category) {
  return await supabase
    .from("products")
    .select("*")
    .ilike("category", category)
    .order("created_at", {
      ascending: false,
    });
}
