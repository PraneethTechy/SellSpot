import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar"
import Hero from "../components/Hero/Hero";
import Categories from "../components/CategoryCard/Categories";
import LatestProducts from "../components/ProductCard/LatestProducts";
import Footer from "../components/Footer";

import { getProducts } from "../services/productService";
import AnnouncementBar from "../components/AnnouncementBar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  async function loadProducts(page) {
    setLoading(true);

    const {
      data,
      pagination,
      error,
    } = await getProducts(page, 12);

    if (error) {
      console.error(error);
    } else {
      setProducts(data || []);
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
    }

    setLoading(false);
  }

  return (
    <>
    <Navbar />

      <Hero />

      <AnnouncementBar />

      <Categories />

      <LatestProducts
        products={products}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Footer />
    </>
  );
}