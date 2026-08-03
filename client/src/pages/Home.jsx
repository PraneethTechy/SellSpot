import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/CategoryCard/Categories";
import LatestProducts from "../components/ProductCard/LatestProducts";

import { getProducts } from "../services/productService";
import Footer from "../components/Footer";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []); 

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await getProducts();

    if (error) {
      console.error(error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <Hero />

      <Categories />

      <LatestProducts
        products={products}
        loading={loading}
      />

      <Footer />
    </>
  );
}