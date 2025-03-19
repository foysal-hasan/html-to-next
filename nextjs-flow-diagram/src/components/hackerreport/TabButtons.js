"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const DNS_TYPES = ["A", "AAAA", "MX", "NS", "SOA", "TXT"];

export default function TabButtons({ activeType, onTypeChange }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Reset loading state when the URL changes
  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const handleTabChange = (tab) => {
    if (tab === activeType) return; // Don't do anything if clicking the active tab

    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("type", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex space-x-2 mb-4">
      {DNS_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          disabled={type === activeType}
          className={`px-4 py-2 rounded transition-colors ${
            activeType === type
              ? "bg-blue-600 text-white"
              : "bg-[#1e2124] text-gray-300 hover:bg-[#2d3135]"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
