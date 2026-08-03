import { supabase } from "./supabase";

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  return { data, error };
}

export async function signInWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}