import api from "./apiClient";

export async function getMyProfile() {
  try {
    const { data } = await api.get("/profile/me");

    return {
      data: data.user,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}

export async function getProfileById(id) {
  try {
    const { data } = await api.get(`/profile/${id}`);

    return {
      data: data.user,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}

export async function updateProfile(profileData) {
  try {
    const { data } = await api.put(
      "/profile",
      profileData
    );

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