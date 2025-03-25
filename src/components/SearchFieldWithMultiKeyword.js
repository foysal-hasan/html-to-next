'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const SearchFieldWithMultiKeyword = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  // Domain validation regex
  const domainRegex =
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

  // Monitor URL changes
  useEffect(() => {
    if (isLoading) {
      const currentQuery = searchParams.get('domain');
      // If current URL query matches the last searched query, stop loading
      if (currentQuery === lastSearchedQuery) {
        setIsLoading(false);
      }
    }
  }, [searchParams, lastSearchedQuery, isLoading]);

  // Hide tooltip after 3 seconds
  useEffect(() => {
    if (error) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateAndAddDomain = (domain) => {
    const trimmedDomain = domain.trim().toLowerCase();

    if (!trimmedDomain) {
      setError('Please enter a domain');
      return false;
    }

    if (!domainRegex.test(trimmedDomain)) {
      setError('Please enter a valid domain (e.g., example.com)');
      return false;
    }

    if (tags.includes(trimmedDomain)) {
      setError('This domain has already been added');
      return false;
    }

    setTags([...tags, trimmedDomain]);
    setError('');
    return true;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      e.preventDefault();
      if (validateAndAddDomain(text)) {
        setText('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tags.length === 0) {
      setError('Please add at least one domain before searching');
      return;
    }

    setIsLoading(true);
    const searchQuery = tags.join(',');
    // Store the query we're searching for
    setLastSearchedQuery(searchQuery);

    // Push to new route
    router.push(`${pathname}?domain=${encodeURIComponent(searchQuery)}`);

    // Clear tags after search
    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 p-2 bg-[#2c3035] rounded-md min-h-[42px]">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-white hover:text-red-200"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                tags.length === 0
                  ? 'Enter domains (press Enter after each)'
                  : ''
              }
              className="flex-1 bg-transparent text-white outline-none min-w-[120px]"
              disabled={isLoading}
            />
          </div>
          {showTooltip && error && (
            <div className="absolute top-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-lg transition-opacity duration-300 z-10">
              {error}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`h-[42px] px-4 rounded-md transition-colors flex items-center justify-center whitespace-nowrap w-full sm:w-auto
                     ${
                       isLoading
                         ? 'bg-gray-400 cursor-not-allowed'
                         : 'bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-teal-500'
                     } 
                     text-white`}
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
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};

const SearchFieldWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchFieldWithMultiKeyword />
  </Suspense>
);

export default SearchFieldWrapper;
