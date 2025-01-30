export default function loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
        <span className="text-white">Loading...</span>
      </div>
    </div>
  );
}
