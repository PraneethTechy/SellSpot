import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Tag,
  ShieldCheck,
  Phone,
  MessageCircle,
  CalendarDays,
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  getProductById,
  getProducts,
} from "../services/productService";

import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductDetailsSkeleton from "../components/Skeleton/ProductDetailsSkeleton";
import LatestProducts from "../components/ProductCard/LatestProducts";

import { useAuth } from "../context/AuthContext";

import { showError } from "../utils/toast";

import {
  getConversation,
  createConversation,
} from "../services/chatService";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  // Product
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Latest products
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    setLoading(true);

    const { data, error } = await getProductById(id);

    if (error) {
      console.error(error);
      setProduct(null);
    } else {
      setProduct(data);
    }

    setLoading(false);
  }

  // Load latest products
  useEffect(() => {
    loadLatestProducts();
  }, []);

  async function loadLatestProducts() {
    setProductsLoading(true);

    const { data, error } = await getProducts(1, 8);

    if (error) {
      console.error(error);
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setProductsLoading(false);
  }

  async function handleChat() {
    if (!user) {
      navigate("/login");
      return;
    }

    // Prevent chatting with yourself
    if (user._id === product.seller?._id) {
      showError("You cannot chat with yourself.");
      return;
    }

    let { data } = await getConversation(product._id);

    if (!data) {
      const response = await createConversation(product._id);

      data = response.data;
    }

    navigate("/dashboard/messages", {
      state: {
        conversationId: data._id,
      },
    });
  }

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center px-6">
        <div className="bg-white border border-stone-200 rounded-3xl p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900">
            Product Not Found
          </h2>

          <p className="mt-2 text-stone-500">
            The product you're looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              bg-amber-500
              hover:bg-amber-600
              text-white
              px-5
              py-2.5
              rounded-xl
              font-semibold
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProduct =
    user?._id === product.seller?._id;

  return (
    <div className="min-h-screen bg-stone-100">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8">

        {/* Back Button */}

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-stone-600
            hover:text-amber-600
            transition
          "
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Main Product Section */}

        <div className="grid lg:grid-cols-5 gap-7 mt-6">

          {/* Product Gallery */}

          <div className="lg:col-span-3">

            <div className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-sm">

              <ProductGallery
                images={product.images}
              />

            </div>

          </div>

          {/* Product Information */}

          <div className="lg:col-span-2">

            <div className="bg-white border border-stone-200 rounded-3xl shadow-sm p-6 sm:p-7">

              {/* Category */}

              <div className="flex items-center gap-2 mb-5">

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    bg-amber-50
                    text-amber-700
                    border
                    border-amber-100
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                  "
                >
                  <Tag size={14} />
                  {product.category}
                </span>

              </div>

              {/* Title */}

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  text-neutral-900
                  leading-tight
                "
              >
                {product.title}
              </h1>

              {/* Price */}

              <div className="mt-6">

                <p className="text-sm text-stone-500">
                  Price
                </p>

                <p
                  className="
                    mt-1
                    text-3xl
                    sm:text-4xl
                    font-bold
                    text-emerald-600
                  "
                >
                  ₹ {Number(product.price).toLocaleString("en-IN")}
                </p>

              </div>

              {/* Location */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mt-6
                  pt-5
                  border-t
                  border-stone-200
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-stone-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <MapPin
                    size={19}
                    className="text-amber-600"
                  />
                </div>

                <div>

                  <p className="text-xs text-stone-400">
                    Location
                  </p>

                  <p className="text-sm font-semibold text-neutral-800">
                    {product.location}
                  </p>

                </div>

              </div>

              {/* Listed Date */}

              {product.createdAt && (
                <div className="flex items-center gap-3 mt-4">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-stone-100
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <CalendarDays
                      size={19}
                      className="text-amber-600"
                    />
                  </div>

                  <div>

                    <p className="text-xs text-stone-400">
                      Listed On
                    </p>

                    <p className="text-sm font-semibold text-neutral-800">
                      {new Date(
                        product.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                  </div>

                </div>
              )}

              {/* Chat Button */}

              {!isOwnProduct && (
                <button
                  onClick={handleChat}
                  className="
                    w-full
                    mt-7
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-amber-500
                    hover:bg-amber-600
                    text-white
                    py-3.5
                    rounded-xl
                    font-semibold
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                  "
                >
                  <MessageCircle size={19} />
                  Chat with Seller
                </button>
              )}

              {/* Own Product */}

              {isOwnProduct && (
                <div
                  className="
                    mt-7
                    bg-stone-100
                    border
                    border-stone-200
                    rounded-xl
                    p-4
                    text-center
                  "
                >
                  <p className="text-sm font-medium text-stone-600">
                    This is your product
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Description */}

        <div className="grid lg:grid-cols-3 gap-7 mt-7">

          {/* Description */}

          <div className="lg:col-span-2">

            <div className="bg-white border border-stone-200 rounded-3xl shadow-sm p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-amber-100
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Tag
                    size={19}
                    className="text-amber-600"
                  />
                </div>

                <h2 className="text-xl font-bold text-neutral-900">
                  Product Description
                </h2>

              </div>

              <p
                className="
                  text-stone-600
                  leading-8
                  whitespace-pre-line
                "
              >
                {product.description ||
                  "No description available for this product."}
              </p>

            </div>

          </div>

          {/* Safety Card */}

          <div>

            <div className="bg-white border border-stone-200 rounded-3xl shadow-sm p-6">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-emerald-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ShieldCheck
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <h2 className="font-bold text-neutral-900">
                  Stay Safe
                </h2>

              </div>

              <div className="mt-5 space-y-3">

                <p className="text-sm text-stone-600">
                  • Verify the product before making payment.
                </p>

                <p className="text-sm text-stone-600">
                  • Meet sellers in a safe public place.
                </p>

                <p className="text-sm text-stone-600">
                  • Avoid sharing sensitive information.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Seller */}

        <div className="mt-7">

          <div className="bg-white border border-stone-200 rounded-3xl shadow-sm p-6 sm:p-8">

            <div className="flex flex-col md:flex-row md:items-center gap-6">

              {/* Seller Image */}

              <img
                src={
                  product.seller?.profileImage ||
                  "https://placehold.co/150x150?text=User"
                }
                alt="Seller"
                className="
                  w-20
                  h-20
                  rounded-2xl
                  object-cover
                  border
                  border-stone-200
                  shrink-0
                "
              />

              {/* Seller Details */}

              <div className="flex-1">

                <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                  Seller
                </p>

                <h2 className="text-2xl font-bold text-neutral-900 mt-1">
                  {product.seller?.name ||
                    "Seller"}
                </h2>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 mt-3">

                  <p className="flex items-center gap-2 text-sm text-stone-500">
                    <MapPin size={16} />
                    {product.seller?.city ||
                      "Location not available"}
                  </p>

                  {product.seller?.phoneNumber && (
                    <p className="flex items-center gap-2 text-sm text-stone-500">
                      <Phone size={16} />
                      {product.seller.phoneNumber}
                    </p>
                  )}

                </div>

              </div>

              {/* Seller Action */}

              {!isOwnProduct && (
                <button
                  onClick={handleChat}
                  className="
                    w-full
                    md:w-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    bg-amber-500
                    hover:bg-amber-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                    shadow-sm
                  "
                >
                  <MessageCircle size={18} />
                  Contact Seller
                </button>
              )}

            </div>

          </div>

        </div>

        {/* Latest Products */}

        <section className="mt-16">

          <LatestProducts
            products={products}
            loading={productsLoading}
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
            title="Recommended Products"

          />

        </section>

      </div>

    </div>
  );
}