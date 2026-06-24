import { useEffect, useState } from "react";
import api from "./services/api";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [search, setSearch] = useState("");
  
  const fetchProducts = async ( reset = false) => {
    const params = {};

    if (selectedCategory) {
      params.category =
        selectedCategory;
    }

    if (!reset && nextCursor) {
      params.cursorUpdatedAt =
        nextCursor.updatedAt;

      params.cursorId =
        nextCursor.id;
    }

    const { data } =
      await api.get("/products", {
        params,
      });

    setProducts((prev) =>
      reset
        ? data.products
        : [...prev, ...data.products]
    );

    setNextCursor(data.nextCursor);
  };

  useEffect(() => {
    fetchProducts(true);
  }, [selectedCategory, search]);

  useEffect(() => {
    api
      .get("/products/stats")
      .then((res) =>
        setTotalProducts(
          res.data.totalProducts
        )
      );

    api
      .get("/products/categories")
      .then((res) =>
        setCategories(res.data)
      );
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Header
        totalProducts={totalProducts}
        categories={categories}
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          setSelectedCategory
        }
        search={search}
        setSearch={setSearch}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {nextCursor && (
        <div className="mt-8 text-center">
          <button
            onClick={() =>
              fetchProducts()
            }
            className="rounded bg-black px-6 py-2 text-white"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;