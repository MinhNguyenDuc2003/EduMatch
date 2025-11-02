'use client';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import { Search, FileSpreadsheet } from 'lucide-react';

interface CustomDataTableProps {
  title?: string;
  data?: any[];
  customTitles?: string[];
  externalFilterText?: string;
}

const CustomDataTable = ({
  title = 'Data Table',
  data = [],
  customTitles = [],
  externalFilterText = '',
}: CustomDataTableProps) => {
  const [filterText, setFilterText] = useState(externalFilterText);

  useEffect(() => {
    setFilterText(externalFilterText);
  }, [externalFilterText]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Cột hiển thị dữ liệu
  const baseColumns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).map((key, index) => ({
      name: (customTitles as string[])[index] || key.charAt(0).toUpperCase() + key.slice(1),
      selector: (row: any) => row[key],
      sortable: true,
      cell: (row: any) => (
        <div className="truncate max-w-[250px]" title={row[key]}>
          {' '}
          {row[key]}{' '}
        </div>
      ),
    }));
  }, [data, customTitles]);

  // Lọc dữ liệu
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [data, filterText]);

  // Xuất Excel
  const handleExportExcel = () => {
    if (selectedRows.length === 0) {
      alert('Vui lòng chọn ít nhất một dòng để xuất!');
      return;
    }
    const ws = XLSX.utils.json_to_sheet(selectedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${title.replace(/\s+/g, '_')}.xlsx`);
  };

  // Component hiển thị chi tiết khi expand
  const ExpandedRow = ({ data }: { data: any }) => (
    <motion.div
      className="bg-gray-50 border-t border-gray-200 rounded-b-2xl p-5 shadow-inner"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {Object.entries(data).map(([key, value], index) => (
          <div
            key={key}
            className={`flex justify-between items-center px-4 py-2 ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            } hover:bg-blue-50 transition-colors duration-150`}
          >
            <span className="text-sm font-medium text-gray-600 w-1/3">
              {(customTitles as string[])[index] || key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>
            <span className="text-sm text-gray-800 w-2/3 text-right break-words">
              {String(value) || '—'}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 w-full mx-auto border border-gray-100 overflow-x-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-700">{title}</h2>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          <motion.button
            onClick={handleExportExcel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <FileSpreadsheet size={18} />
            <span>Xuất Excel</span>
          </motion.button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <DataTable
        columns={baseColumns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        dense
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows as any)}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15]}
        expandableRows
        expandableRowExpanded={(row) => expandedRow === row.id}
        expandableRowsComponent={({ data }) => <ExpandedRow data={data} />}
        onRowClicked={(row) => setExpandedRow(expandedRow === row.id ? null : row.id)}
        customStyles={{
          table: { style: { minWidth: '100%', whiteSpace: 'nowrap' } },
          headCells: {
            style: {
              backgroundColor: '#f8fafc',
              fontWeight: '600',
              color: '#334155',
              borderBottom: '2px solid #e2e8f0',
            },
          },
          rows: {
            style: {
              borderBottom: '1px solid #f1f5f9',
              cursor: 'pointer',
            },
          },
        }}
      />
    </motion.div>
  );
};

export default CustomDataTable;
