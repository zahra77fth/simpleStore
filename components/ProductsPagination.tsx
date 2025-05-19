import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Button } from "./ui/button";

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ProductsPaginationProps) => {
  const prevPage = () => onPageChange(Math.max(1, currentPage - 1));
  const nextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));

  // Generate visible page numbers (current page ± 1)
  const visiblePages = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <Button
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
