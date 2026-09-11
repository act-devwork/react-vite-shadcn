'use client';

import { cn } from '@/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './pagination';
import {
  type CellData,
  type ColumnDef,
  flexRender,
  type ReactTable,
  type RowData,
  type StockFeatures,
} from '@tanstack/react-table';

interface DataTableProps<TData extends RowData, TValue extends CellData> {
  table: ReactTable<StockFeatures, TData>;
  columns: ColumnDef<StockFeatures, TData, TValue>[];
  containerClassName?: string;
  className?: string;
  rowClassName?: string;
  onRowClick?: (data: TData, index: number) => void;
  noResultsMessage?: React.ReactNode;
  showPagination?: boolean;
  loading?: boolean;
  totalItems?: number;
}

export default function DataTable<TData extends RowData, TValue extends CellData>(
  props: DataTableProps<TData, TValue>,
) {
  const {
    table,
    containerClassName,
    className,
    rowClassName,
    columns,
    onRowClick,
    noResultsMessage = 'No data',
    showPagination = true,
    loading = false,
    totalItems = 0,
  } = props;

  return (
    <>
      <div className={cn('overflow-x-auto rounded-md border', containerClassName)}>
        <Table className={cn(className)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-background" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn('hover:bg-muted', rowClassName, onRowClick ? 'cursor-pointer' : '')}
                  onClick={() => onRowClick && onRowClick(row.original, index)}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && !loading && <DataTablePagination table={table} totalItems={totalItems} />}
    </>
  );
}
