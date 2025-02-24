interface PaginationProps {
  currentPage: number;
  pageSize: number;
  total: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  pageSize,
  total,
  loading = false,
  onPageChange
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1 || loading}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 mx-1 rounded-lg bg-white border border-gray-200 disabled:opacity-50"
      >
        上一页
      </button>
      <span className="px-4 py-2">
        第 {currentPage} 页 / 共 {totalPages} 页
      </span>
      <button
        disabled={(currentPage * pageSize) >= total || loading}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 mx-1 rounded-lg bg-white border border-gray-200 disabled:opacity-50"
      >
        下一页
      </button>
    </div>
  );
}; 
