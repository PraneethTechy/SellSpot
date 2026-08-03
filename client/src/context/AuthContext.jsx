import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";
import socket from "../services/socket";

import {
  getProfileById,
  createProfile,
} from "../services/profileService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(currentUser) {
    const { data, error } = await getProfileById(currentUser.id);

    let currentProfile = data;

    if (error || !currentProfile) {
      const { data: newProfile, error: createError } =
        await createProfile({
          id: currentUser.id,
          full_name:
            currentUser.user_metadata?.full_name ||
            currentUser.user_metadata?.name ||
            currentUser.email.split("@")[0],
          phone: "",
          city: "",
          avatar_url:
            currentUser.user_metadata?.avatar_url || "",
        });

      if (!createError) {
        currentProfile = newProfile;
      }
    }

    setProfile(currentProfile);
  }

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser);

        if (!socket.connected) {
          socket.connect();
          socket.emit("join", currentUser.id);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await loadProfile(currentUser);

          if (!socket.connected) {
            socket.connect();
            socket.emit("join", currentUser.id);
          }
        } else {
          setProfile(null);
          socket.disconnect();
        }
      }
    );

    return () => {
      socket.disconnect();
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        setProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}