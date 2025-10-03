import { type ChangeEvent } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import { useDebouncedSearch } from "~/hooks/use-debounce-search";

const SearchInput = () => {
  const { inputValue, handleChange } = useDebouncedSearch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-muted-foreground peer-disabled:opacity-50">
          <SearchIcon className="size-4" />
          <span className="sr-only">Search</span>
        </div>
        <Input
          type="search"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
          className="peer px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
        />
      </div>
    </div>
  );
};

export default SearchInput;
