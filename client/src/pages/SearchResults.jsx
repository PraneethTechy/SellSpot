import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import ProductCard from "../components/ProductCard/ProductCard";
import { searchProducts } from "../services/productService";
import ProductGridSkeleton from "../components/Skeleton/ProductGridSkeleton";

import Pagination from "../components/Pagination/Pagination";



export default function SearchResults() {
  const [searchParams] = useSearchParams();



  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [totalProducts, setTotalProducts] = useState(0);

  const item = searchParams.get("item") || "";
  const location = searchParams.get("location") || "";

  useEffect(() => {
  loadProducts(currentPage);
}, [item, location, currentPage]);

useEffect(() => {
  setCurrentPage(1);
}, [item, location]);


async function loadProducts(page) {
  setLoading(true);

  const {
  data,
  pagination,
  error,
} = await searchProducts(
  item,
  location,
  page,
  12
);
  if (error) {
    console.error(error);
  } else {
    setProducts(data || []);
    setCurrentPage(pagination?.currentPage || 1);
    setTotalPages(pagination?.totalPages || 1);
    setTotalProducts(pagination?.totalProducts || 0);
  }

  setLoading(false);
}


  if (loading) {
    return (
    <ProductGridSkeleton count={8} />
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
              {" "}
              "{item}"{" "}
            </span>
            in
            <span className="font-semibold text-slate-900">
              {" "}
              "{location}"
            </span>
          </p>

          <p className="mt-2 text-stone-500">
         

            {totalProducts} product
{totalProducts !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Empty State */}

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              No Products Found
            </h2>

            <p className="mt-3 text-stone-500">
              Try searching with another product or
              location.
            </p>
          </div>
        ) : (
          <>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    onPageChange={setCurrentPage}
  />
</>
        )}
      </div>
    </section>
  );
}