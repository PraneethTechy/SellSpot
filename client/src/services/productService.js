import api from "./apiClient";

export async function getProducts(page = 1, limit = 20) {
  try {
    
    const { data } = await api.get("/products", {
      params: {
        page,
        limit,
      },
    });

    return {
      data: data.products,
      pagination: {
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      pagination: null,
      error: error.response?.data || error,
    };
  }
}

export async function getProductById(id) {
  try {
    const { data } = await api.get(`/products/${id}`);

    return {
      data: data.product,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data || error,
    };
  }
}

export async function addProduct(product) {
  try {
    const { data } = await api.post("/products", product);

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

export async function getMyProducts() {
  try {
    const { data } = await api.get("/products/my");

    return {
      data: data.products,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: error.response?.data || error,
    };
  }
}

export async function deleteProduct(productId) {
  try {
    const { data } = await api.delete(`/products/${productId}`);

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

export async function updateProduct(productId, updatedData) {
  try {
    const { data } = await api.put(
      `/products/${productId}`,
      updatedData
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

export async function getProductForEdit(productId) {
  return await getProductById(productId);
}

export async function searchProducts(
  item = "",
  location = "",
  page = 1,
  limit = 12
) {
  try {
    const { data } = await api.get("/products", {
      params: {
        search: item,
        location,
        page,
        limit,
      },
    });

    return {
      data: data.products,
      pagination: {
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      pagination: null,
      error: error.response?.data || error,
    };
  }
}

export async function getProductsByCategory(
  category,
  page = 1,
  limit = 12
) {
  try {
    const { data } = await api.get("/products", {
      params: {
        category,
        page,
        limit,
      },
    });

    return {
      data: data.products,
      pagination: {
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      pagination: null,
      error: error.response?.data || error,
    };
  }
}