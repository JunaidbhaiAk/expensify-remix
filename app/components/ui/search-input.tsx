"use client";

import { useState, type ChangeEvent } from "react";

import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import { useSearchParams } from "react-router";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [_, setSearchParams] = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchParams((pre) => ({ ...pre, search: value }));
    setValue(value);
  };

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <SearchIcon className="size-4" />
          <span className="sr-only">Search</span>
        </div>
        <Input
          type="search"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          className="peer px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
        />
      </div>
    </div>
  );
};

export default SearchInput;
