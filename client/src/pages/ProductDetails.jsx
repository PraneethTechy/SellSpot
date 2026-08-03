import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";

import { getProductById } from "../services/productService";
import { getProfileById } from "../services/profileService";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ChatPanel from "../components/Chat/ChatPanel";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  getConversation,
  createConversation,
} from "../services/chatService";

export default function ProductDetails() {
  
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = useNavigate();

const { user } = useAuth();

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    setLoading(true);

    try {
      const { data, error } = await getProductById(id);

      if (error) {
        throw error;
      }

      setProduct(data);

      if (data?.user_id) {
        const { data: sellerData, error: sellerError } =
          await getProfileById(data.user_id);
        console.log("Product User ID:", data.user_id);
console.log("Seller Data:", sellerData);
console.log("Seller Error:", sellerError);

        if (sellerError) {
          console.error(sellerError);
        } else {
          setSeller(sellerData);
        }
      }
    } catch (error) {
      console.error(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl text-red-500">
        Product Not Found
      </div>
    );
  }

async function handleChat() {
  if (!user) {
    alert("Please login first.");
    return;
  }

  // Prevent chatting with yourself
  if (user.id === product.user_id) {
    alert("You cannot chat with yourself.");
    return;
  }

  // Check if conversation exists
  let { data } = await getConversation(
    product.id,
    user.id
  );

  // Create conversation if needed
  if (!data) {
    const response = await createConversation(
      product.id,
      user.id,
      product.user_id
    );

    data = response.data;
  }

  navigate("/dashboard/messages", {
    state: {
      conversationId: data.id,
    },
  });
}

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Left Section */}

        <div className="lg:col-span-2">

          {/* Product Gallery */}

          <ProductGallery images={product?.image_urls || []} />

          {/* Product Info */}

          <h1 className="text-4xl font-bold mt-8">
            {product.title}
          </h1>

          <p className="text-3xl font-bold text-emerald-600 mt-4">
            ₹ {Number(product.price).toLocaleString("en-IN")}
          </p>

          <div className="flex items-center gap-2 mt-5 text-gray-600">
            <MapPin size={18} />
            <span>{product.location}</span>
          </div>

          <div className="mt-4">
            <span className="bg-gray-100 px-4 py-2 rounded-lg">
              {product.category}
            </span>
          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-3">
              Description
            </h2>

            <p className="leading-8 text-gray-600">
              {product.description}
            </p>

          </div>

        </div>

        {/* Seller Card */}

        <div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

            <div className="flex flex-col items-center">

              <img
                src={
                  seller?.avatar_url ||
                  "https://placehold.co/150x150?text=User"
                }
                alt="Seller"
                className="w-24 h-24 rounded-full object-cover border"
              />

              <h2 className="text-2xl font-bold mt-4">
                {seller?.full_name || "Unknown Seller"}
              </h2>

              <p className="text-gray-500 mt-2">
                📍 {seller?.city || "Location not available"}
              </p>

              <p className="text-gray-500 mt-2">
                📞 {seller?.phone || "Phone not available"}
              </p>

             <button
  onClick={handleChat}
  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl mt-5"
>
  Chat with Seller
</button>

            </div>

          </div>

        </div>

      </div>

      <ChatPanel
    isOpen={isChatOpen}
    onClose={() => setIsChatOpen(false)}
    seller={seller}
/>

    </div>
  );
}