import { supabase } from "./supabase";

export async function createProfile(profile) {
  return await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();
}

export async function getProfileById(id) {
  return await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
}

export async function updateProfile(id, updates) {
  return await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
}

// Upload or Replace Profile Image
export async function uploadProfileImage(userId, file) {
  const fileExt = file.name.split(".").pop();

  // Always use the same filename for the user
  const filePath = `${userId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    return {
      data: null,
      error: uploadError,
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return {
    data: publicUrl,
    error: null,
  };
}