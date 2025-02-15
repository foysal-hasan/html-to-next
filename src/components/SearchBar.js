'use client'
import { useState } from "react";

const SearchBar = ({ query, setQuery }) => {
  const [search, setSearch] = useState(query);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setQuery(value);
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleSearch}
      placeholder="Search..."
      style={{ padding: "8px", marginBottom: "10px" }}
    />
  );
};

export default SearchBar;
