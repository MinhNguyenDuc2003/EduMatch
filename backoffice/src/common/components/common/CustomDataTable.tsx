"use client";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";

const CustomDataTable = ({ title = "Data Table", data = [] }) => {
  const [filterText, setFilterText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Tạo cột tự động từ data
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));
  }, [data]);

  // Lọc dữ liệu theo filter
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [data, filterText]);

  // Xuất file Excel
  const handleExportExcel = () => {
    if (selectedRows.length === 0) {
      alert("Vui lòng chọn ít nhất một dòng để xuất!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(selectedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${title.replace(/\s+/g, "_")}.xlsx`);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 w-full mx-auto border border-gray-100"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-3">
        <h2 className="text-2xl font-bold text-gray-700">{title}</h2>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm..."
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all w-full md:w-64"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button
            onClick={handleExportExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            📤 Xuất Excel
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        dense
        responsive
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15]}
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#f8fafc",
              fontWeight: "600",
              color: "#334155",
              borderBottom: "2px solid #e2e8f0",
            },
          },
          rows: {
            style: {
              borderBottom: "1px solid #f1f5f9",
              "&:hover": {
                backgroundColor: "#f9fafb",
              },
            },
          },
        }}
      />
    </motion.div>
  );
};

export default CustomDataTable;
