import { useEffect, useState } from "react";
import { Pencil, Trash2, MapPin, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getMyProducts, deleteProduct } from "../../services/productService";

import MyProductsSkeleton from "../../components/Skeleton/MyProductsSkeleton";

import ConfirmModal from "../Common/ConfirmModal";

import { showSuccess, showError } from "../../utils/toast";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await getMyProducts();

    if (error) {
      console.error(error);
      showError(error.message || "Failed to load products");
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  async function handleDelete(productId) {
    setDeleting(true);

    const { error } = await deleteProduct(productId);

    if (error) {
      showError(error.message || "Failed to delete product");
      setDeleting(false);
      return;
    }

    showSuccess("Product deleted successfully");

    await loadProducts();

    setDeleting(false);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  }

  if (loading) {
    return <MyProductsSkeleton />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">My Products</h1>

          <p className="mt-1 text-sm text-stone-500">
            Manage all your listed products in one place.
          </p>
        </div>

        <button
          onClick={() => navigate("/add-product")}
          className="
            mt-4
            md:mt-0
            flex
            items-center
            gap-2
            bg-amber-500
            hover:bg-amber-600
            text-white
            px-5
            py-2.5
            rounded-xl
            font-semibold
            text-sm
            shadow-sm
            hover:shadow-md
            transition-all
            duration-300
          "
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-12 text-center">
          <img
            src="https://placehold.co/220x160?text=📦"
            alt="No Products"
            className="mx-auto mb-6 rounded-xl"
          />

          <h2 className="text-2xl font-bold text-neutral-900">
            No Products Yet
          </h2>

          <p className="mt-2 text-sm text-stone-500 max-w-md mx-auto">
            You haven't listed any products yet. Add your first product and
            start selling today.
          </p>

          <button
            onClick={() => navigate("/add-product")}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              bg-amber-500
              hover:bg-amber-600
              text-white
              px-5
              py-2.5
              rounded-xl
              font-semibold
              text-sm
              shadow-sm
              hover:shadow-md
              transition-all
              duration-300
            "
          >
            <Plus size={18} />
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {products.map((product) => (
            <div
              key={product._id}
              className="
                bg-white
                border
                border-stone-200
                rounded-xl
                shadow-xs
                hover:shadow-md
                transition-all
                duration-300
                p-2.5
                sm:p-3
                flex
                items-center
                justify-between
                gap-4
              "
            >
              {/* Product Info */}
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={
                    product.images?.[0] ||
                    "https://placehold.co/120x120?text=No+Image"
                  }
                  alt={product.title}
                  className="
                    w-14
                    h-14
                    sm:w-16
                    sm:h-16
                    rounded-lg
                    object-cover
                    border
                    border-stone-200
                    shrink-0
                  "
                />

                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-neutral-900 truncate">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base sm:text-lg font-bold text-amber-500">
                      ₹ {Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <span className="text-stone-300">|</span>

                    <div className="flex items-center gap-1 text-xs text-stone-500 truncate">
                      <MapPin size={13} className="shrink-0" />
                      <span className="truncate">{product.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                  className="
                    p-2
                    sm:px-3
                    sm:py-2
                    rounded-lg
                    border
                    border-stone-200
                    bg-stone-50
                    text-amber-600
                    hover:bg-amber-50
                    hover:border-amber-300
                    transition-all
                    duration-300
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    font-medium
                  "
                >
                  <Pencil size={16} />
                  <span className="hidden sm:inline">Edit</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                  className="
    p-2
    sm:px-3
    sm:py-2
    rounded-lg
    border
    border-stone-200
    bg-stone-50
    text-stone-600
    hover:bg-red-50
    hover:text-red-600
    hover:border-red-200
    transition-all
    duration-300
    flex
    items-center
    gap-1.5
    text-xs
    font-medium
  "
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
  isOpen={showDeleteModal}
  title="Delete Product"
  message="Are you sure you want to delete this product? This action cannot be undone."
  confirmText={deleting ? "Deleting..." : "Delete"}
  cancelText="Cancel"
  loading={deleting}
  onCancel={() => {
    if (deleting) return;

    setShowDeleteModal(false);
    setSelectedProduct(null);
  }}
  onConfirm={() => {
    if (selectedProduct) {
      handleDelete(selectedProduct._id);
    }
  }}
/>
    </div>
  );
}
