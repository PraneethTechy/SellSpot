import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

import ProductCard from "../../components/ProductCard/ProductCard";
import { getProductsByCategory } from "../../services/productService";

import Pagination from "../../components/Pagination/Pagination";

import ProductGridSkeleton from "../../components/Skeleton/ProductGridSkeleton";



export default function CategoryProducts() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

useEffect(() => {
  loadProducts(currentPage);
}, [category, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  async function loadProducts(page) {
    setLoading(true);

    const {
  data,
  pagination,
  error,
} = await getProductsByCategory(
  category,
  page,
  12
);

setProducts(data || []);
setCurrentPage(pagination?.currentPage || 1);
setTotalPages(pagination?.totalPages || 1);
setTotalProducts(pagination?.totalProducts || 0);


    setLoading(false);
  }

  if (loading) {
    return (
     <ProductGridSkeleton count={8} />
    
    );
  }

  return (
    <section className="min-h-screen bg-stone-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-500 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}

        <div className="mt-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
            <Package className="text-amber-500" size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">{category}</h1>

            <p className="mt-2 text-slate-500">
              {totalProducts} Product
              {totalProducts !== 1 && "s"} Available
            </p>
          </div>
        </div>

        {/* Empty */}

        {products.length === 0 ? (
          <div className="mt-20 bg-white rounded-3xl shadow-sm border border-stone-200 p-20 text-center">
            <Package size={70} className="mx-auto text-amber-500" />

            <h2 className="mt-8 text-3xl font-bold text-slate-900">
              No Products Found
            </h2>

            <p className="mt-4 text-slate-500">
              There are currently no products in this category.
            </p>

            <Link
              to="/"
              className="inline-block mt-8 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
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
