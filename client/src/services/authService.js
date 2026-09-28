import api from "./apiClient";

export async function signUp(userData) {
  try {
    const { data } = await api.post("/auth/register", userData);

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}

export async function signIn(email, password) {
  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}

export function signOut() {
  localStorage.removeItem("token");
}

export async function getCurrentUser() {
  try {
    const { data } = await api.get("/profile/me");

    return data.user;
  } catch (error) {
    return null;
  }
}

export async function googleLogin(credential) {
  try {
    const { data } = await api.post("/auth/google", {
      credential,
    });

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}