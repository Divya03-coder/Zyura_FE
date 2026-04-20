import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 4) {
    // Show all pages if 4 or less
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    // Always show first and last
    const left = Math.max(currentPage - 1, 2);
    const right = Math.min(currentPage + 1, totalPages - 1);

    pages.push(1); // first page

    if (left > 2) pages.push("..."); // left ellipsis

    for (let i = left; i <= right; i++) pages.push(i); // middle pages

    if (right < totalPages - 1) pages.push("..."); // right ellipsis

    pages.push(totalPages); // last page
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1 text-sm rounded-md disabled:opacity-40 hover:bg-gray-100 cursor-pointer text-[#09090B]"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-sm">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page as number)}
            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
              currentPage === page
                ? "bg-white border border-[#E4E4E7] text-[#09090B]"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1 text-sm rounded-md disabled:opacity-40 hover:bg-gray-100 cursor-pointer text-[#09090B]"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
