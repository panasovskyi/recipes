import { useSearchParams } from "react-router-dom";

type UsePaginationProps = {
  totalPages: number;
  pageSize?: number;
};

export const usePagination = ({ totalPages, pageSize = 5 }: UsePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get("page");
  const currentPage = queryPage ? Math.max(1, Number(queryPage)) : 1;

  const currentBlock = Math.ceil(currentPage / pageSize);
  const startPage = (currentBlock - 1) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  // Генеруємо масив лише для поточного блоку [1, 2, 3, 4, 5] або [6, 7, 8, 9, 10]
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const updatePageInUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    setSearchParams(params);
  };

  const handlePageSelect = (pageNumber: number) => {
    updatePageInUrl(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      updatePageInUrl(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      updatePageInUrl(currentPage - 1);
    }
  };

  return {
    currentPage,
    pages,
    handlePageSelect,
    handleNextPage,
    handlePrevPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage >= totalPages,
  };
};
