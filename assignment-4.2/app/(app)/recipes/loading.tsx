export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Loading recipes...</h1>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-24 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}