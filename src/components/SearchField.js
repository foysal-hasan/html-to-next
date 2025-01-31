"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

const SearchField = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");

  // Monitor URL changes
  useEffect(() => {
    if (isLoading) {
      const currentQuery = searchParams.get("domain");
      // If current URL query matches the last searched query, stop loading
      if (currentQuery === lastSearchedQuery) {
        setIsLoading(false);
      }
    }
  }, [searchParams, lastSearchedQuery, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let searchQuery = formData.get("search")?.toString().trim();

    if (searchQuery) {
      setIsLoading(true);
      // Store the query we're searching for
      setLastSearchedQuery(searchQuery);

      // Push to new route
      router.push(`/hackerreport?domain=${encodeURIComponent(searchQuery)}`);

      // Clear input
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        name="search"
        placeholder="Enter Domain"
        className="flex-1 px-4 py-2 bg-[#2c3035] text-white rounded-md 
                   focus:outline-none "
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`px-6 py-2 rounded-md transition-colors flex items-center justify-center
                   ${
                     isLoading
                       ? "bg-gray-400 cursor-not-allowed"
                       : "bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-teal-500"
                   } 
                   text-white min-w-[120px]`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Searching...
          </>
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
};

const SearchFieldWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchField />
  </Suspense>
);

export default SearchFieldWrapper;
