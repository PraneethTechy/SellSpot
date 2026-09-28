import { useEffect, useState } from "react";
import {
  addProduct,
  getProductForEdit,
  updateProduct,
} from "../services/productService";
import { uploadImages } from "../services/uploadService";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";

import {
  showSuccess,
  showError,
} from "../utils/toast";



export default function AddProduct() {
  // const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const navigate = useNavigate();
  const { id: productId } = useParams();
  const isEditing = Boolean(productId);

  console.log("Loading Product...");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    setImages((prev) => [...prev, ...Array.from(e.target.files)]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.location ||
      (images.length === 0 && imageUrls.length === 0)
    ) {
      showError("Please fill all fields and select at least one image.");
      return;
    }

    setLoading(true);

    try {
     const uploadedImageUrls = [...imageUrls];

if (images.length > 0) {
  const { data, error } = await uploadImages(images);

  if (error) {
    throw new Error(error.message);
  }

  uploadedImageUrls.push(...data.images);
}

      const product = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        location: formData.location,
images: uploadedImageUrls,
      };

      let error;

      if (isEditing) {
        console.log("Product ID:", productId);
        console.log("Product:", product);
        ({ error } = await updateProduct(productId, product));
      } else {
       ({
  error,
} = await addProduct(product));
      }

      if (error) {
        throw error;
      }

      showSuccess(
        isEditing
          ? "Product Updated Successfully!"
          : "Product Added Successfully!"
      );

      navigate("/dashboard/products");

      if (!isEditing) {
        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          location: "",
        });

        setImages([]);
        setImageUrls([]);
      }

      setImages([]);
      setImageUrls([]);
    } catch (error) {
      console.error(error);
      showError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  async function loadProduct() {
    console.log("Loading Product...");

    const { data, error } = await getProductForEdit(productId);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      showError(error.message);
      return;
    }

    setFormData({
      title: data.title || "",
      description: data.description || "",
      price: data.price || "",
      category: data.category || "",
      location: data.location || "",
    });

setImageUrls(data.images || []);

}

  function removeExistingImage(index) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function removeNewImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1.5 font-semibold text-sm text-neutral-800">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Product Title"
              className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-sm text-neutral-800">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product"
              className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none transition"
            />
          </div>

          {/* Price & Category */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-semibold text-sm text-neutral-800">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter Price"
                className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-sm text-neutral-800">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white"
              >
                <option value="">Select Category</option>
                <option>Mobiles</option>
                <option>Electronics</option>
                <option>Vehicles</option>
                <option>Furniture</option>
                <option>Fashion</option>
                <option>Property</option>
                <option>Books</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1.5 font-semibold text-sm text-neutral-800">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter City"
              className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>

          {/* Images Picker */}
          <div>
            <label className="block mb-1.5 font-semibold text-sm text-neutral-800">
              Product Images
            </label>

            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-stone-300 hover:border-amber-500 bg-stone-50 hover:bg-amber-50/50 rounded-xl p-4 cursor-pointer text-stone-600 hover:text-amber-600 transition group">
              <Plus size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">
                {images.length > 0 || imageUrls.length > 0
                  ? "Add More Images (+)"
                  : "Choose Product Images"}
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview */}
          {(imageUrls.length > 0 || images.length > 0) && (
            <div className="space-y-4 pt-2">
              {/* Existing Images */}
              {imageUrls.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-stone-700 mb-2">
                    Existing Images
                  </h3>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                        <img
                          src={url}
                          alt="Existing"
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-1.5 right-1.5 bg-neutral-900/70 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newly Selected Images */}
              {images.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-stone-700 mb-2">
                    New Images
                  </h3>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1.5 right-1.5 bg-neutral-900/70 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition text-sm disabled:bg-stone-300 shadow-xs mt-2"
          >
            {loading
              ? isEditing
                ? "Updating Product..."
                : "Posting Product..."
              : isEditing
              ? "Update Product"
              : "Post Product"}
          </button>
        </form>
      </div>
    </div>
  );
}