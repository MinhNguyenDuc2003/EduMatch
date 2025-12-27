'use client';

import {
  AlertCircle,
  Check,
  CornerDownRight,
  Mail,
  MessageSquare,
  Send,
  Tag,
  User,
  X,
  XCircle,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';

/* ==========================================================================
   COMPONENT: NOTIFICATION MODAL (REPLACES ALERT & CONFIRM)
   ========================================================================== */
interface NotificationModalProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={type !== 'confirm' ? onClose : undefined} 
      />
      <div className={`relative bg-white w-full max-w-sm rounded-3xl shadow-2xl border-t-8 ${currentConfig.borderColor} p-8 animate-in fade-in zoom-in duration-200 text-center`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>
        <div className="flex flex-col items-center">
          <div className="mb-4">{currentConfig.icon}</div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">{message}</p>
          <div className="flex w-full gap-3">
            {type === 'confirm' ? (
              <>
                <button onClick={onClose} className="flex-1 py-3 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95">Cancel</button>
                <button 
                  onClick={() => { if (onConfirm) onConfirm(); }}
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

/* ==========================================================================
   MAIN PAGE: REPORT FEEDBACK DETAIL
   ========================================================================== */
export default function ReportFeedbackDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <ReportFeedbackDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function ReportFeedbackDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);

  // LOGIC NOTIFICATION STATE
  const [notif, setNotif] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'confirm',
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Cập nhật hàm close để reload nếu là thông báo thành công
  const closeNotif = () => {
    if (notif.type === 'success' && notif.title === 'Reply Sent') {
      window.location.reload();
    }
    setNotif(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        try {
          const res = await meds.onGetByID(id);
          setData(res);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [id, meds]);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) {
      setNotif({
        isOpen: true,
        type: 'error',
        title: 'Missing Content',
        message: 'Please enter a reply before sending your response.',
        onConfirm: () => {},
      });
      return;
    }

    setLoading(true);
    try {
      await meds.onReply(id, replyText);
      setIsModalOpen(false);
      
      // Hiện thông báo thành công - closeNotif sẽ xử lý reload
      setNotif({
        isOpen: true,
        type: 'success',
        title: 'Reply Sent',
        message: 'Your official response has been recorded and the status updated.',
        onConfirm: () => {},
      });
    } catch (err) {
      console.error(err);
      setNotif({
        isOpen: true,
        type: 'error',
        title: 'Action Failed',
        message: 'Could not send the reply. Please try again later.',
        onConfirm: () => {},
      });
    } finally {
      setLoading(false);
    }
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="flex flex-col items-center gap-3 animate-pulse text-gray-400 font-medium">
          <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
          <div>Loading Ticket...</div>
        </div>
      </div>
    );

  const { customer, category } = data;
  const isPending = data.status === 'PENDING';

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center text-gray-900">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: TICKET CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{data.title}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${isPending
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-green-50 text-green-700 border-green-200'
              }`}>
                {data.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 uppercase">
                <Tag size={12} /> {category?.type}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 uppercase tracking-tighter">
                {category?.name}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <MessageSquare size={20} className="text-blue-500" />
              <h3 className="font-bold text-gray-900 uppercase tracking-tight">Report Description</h3>
            </div>
            <div className="text-gray-700 leading-relaxed font-medium">
              {data.comment}
            </div>
            <p className="mt-6 text-sm text-gray-400 italic">
              Category policy: {category?.description}
            </p>
          </div>

          {data.response ? (
            <div className="bg-blue-50/50 rounded-2xl shadow-sm border border-blue-100 p-8 ml-0 lg:ml-8 relative">
              <div className="absolute -left-4 top-8 text-gray-300 hidden lg:block">
                <CornerDownRight size={32} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Send size={14} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Admin Response</h3>
                  <p className="text-xs text-gray-500">Official resolution provided</p>
                </div>
              </div>
              <p className="text-gray-800 bg-white p-5 rounded-xl border border-blue-100 shadow-sm font-medium italic leading-relaxed">
                &quot;{data.response}&quot;
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center transition-all hover:border-blue-200">
              <div className="mx-auto h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <MessageSquare size={20} className="text-gray-300" />
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Pending Resolution</h3>
              <p className="text-gray-500 text-sm mb-6 font-medium">This ticket is currently waiting for an administrative action.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-wider text-xs"
              >
                Respond Now
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-20 bg-gradient-to-r from-slate-700 to-slate-800">
              <div className="absolute -bottom-10 left-6">
                <div className="h-20 w-20 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-2xl font-black text-slate-600 shadow-sm uppercase">
                  {customer?.firstName?.[0] || <User />}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-12 relative">
              <h2 onClick={() => router.push('/profileApplica')} className="text-xl font-extrabold text-gray-900 tracking-tight cursor-pointer hover:text-blue-600 transition">
                {customer?.firstName} {customer?.lastName}
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                  <div className="bg-gray-50 p-2 rounded-lg text-gray-400"><Mail size={16} /></div>
                  <a href={`mailto:${customer?.email}`} className="hover:text-blue-600 transition truncate underline decoration-gray-200 decoration-2 underline-offset-4">
                    {customer?.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Ticket Status</h3>
            <div className="flex items-center gap-4">
              {isPending ? (
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600"><AlertCircle size={24} /></div>
              ) : (
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600"><Check size={24} /></div>
              )}
              <div>
                <p className="font-black text-gray-900 uppercase text-xs tracking-tighter">{isPending ? 'Pending Review' : 'Resolved'}</p>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isPending ? 'Action required by Admin' : 'Finalized by Admin'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REPLY MODAL (FORM) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[99] p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl border border-gray-50 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">Draft Response</h3>
                <p className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest text-[10px]">Official Admin Panel</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100 italic font-medium text-gray-500 text-sm">
              &quot;{data.comment}&quot;
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-2xl p-5 mb-6 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition resize-none text-gray-700 font-medium leading-relaxed"
              rows={6}
              placeholder="Enter your official resolution or response here..."
            />

            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 text-gray-500 font-black uppercase text-xs tracking-widest hover:bg-gray-50 rounded-2xl transition"
              >
                Discard
              </button>
              <button
                onClick={handleSubmitReply}
                disabled={loading}
                className="flex-[2] py-4 bg-gray-900 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-black transition flex items-center justify-center gap-2 shadow-2xl shadow-gray-200 disabled:opacity-30"
              >
                {loading ? 'Processing...' : <><Send size={16} /> Finalize Response</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION MODAL INTEGRATION */}
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