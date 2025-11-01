'use client';
import React, { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import { ChevronDown ,ChevronUp} from 'lucide-react';

const CustomDataTable = ({ title = 'Data Table', data = [] }) => {
  const [filterText, setFilterText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Cột hiển thị dữ liệu
  const baseColumns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      selector: (row) => row[key],
      sortable: true,
      cell: (row) => (
        <div className="truncate max-w-[250px]" title={row[key]}>
          {row[key]}
        </div>
      ),
    }));
  }, [data]);

  // ✅ Thêm cột cuối chứa nút mở rộng
  const columns = [
    ...baseColumns,
    {
      name: '',
      button: true,
      width: '60px',
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpandedRow(expandedRow === row.id ? null : row.id);
          }}
          className="flex justify-center items-center w-full text-gray-500 hover:text-blue-600 transition"
        >
          {expandedRow === row.id ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      ),
    },
  ];

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

  // Hàng mở rộng chi tiết
  const ExpandedRow = ({ data }: { data: any }) => (
    <motion.div
      className="bg-gray-50 border-t border-gray-200 rounded-b-2xl p-5 shadow-inner"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-semibold text-gray-700">Thông tin chi tiết</h3>
      </div>

      <div className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {Object.entries(data).map(([key, value], index) => (
          <div
            key={key}
            className={`flex justify-between items-center px-4 py-2 ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            } hover:bg-blue-50 transition-colors duration-150`}
          >
            <span className="text-sm font-medium text-gray-600 w-1/3">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
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
      {/* Thanh tìm kiếm và xuất Excel */}
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

      {/* Bảng dữ liệu */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        dense
        expandableIcon={{
          collapsed: <></>,
          expanded: <></>,
        }}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15]}
        expandableRows
        expandableRowExpanded={(row) => expandedRow === row.id}
        expandableRowsComponent={({ data }) => <ExpandedRow data={data} />}
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
