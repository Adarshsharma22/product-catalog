

export default function ProductCard({ product, }) {

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">
        {product.name}
      </h3>

      <p className="text-sm text-gray-500">
        {product.category}
      </p>

      <p className="mt-2 font-medium">
        ₹{product.price}
      </p>

      <p className="mt-2 text-xs text-gray-400">
        Updated:
        {" "}
        {new Date(
          product.updatedAt
        ).toLocaleDateString()}
      </p>
    </div>
  );
}