import api from "./apiClient";

export async function uploadImages(files) {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const { data } = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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