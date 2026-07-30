import React from "react";
import styles from "./Pagination.module.scss";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/atoms/Button";
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/atoms/icons';

type Props = {
  totalPages: number;
};

export const Pagination: React.FC<Props> = ({ totalPages }) => {
  const {
    currentPage,
    pages,
    handlePageSelect,
    handleNextPage,
    handlePrevPage,
    isFirstPage,
    isLastPage,
  } = usePagination({ totalPages });

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <Button
        text={<ChevronLeftIcon />}
        onClick={handlePrevPage}
        disabled={isFirstPage}
        variant="btnPrev"
        shouldShowSpinner={false}
      />

      <div className={styles.pages}>
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => handlePageSelect(pageNumber)}
            isActive={pageNumber === currentPage}
            text={pageNumber}
            variant="btnPage"
          />
        ))}
      </div>

      <Button
        text={<ChevronRightIcon />}
        onClick={handleNextPage}
        disabled={isLastPage}
        variant="btnNext"
        shouldShowSpinner={false}
      />
    </div>
  );
};
