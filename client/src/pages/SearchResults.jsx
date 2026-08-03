import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import ProductCard from "../components/ProductCard/ProductCard";
import { searchProducts } from "../services/productService";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const item = searchParams.get("item") || "";
  const location = searchParams.get("location") || "";

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const { data, error } = await searchProducts(item, location);

      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }

      setLoading(false);
    }

    loadProducts();
  }, [item, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-stone-600">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="bg-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}

        <div className="mb-10">

          <div className="flex items-center gap-3">

            <Search
              size={28}
              className="text-amber-500"
            />

            <h1 className="text-4xl font-bold text-slate-900">
              Search Results
            </h1>

          </div>

          <p className="mt-3 text-slate-600">
            Showing results for
            <span className="font-semibold text-slate-900">
              {" "} "{item}" {" "}
            </span>
            in
            <span className="font-semibold text-slate-900">
              {" "} "{location}"
            </span>
          </p>

          <p className="mt-2 text-stone-500">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>

        </div>

        {/* Empty State */}

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-16 text-center">

            <h2 className="text-2xl font-bold text-slate-900">
              No Products Found
            </h2>

            <p className="mt-3 text-stone-500">
              Try searching with another product or location.
            </p>

          </div>
        ) : (

          /* Products */

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

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