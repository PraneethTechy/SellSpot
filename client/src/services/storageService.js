import { supabase } from "./supabase";

export async function uploadProductImage(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (error) {
    return { url: null, error };
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return {
    url: data.publicUrl,
    error: null,
  };
}