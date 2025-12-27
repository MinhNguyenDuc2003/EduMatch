"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "common/services/components/ui/table";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  Plus,
  Search as SearchIcon,
  Trash2
} from "lucide-react";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx-js-style";

interface ModernDataTableProps {
  columns: any[];
  data?: any[];
  title?: string;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onCreate?: (row: any) => void;
  isCreate?: boolean;
  isView?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
}

export default function ModernDataTable({
  columns,
  data = [],
  title = "ExportData",
  onView,
  onEdit,
  onDelete,
  onCreate,
  isCreate = true,
  isView = true,
  isEdit = true,
  isDelete = true,
}: ModernDataTableProps) {
  const [sorting, setSorting] = useState<any>([]);
  const [filterText, setFilterText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // 1. LOGIC: HIDE ID COLUMN
  const visibleColumns = useMemo(
    () => columns.filter((col) => col.accessorKey !== "id"),
    [columns]
  );

  // 2. LOGIC: FILTER SEARCH
  const filteredData = useMemo(() => {
    if (!filterText) return data;
    const text = filterText.trim().toLowerCase();
    return data.filter((row) =>
      Object.entries(row).some(([key, v]) =>
        key !== "id" && String(v ?? "").toLowerCase().includes(text)
      )
    );
  }, [data, filterText]);

  // 3. LOGIC: TABLE INSTANCE
  const table = useReactTable({
    data: filteredData,
    columns: visibleColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(filteredData.length / pageSize),
  });

  // 4. LOGIC: EXPORT EXCEL
  const handleExportExcel = () => {
    if (!filteredData || filteredData.length === 0) return;

    const exportData = filteredData.map(({ id, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(exportData);

    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
      fill: { fgColor: { rgb: "2B6CB0" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    };

    const bodyStyle = {
      font: { sz: 11 },
      alignment: { horizontal: "left", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    };

    const range = XLSX.utils.decode_range(ws["!ref"] || "A1");

    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = XLSX.utils.encode_cell({ r: 0, c: C });
      if (ws[cell]) ws[cell].s = headerStyle;
    }

    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = XLSX.utils.encode_cell({ r: R, c: C });
        if (ws[cell]) ws[cell].s = bodyStyle;
      }
    }

    const headerKeys = Object.keys(exportData[0] || {});
    ws["!cols"] = headerKeys.map((k) => ({ wch: Math.max(k.length + 5, 15) }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    
    // LẤY NGÀY HIỆN TẠI (YYYY-MM-DD)
    const currentDate = new Date().toISOString().slice(0, 10);
    
    // XUẤT FILE: Tên_File-2025-12-27.xlsx
    XLSX.writeFile(wb, `${title}-${currentDate}.xlsx`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden font-sans">
      
      {/* --- TOOLBAR SECTION --- */}
      <div className="p-5 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search records..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 sm:text-sm"
            />
          </div>

          {/* Actions Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {isCreate && (
              <motion.button
                onClick={onCreate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-all"
              >
                <Plus size={18} />
                <span>Create New</span>
              </motion.button>
            )}

            <motion.button
              onClick={handleExportExcel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:text-green-600 hover:border-green-200 shadow-sm transition-all"
            >
              <Download size={18} />
              <span>Export</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="overflow-x-auto">
        <Table className="w-full">
        <TableHeader className="bg-slate-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow 
                key={headerGroup.id} 
                className="border-b border-slate-800 hover:bg-slate-900" 
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer select-none hover:bg-slate-800 transition-colors"
                    style={{ width: header.column.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="text-gray-400">
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUpDown className="h-3 w-3 rotate-180 text-white" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowUpDown className="h-3 w-3 text-white" />
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-50 text-gray-400" />
                        )}
                      </span>
                    </div>
                  </TableHead>
                ))}
                {(isView || isEdit || isDelete) && (
                  <TableHead className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider w-[140px]">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-50 last:border-none hover:bg-blue-50/30 transition-colors duration-150 group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}

                  {(isView || isEdit || isDelete) && (
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {isView && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onView?.(row.original);
                            }}
                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                        {isEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit?.(row.original);
                            }}
                            className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                        )}
                        {isDelete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete?.(row.original);
                            }}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length + (isView || isEdit || isDelete ? 1 : 0)}
                  className="h-32 text-center text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- PAGINATION SECTION --- */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">{filteredData.length}</span> results
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg">
            Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}