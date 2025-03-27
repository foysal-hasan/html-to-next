export default function CustomButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2  
      bg-gray-600 text-[16px]  
text-white  rounded-lg font-thin hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      {text}
    </button>
  );
}
