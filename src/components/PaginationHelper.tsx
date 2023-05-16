import useDebounce from "@/hooks/useDebounce";
import { FC, useEffect, useState } from "react";

interface IProps {
  page: number;
  setPage: (page: number) => void;
  noOfPages: number;
  loading: boolean;
}

const PaginationHelper: FC<IProps> = ({
  page,
  setPage,
  noOfPages,
  loading,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [pageInput, setPageInput] = useState<number>(page);
  const debouncedSearchTerm = useDebounce(String(pageInput), 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      setPage(Number(debouncedSearchTerm));
      setIsSearching(false);
    } else {
      setPage(1);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="flex items-center gap-2 md:ml-auto">
      {isSearching || loading ? (
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white/50"></div>
      ) : (
        <>
          <button
            className="rounded-lg bg-white/5 px-4 py-2 text-white shadow-2xl disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <input
            type="number"
            className="w-16 rounded-lg bg-white/5 p-2 text-white shadow-2xl focus:border-0 focus:outline-none focus:ring-0 active:border-0 active:outline-none active:ring-0"
            onChange={(e) => setPageInput(Number(e.target.value))}
            value={pageInput}
          />

          <button
            className="rounded-lg bg-white/5 px-4 py-2 text-white shadow-2xl"
            onClick={() => setPage(page + 1)}
            disabled={page === noOfPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export { PaginationHelper };
