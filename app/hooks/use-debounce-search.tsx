import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";

const DEBOUNCE_DELAY = 300;

export function useDebouncedSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(
    () => searchParams.get("search") || ""
  );

  // Sync input when URL changes (e.g. back/forward)
  useEffect(() => {
    setInputValue(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounced update
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      if (inputValue !== currentSearch) {
        const newParams = new URLSearchParams(searchParams);
        const trimmed = inputValue.trim();
        if (trimmed === "") {
          newParams.delete("search");
        } else {
          newParams.set("search", trimmed);
        }
        navigate(`?${newParams.toString()}`, { replace: true });
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [inputValue, searchParams, navigate]);

  const handleChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return {
    inputValue,
    handleChange,
  };
}
