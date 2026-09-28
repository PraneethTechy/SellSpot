import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Pagination from "../Pagination/Pagination";
import ProductGridSkeleton from "../Skeleton/ProductGridSkeleton";

export default function LatestProducts({
  products,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  title="Latest Products",
}) {  return (
    <section
      id="latest-products"
      className="py-20 bg-stone-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-2 text-slate-500">
              Fresh products added by our sellers
            </p>

          </div>

        </div>

        {/* Products */}

        {loading ? (
          <ProductGridSkeleton count={8} />

        ) : products.length === 0 ? (

          <div className="bg-white rounded-2xl border border-gray-200 py-20 text-center shadow-sm">

            <h3 className="text-2xl font-semibold text-slate-700">
              No Products Available
            </h3>

            <p className="mt-2 text-slate-500">
              Be the first seller to list a product.
            </p>

          </div>

        ) : (

         <>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {products.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))}
  </div>

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={onPageChange}
  />
</>

        )}

      </div>
    </section>
  );
}