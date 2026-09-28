import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import socket from "../services/socket";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    const currentUser = await getCurrentUser();

    if (currentUser) {
      setUser(currentUser);
      setProfile(currentUser);

      if (!socket.connected) {
        socket.auth = {
          token,
        };

        socket.connect();
      }
    } else {
      localStorage.removeItem("token");

      setUser(null);
      setProfile(null);

      socket.disconnect();
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCurrentUser();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        setUser,
        setProfile,
        loadCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}