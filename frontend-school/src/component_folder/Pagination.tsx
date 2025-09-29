import type {PaginationProps} from "../types/types";
import {useSearchParams} from "react-router-dom";

function getPaginationRange(
    current: number,
    total: number
): (number | "...")[] {
    if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);

    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3)
        return [1, "...", total - 4, total - 3, total - 2, total - 1, total];

    return [1, "...", current - 1, current, current + 1, "...", total];
}

function Pagination({
                        currentPage,
                        totalPages1,
                        onPageChange,
                        isFetching
                    }: PaginationProps) {
    const pages = getPaginationRange(currentPage, totalPages1!);

    const [searchParams, setSearchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const pageChange = (page: number) => {
        params.set("page", String(page));
        setSearchParams(params);
        onPageChange(page);
    }


    return (
        <>
            <div className="join w-full flex justify-center my-4 gap-1">
                {/* Prev Button */}
                <button
                    onClick={() => pageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1 || isFetching}
                    className="join-item btn"
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {pages.map((p, i) =>
                        p === "..." ? (
                            <span key={`dots-${i}`} className="px-2 select-none">
              ...
            </span>
                        ) : (
                            <button
                                key={p}
                                disabled={isFetching}
                                onClick={() => pageChange(p)}
                                className={`join-item btn ${
                                    p === currentPage ? "bg-blue-600 text-white" : ""
                                }`}
                            >
                                {p}
                            </button>
                        )
                )}

                {/* Next Button */}
                <button
                    onClick={() => pageChange(Math.min(currentPage + 1, totalPages1))}
                    disabled={currentPage === totalPages1 || isFetching}
                    className="join-item btn"
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Pagination;
