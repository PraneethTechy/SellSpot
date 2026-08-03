import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function LatestProducts({ products, loading }) {
  return (
    <section
      id="latest-products"
      className="py-20 bg-stone-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl font-bold text-slate-900">
              Latest Products
            </h2>

            <p className="mt-2 text-slate-500">
              Fresh products added by our sellers
            </p>

          </div>

    

        </div>

        {/* Products */}

        {loading ? (
          <div className="flex justify-center items-center py-24">

            <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />

          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>
    </section>
  );
}