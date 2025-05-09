import React from "react";
import styles from "./Paginator.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  disabled: boolean;
  onPageChange: (page: number) => void;
};

export const Paginator: React.FC<Props> = ({
  currentPage,
  totalPages,
  disabled,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          disabled={disabled}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
