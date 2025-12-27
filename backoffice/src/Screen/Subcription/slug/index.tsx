'use client';

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Crown,
  Mail,
  Power,
  Settings2,
  ShieldCheck,
  User,
  X,
  XCircle,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';

/* ==========================================================================
   LOCAL COMPONENT: NOTIFICATION MODAL
   ========================================================================== */
interface NotificationModalProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const NotificationModal = ({
  isOpen,
  type,
  title,
  message,
  onClose,
  onConfirm,
}: NotificationModalProps) => {
  if (!isOpen) return null;

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

  const current = config[type];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={type !== 'confirm' ? onClose : undefined}
      />
      <div
        className={`relative bg-white w-full max-w-sm rounded-3xl shadow-2xl border-t-8 ${current.borderColor} p-8 text-center animate-in fade-in zoom-in duration-200`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center">
          <div className="mb-4">{current.icon}</div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">{message}</p>
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
                  onClick={onConfirm}
                  className={`flex-1 py-3 rounded-2xl font-bold text-white shadow-lg ${current.btnColor} transition-all active:scale-95`}
                >
                  Confirm
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`w-full py-3 rounded-2xl font-bold text-white shadow-lg ${current.btnColor} transition-all active:scale-95`}
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

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */
export default function SubscriptionPlanDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <SubscriptionPlanDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

/* ==========================================================================
   INNER COMPONENT (LOGIC & UI)
   ========================================================================== */
function SubscriptionPlanDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);

  // State cho Notification Modal
  const [notif, setNotif] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'confirm',
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const closeNotif = () => setNotif((prev) => ({ ...prev, isOpen: false }));

  // 1. Fetch dữ liệu ban đầu
  useEffect(() => {
    if (!id || !meds?.onGetByID) return;
    const fetchData = async () => {
      try {
        const res = await meds.onGetByID(id);
        setData(res);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };
    fetchData();
  }, [id, meds]);

  // 2. Hàm thực thi Update thực sự
  const performUpdateStatus = async (newStatus: string) => {
    closeNotif(); // Đóng modal xác nhận
    try {
      const res = await meds.onUpdateStatus(id, newStatus);
      if (res) {
        setData({ ...data, status: newStatus });
        setNotif({
          isOpen: true,
          type: 'success',
          title: 'Updated!',
          message: `Subscription has been ${newStatus === 'true' ? 'activated' : 'deactivated'} successfully.`,
          onConfirm: () => {},
        });
      }
    } catch (error) {
      setNotif({
        isOpen: true,
        type: 'error',
        title: 'Failed',
        message: 'Something went wrong while updating the status.',
        onConfirm: () => {},
      });
    }
  };

  // 3. Hàm kích hoạt Modal xác nhận
  const handleToggleStatus = () => {
    if (!data) return;
    const currentStatus = data.status === 'true';
    const newStatus = currentStatus ? 'false' : 'true';

    setNotif({
      isOpen: true,
      type: 'confirm',
      title: 'Are you sure?',
      message: `Do you want to ${currentStatus ? 'deactivate' : 'activate'} this subscription plan?`,
      onConfirm: () => performUpdateStatus(newStatus),
    });
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
          <div className="text-gray-400 font-medium">Loading Subscription...</div>
        </div>
      </div>
    );

  const { plan, customer, startDate, endDate, status, userType } = data;
  const isActive = status === 'true';

  const formatDate = (ts: number) =>
    new Date(Number(ts)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center">
      <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* CỘT TRÁI: THÔNG TIN GÓI CƯỚC */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute top-6 right-6 text-white/20">
                <Crown size={120} strokeWidth={1} />
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="flex justify-between items-end -mt-12 mb-6">
                <div className="h-24 w-24 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center relative">
                  <div className="h-full w-full bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <ShieldCheck size={40} />
                  </div>
                </div>
                <div
                  className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 border shadow-sm transition-colors duration-300 ${isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                >
                  {isActive ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  {isActive ? 'ACTIVE SUBSCRIPTION' : 'INACTIVE / EXPIRED'}
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{plan?.name}</h1>
                <p className="text-gray-500 font-medium mb-4">{plan?.description}</p>

                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Price</p>
                    <p className="text-lg font-bold text-gray-900">
                      {plan?.price} {plan?.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Duration</p>
                    <p className="text-lg font-bold text-gray-900">{plan?.durationDays} Days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Target</p>
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded capitalize">
                      {userType?.toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" /> Plan Features
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {plan?.features?.map((feature: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="p-1 bg-green-100 rounded-full text-green-600">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {feature.replace(/_/g, ' ').toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: ACTIONS & SUBSCRIBER INFO */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md border-t-4 border-blue-600 p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Settings2 size={14} /> Administrative Actions
            </h3>

            <button
              onClick={handleToggleStatus}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black transition-all active:scale-95 shadow-lg shadow-gray-200/50 ${
                isActive
                  ? 'bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-100'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {isActive ? (
                <>
                  <Power size={18} />
                  DEACTIVATE PLAN
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  ACTIVATE PLAN
                </>
              )}
            </button>

            <p className="text-[10px] text-gray-400 mt-4 text-center leading-relaxed font-medium italic">
              Note: Changing status will immediately impact the user&apos;s ability to access
              premium features.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
              <User size={14} /> Subscriber Details
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
                {customer?.firstName?.[0]}
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {customer?.firstName} {customer?.lastName}
                </p>
                <p className="text-sm text-gray-500 font-medium">@{customer?.username}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600 truncate">{customer?.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <User size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600 capitalize">
                  {userType?.toLowerCase()} Account
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Clock size={14} /> Subscription Period
            </h3>

            <div className="relative pl-4 border-l-2 border-gray-100 space-y-6 my-2 ml-2">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-0.5">Started On</p>
                <p className="font-medium text-gray-900">{formatDate(startDate)}</p>
              </div>

              <div className="relative">
                <div
                  className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white shadow-sm ${isActive ? 'bg-blue-500' : 'bg-red-500'}`}
                ></div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-0.5">Expires On</p>
                <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-red-600'}`}>
                  {formatDate(endDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER NOTIFICATION MODAL */}
      <NotificationModal
        isOpen={notif.isOpen}
        type={notif.type}
        title={notif.title}
        message={notif.message}
        onClose={closeNotif}
        onConfirm={notif.onConfirm}
      />
    </div>
  );
}
