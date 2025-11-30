'use client';
import { motion } from 'framer-motion';
import {
  Edit,
  FileSpreadsheet,
  MoreHorizontal,
  Plus,
  Search,
  SearchIcon,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx-js-style';
import CustomConfirm from './CustomConfirm';
import CustomModal from './CustomModal';

interface CustomDataTableProps {
  title?: string;
  data?: any[];
  customTitles?: string[];
  externalFilterText?: string;
  onCreate?: () => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  detailPath?: string;
  isCreate?: boolean;
  isEdit?: boolean;
}

const CustomDataTable = ({
  title = 'Data Table',
  data = [],
  customTitles = [],
  externalFilterText = '',
  onCreate,
  // onEdit,
  onDelete,
  onView,
  isCreate,
  detailPath,
  isEdit,
}: CustomDataTableProps) => {
  const router = useRouter();
  const [filterText, setFilterText] = useState(externalFilterText);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  // modal & confirm
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useEffect(() => {
    setFilterText(externalFilterText);
  }, [externalFilterText]);

  // const handleCreate = () => {
  //   setModalType('create');
  //   setShowModal(true);
  // };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (row: any) => {
    setSelectedRow(row);
    setShowConfirm(true);
  };

const handleView = (row: any) => {
  if (onView) return onView(row);
  if (detailPath && row?.id !== undefined && row?.id !== null) {
    const id = encodeURIComponent(String(row.id));
    const role = row.role ? encodeURIComponent(String(row.role)) : null;

    const url = role
      ? `${detailPath.replace(/\/$/, '')}/${id}/${role}`
      : `${detailPath.replace(/\/$/, '')}/${id}`;

    router.push(url);
  }
};



  const baseColumns = useMemo(() => {
    if (!data || data.length === 0) return [];
    const dataCols = Object.keys(data[0]).map((key, index) => ({
      name: (customTitles as string[])[index] || key.charAt(0).toUpperCase() + key.slice(1),
      selector: (row: any) => row[key],
      sortable: true,
      cell: (row: any) => (
        <div className="truncate max-w-[250px]" title={row[key]}>
          {row[key]}
        </div>
      ),
    }));

    const actionCol = {
      name: 'Actions',
      button: true,
      cell: (row: any) => (
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdown(openDropdown === row.id ? null : row.id);
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <MoreHorizontal className="text-gray-500" size={18} />
          </button>

          {openDropdown === row.id && (
            <motion.div
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <button
                onClick={() => handleView(row)}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                <span className="mr-2">
                  <SearchIcon size={16} className="text-blue-600" />
                </span>
                View Details
              </button>
              {isEdit && (
                <button
                  onClick={() => handleEdit(row)}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  <Edit size={16} className="mr-2 text-blue-600" /> Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(row)}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50"
              >
                <Trash2 size={16} className="mr-2 text-red-600" /> Delete
              </button>
            </motion.div>
          )}
        </div>
      ),
    };

    return [...dataCols, actionCol];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, customTitles, openDropdown]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [data, filterText]);

  // Excel export with style
  const handleExportExcel = () => {
    if (!data || data.length === 0) return;

    const ws = XLSX.utils.json_to_sheet(data);

    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 13 },
      fill: { fgColor: { rgb: '4472C4' } },
      alignment: { horizontal: 'center', vertical: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } },
      },
    };

    const bodyStyle = {
      font: { sz: 12 },
      alignment: { horizontal: 'left', vertical: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } },
      },
    };

    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (ws[cellAddress]) ws[cellAddress].s = headerStyle;
    }

    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (ws[cellAddress]) ws[cellAddress].s = bodyStyle;
      }
    }

    const colWidths = Object.keys(data[0]).map((key) => ({
      wch: Math.max(key.length, 60),
    }));
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title || 'Data List');
    XLSX.writeFile(wb, `${title || 'data'}.xlsx`);
  };

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
              {(customTitles as string[])[index] || key.charAt(0).toUpperCase() + key.slice(1)}
              :{' '}
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
    <>
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 w-full mx-auto border border-gray-100 z-50 overflow-x-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-700">{title}</h2>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            {isCreate && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCreate}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Plus size={18} />
                <span>Create</span>
              </motion.button>
            )}

            <motion.button
              onClick={handleExportExcel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <FileSpreadsheet size={18} />
              <span>Export Excel</span>
            </motion.button>
          </div>
        </div>

        <DataTable
          columns={baseColumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          dense
          selectableRows
          onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
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
                backgroundColor: '#38578a',
                fontWeight: '600',
                color: 'white',
                borderBottom: '2px solid #e2e8f0',
              },
            },
            rows: { style: { borderBottom: '1px solid #f1f5f9', cursor: 'pointer' } },
          }}
        />
      </motion.div>

      <CustomConfirm
        open={showConfirm}
        message="Are you sure you want to delete this record?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          onDelete?.(selectedRow);
          setModalType(null);
          setShowModal(true);
        }}
      />

      {showModal && !modalType && (
        <CustomModal
          open={showModal}
          title="Confirmed Record Information"
          onClose={() => setShowModal(false)}
          onConfirm={() => setShowModal(false)}
          confirmText="Confirm"
        >
          {selectedRow ? (
            <div className="space-y-2 text-gray-700">
              {Object.entries(selectedRow).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-1">
                  <span className="font-medium capitalize">{key}:</span>
                  <span>{String(value) || '—'}</span>
                </div>
              ))}
              <div className="pt-2 text-green-600 font-semibold">✅ Successfully confirmed!</div>
            </div>
          ) : (
            <p>No data to display.</p>
          )}
        </CustomModal>
      )}
    </>
  );
};

export default CustomDataTable;
