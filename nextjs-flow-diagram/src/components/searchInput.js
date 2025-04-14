"use client";
import { setSearchQuery } from "@/lib/features/search/searchSlices";
import { useAppDispatch } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [error, setError] = useState("");

  const isValidDomain = (domain) => {
    const domainRegex =
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = localSearchQuery.trim();

    if (!trimmedQuery) {
      setError("Please enter a domain");
      return;
    }

    if (!isValidDomain(trimmedQuery)) {
      setError("Please enter a valid domain");
      return;
    }

    setError("");
    dispatch(setSearchQuery(trimmedQuery))
    router.push(`${pathname}?domain=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              className="text-[#93adc8] flex border-none bg-[#2c3035] items-center justify-center pl-4 rounded-l-xl border-r-0"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
            <input
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-full placeholder:text-[#93adc8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal ${
                error ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Search domain"
              value={localSearchQuery}
              onChange={(e) => {
                setLocalSearchQuery(e.target.value);
                setError("");
              }}
            />
          </div>
        </label>
      </form>
      {error && (
        <div className="absolute top-12 left-0 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
