

export default function Header({
  totalProducts,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {

  return (
    <div className="mb-8 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        Product Browser
      </h1>

      <p>
        Total Products:
        {" "}
        {totalProducts.toLocaleString()}
      </p>

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(
            e.target.value
          )
        }
        className="w-64 rounded border p-2"
      >
        <option value="">
          All Categories
        </option>

        {categories.map((cat) => (
          <option
            key={cat.category}
            value={cat.category}
          >
            {cat.category}
          </option>
        ))}
      </select>
    </div>
  );
}