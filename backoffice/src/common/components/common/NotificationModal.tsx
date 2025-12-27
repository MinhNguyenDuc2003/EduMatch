'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void; // Used only for 'confirm' type
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  type,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  // UI Configuration based on type
  const config = {
    success: {
      icon: <CheckCircle2 className="text-emerald-500" size={48} />,
      btnColor: 'bg-emerald-600 hover:bg-emerald-700',
      borderColor: 'border-emerald-100',
    },
    error: {
      icon: <XCircle className="text-red-500" size={48} />,
      btnColor: 'bg-red-600 hover:bg-red-700',
      borderColor: 'border-red-100',
    },
    confirm: {
      icon: <AlertTriangle className="text-amber-500" size={48} />,
      btnColor: 'bg-blue-600 hover:bg-blue-700',
      borderColor: 'border-blue-100',
    },
  };

  const currentConfig = config[type];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={type !== 'confirm' ? onClose : undefined} 
      />

      {/* Modal Content */}
      <div className={`relative bg-white w-full max-w-sm rounded-3xl shadow-2xl border-t-8 ${currentConfig.borderColor} p-8 animate-in fade-in zoom-in duration-200`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{currentConfig.icon}</div>
          
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
            {title}
          </h3>
          
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex w-full gap-3">
            {type === 'confirm' ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (onConfirm) onConfirm();
                  }}
                  className={`flex-1 py-3 rounded-2xl font-bold text-white transition-all active:scale-95 shadow-lg ${currentConfig.btnColor}`}
                >
                  Confirm
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`w-full py-3 rounded-2xl font-bold text-white transition-all active:scale-95 shadow-lg ${currentConfig.btnColor}`}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;