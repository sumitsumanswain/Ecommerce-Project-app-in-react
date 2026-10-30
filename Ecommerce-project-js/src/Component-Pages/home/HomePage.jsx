import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    let isActive = true;

    async function getHomeData() {
      try {
        const urlPath = search
          ? `/api/products?search=${encodeURIComponent(search)}`
          : "/api/products";

        const response = await axios.get(urlPath);

        if (isActive) {
          setProducts(response.data);
        }
      } catch (error) {
        if (isActive) {
          console.error("Failed to load products:", error);
          setProducts([]);
        }
      }
    }

    getHomeData();

    return () => {
      isActive = false;
    };
  }, [search]);

  return (
    <>
      <Header cart={cart} />

      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
