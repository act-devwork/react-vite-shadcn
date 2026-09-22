import { type ReactTable, type RowData, type StockFeatures } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<StockFeatures, TData>;
  className?: string;
  showPageSize?: boolean;
  showSelectedCount?: boolean;
  pageSizeOptions?: number[];
  totalItems?: number;
}

export function DataTablePagination<TData extends RowData>({
  table,
  className,
  showPageSize = true,
  pageSizeOptions = [10, 20, 50, 100, 200],
  totalItems = 0,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination;
  const currentPage = pageIndex + 1;
  const totalPages = table.getPageCount() || 1;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 pt-4',
        'md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <Button className="h-9! hover:bg-transparent cursor-default w-fit" variant="outline">
          <FileText className="h-3 w-3" />
          Total: {totalItems.toLocaleString()} items
        </Button>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
        {showPageSize && (
          <div className="flex items-center gap-2.5">
            <label className="text-sm text-muted-foreground whitespace-nowrap">Page size</label>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-9! font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {showPageSize && <div className="hidden sm:block h-6 w-px bg-border" />}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-muted-foreground">Page</span>
            <span className="inline-flex items-center justify-center min-w-8 px-2 py-1 rounded-md bg-muted font-semibold tabular-nums">
              {currentPage}
            </span>
            <span className="text-muted-foreground">of</span>
            <span className="font-medium tabular-nums">{totalPages}</span>
          </div>

          <div className="flex items-center gap-0.5 rounded-md border bg-secondary p-0.5">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="size-5" />
              <span className="sr-only">First page</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-muted"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-5" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-muted"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="size-5" />
              <span className="sr-only">Next page</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-muted"
              onClick={() => table.lastPage()}
              disabled={!table.getCanLastPage()}
            >
              <ChevronsRight className="size-5" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
