import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function ProductCard({ product }) {
  const image =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://placehold.co/600x400?text=No+Image";

  return (
    <Link to={`/product/${product._id}`}>
      <div
        className="
          group
          bg-white
          rounded-3xl
          overflow-hidden
          border
          border-gray-200
          shadow-sm
          hover:shadow-xl
          transition-all
          duration-300
          hover:-translate-y-2
        "
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={product.title}
            className="
              w-full
              h-60
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* Details */}
        <div className="p-5">
          {/* Price */}
          <h2 className="text-3xl font-bold text-amber-500">
            ₹ {Number(product.price).toLocaleString("en-IN")}
          </h2>

          {/* Title */}
          <h3 className="mt-3 text-xl font-semibold text-slate-900 line-clamp-1">
            {product.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-slate-500 text-sm line-clamp-1">
            {product.description}
          </p>

          {/* Location + Date */}
          <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="truncate">
                {product.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={15} />
              <span>
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            className="
              mt-6
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-slate-900
              hover:bg-slate-800
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            View Details
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />
          </button>
        </div>
      </div>
    </Link>
  );
}