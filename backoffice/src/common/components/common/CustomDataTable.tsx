"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";
import {
  Edit,
  Trash2,
  Search as SearchIcon,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "common/services/components/ui/table";
import * as XLSX from "xlsx-js-style";

interface ModernDataTableProps {
  columns: any[];
  data?: any[];
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onCreate?: () => void;
  isCreate?: boolean;
  isView?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
}

export default function ModernDataTable({
  columns,
  data = [],
  onView,
  onEdit,
  onDelete,
  onCreate,
  isCreate = true,
  isView = true,
  isEdit = true,
  isDelete = true,
}: ModernDataTableProps) {
  const [sorting, setSorting] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // ẨN CỘT ID
  const visibleColumns = useMemo(
    () => columns.filter((col) => col.accessorKey !== "id"),
    [columns]
  );

  // FILTER SEARCH (không search ID)
  const filteredData = useMemo(() => {
    if (!filterText) return data;
    const text = filterText.trim().toLowerCase();
    return data.filter((row) =>
      Object.entries(row).some(([key, v]) =>
        key !== "id" && String(v ?? "").toLowerCase().includes(text)
      )
    );
  }, [data, filterText]);

  // TABLE INSTANCE
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

  // EXPORT Excel
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
    XLSX.writeFile(wb, `export-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4">
        <h3 className="text-lg font-semibold text-gray-700" />

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search..."
              className="w-full md:w-72 pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {isCreate && (
            <motion.button
              onClick={onCreate}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-xl shadow-sm"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Create New</span>
            </motion.button>
          )}

          <motion.button
            onClick={handleExportExcel}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 text-white px-3 py-2 rounded-xl shadow-sm"
          >
            <FileSpreadsheet size={16} />
            <span className="text-sm font-medium">Export Excel</span>
          </motion.button>
        </div>
      </div>

      {/* TABLE */}
      <Table className="table-fixed w-full">
        <TableHeader className="bg-slate-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-white font-semibold cursor-pointer select-none truncate"
                  style={{ width: header.column.getSize() || 150 }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center justify-start">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className="ml-1">
                      {header.column.getIsSorted() === "asc"
                        ? "▲"
                        : header.column.getIsSorted() === "desc"
                        ? "▼"
                        : ""}
                    </span>
                  </div>
                </TableHead>
              ))}
              {(isView || isEdit || isDelete) && (
                <TableHead className="text-white w-[120px]">Actions</TableHead>
              )}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-blue-50 transition">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="truncate"
                  style={{ width: cell.column.getSize() || 150 }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}

              {(isView || isEdit || isDelete) && (
                <TableCell className="w-[120px] text-center">
                  <div className="flex gap-3 justify-start">
                    {isView && (
                      <SearchIcon
                        size={18}
                        className="text-blue-600 cursor-pointer hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          onView?.(row.original);
                        }}
                      />
                    )}
                    {isEdit && (
                      <Edit
                        size={18}
                        className="text-green-600 cursor-pointer hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(row.original);
                        }}
                      />
                    )}
                    {isDelete && (
                      <Trash2
                        size={18}
                        className="text-red-600 cursor-pointer hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(row.original);
                        }}
                      />
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="p-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredData.length} result
          {filteredData.length !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} /{" "}
            {Math.max(1, table.getPageCount())}
          </div>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
