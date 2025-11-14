'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface CustomModalProps {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}

const CustomModal = ({
  open,
  title = 'Thông báo',
  children,
  onClose,
  onConfirm,
  confirmText = 'Xác nhận',
}: CustomModalProps) => {
  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[450px] relative"
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

        {/* Content */}
        <div className="mb-5 text-gray-700">{children}</div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Đóng
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition"
            >
              {confirmText}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomModal;
