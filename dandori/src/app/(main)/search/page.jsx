"use client";
import styles from "./search.module.css";
import ProductCard from "@/components/ProductCard";
import PaginationControls from "@/components/PaginationControls";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "@/app/services/product";
import Loading from "../loading";
export default function Search({ searchParams }) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [limit] = useState(searchParams.per_page || 10); // Fixed limit per page
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: parseInt(searchParams.page || 1),
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products based on search, page, and limit
  const fetchProducts = async (searchQuery, page, limit) => {
    try {
      setError("");
      setLoading(true);
      const response = await searchProducts(searchQuery, page, limit);
      setProducts(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);

    // Update pagination state
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    const query = searchParams.query || "";
    const page = parseInt(searchParams.page || 1);
    setSearch(searchParams.query || "");

    // Fetch products whenever search or page changes
    fetchProducts(query, page, limit);
  }, [searchParams.query, searchParams.page]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className={styles.mainContainer}>
        <h3>No se han encontrado resultados al buscar "{search}"</h3>
        <div className={styles.notFound}>
          <img
            src="https://cdn-icons-gif.flaticon.com/17569/17569494.gif"
            alt="Search"
            title="Search"
            width="100"
            height="125"
            style={{ filter: "grayscale(90%)" }}
          />
          <h5 style={{ textAlign: "center" }}>
            Haz click para{" "}
            <Link
              href="/"
              style={{
                textDecoration: "underline",
                textAlign: "center",
                color: "red",
                paddingBlock: "2em",
                fontFamily: "var(--font-poppins)",
              }}
            >
              continuar viendo
            </Link>
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
    <h3>Resultados de buscar "{search}"</h3>
    <div className={styles.foundProducts}>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
    <div style={{ marginTop: "20px" }}>
      <PaginationControls
        // search={search}
        page={pagination.page}
        totalPages={pagination.pages}
        onPageChange={handlePageChange}
      />
    </div>
  </div>
  );
}
