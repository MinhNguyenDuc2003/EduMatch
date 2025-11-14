'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface CustomConfirmProps {
  open: boolean;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const CustomConfirm = ({
  open,
  message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  onCancel,
  onConfirm,
}: CustomConfirmProps) => {
  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-[90%] md:w-[400px] shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="flex flex-col items-center text-center">
          <AlertTriangle size={40} className="text-yellow-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Xác nhận hành động</h3>
          <p className="text-gray-600 mb-5">{message}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomConfirm;
