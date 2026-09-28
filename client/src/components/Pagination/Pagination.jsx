import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) {
  if (totalPages <= 1) return null;

  

  // Fixed getPageNumbers logic with a guaranteed return fallback
const getPageNumbers = () => {
  const totalNumbers = siblingCount * 2 + 3; 
  const totalBlocks = totalNumbers + 2; 

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  // Case 1: No left dots, but right dots needed
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  // Case 2: Left dots needed, but no right dots needed
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, "...", ...rightRange];
  }

  // Case 3: Both left and right dots needed
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, "...", ...middleRange, "...", totalPages];
  }

  // Fallback (prevents returning undefined)
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

// Safe defensive check before mapping
const pages = getPageNumbers() || [];


  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 w-full max-w-4xl mx-auto px-4"
    >
      {/* Page Info */}
      <p className="text-sm text-stone-500 order-2 sm:order-1">
        Showing page{" "}
        <span className="font-semibold text-stone-900">{currentPage}</span> of{" "}
        <span className="font-semibold text-stone-900">{totalPages}</span>
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center order-1 sm:order-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="px-3.5 py-2 text-sm rounded-lg border border-stone-300 bg-white text-stone-700 font-medium transition hover:bg-stone-50 active:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          Previous
        </button>

        {/* Page Numbers & Ellipses */}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-9 h-9 flex items-center justify-center text-stone-400 text-sm select-none"
              >
                &#8230;
              </span>
            );
          }

          const isCurrent = currentPage === page;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isCurrent ? "page" : undefined}
              aria-label={`Page ${page}`}
              className={`w-9 h-9 text-sm rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                isCurrent
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 active:bg-stone-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="px-3.5 py-2 text-sm rounded-lg border border-stone-300 bg-white text-stone-700 font-medium transition hover:bg-stone-50 active:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          Next
        </button>
      </div>
    </nav>
  );
}