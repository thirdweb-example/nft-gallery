import { FC } from "react";

interface IProps {
  page: number;
  setPage: (page: number) => void;
  noOfPages: number;
}

const PaginationHelper: FC<IProps> = ({ page, setPage, noOfPages }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="text-white px-4 py-2 rounded-lg bg-white/5 shadow-2xl disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
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
        className="text-white rounded-lg w-20 p-2 bg-white/5 shadow-2xl"
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
      />

      <button
        className="text-white px-4 py-2 rounded-lg bg-white/5 shadow-2xl"
        onClick={() => setPage(page + 1)}
        disabled={page === noOfPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export { PaginationHelper };
