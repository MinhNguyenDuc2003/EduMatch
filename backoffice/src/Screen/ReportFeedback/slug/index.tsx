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
  X
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (!replyText.trim()) return alert('Please enter a reply');
    setLoading(true);
    try {
      await meds.onReply(id, replyText);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to send reply');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
          <div className="text-gray-400 font-medium">Loading Ticket...</div>
        </div>
      </div>
    );

  const { customer, category } = data;
  const isPending = data.status === 'PENDING';

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center">
      <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: TICKET CONTENT (2/3) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <span>Ticket #{data.id}</span>
                <span>•</span>
                <span className={data.isRead ? 'text-gray-500' : 'text-blue-600 font-bold'}>
                  {data.isRead ? 'Read' : 'Unread'}
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${isPending
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-green-50 text-green-700 border-green-200'
                }`}>
                {data.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h1>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                <Tag size={12} /> {category?.type}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                {category?.name}
              </span>
            </div>
          </div>

          {/* The Report (User Issue) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <MessageSquare size={20} className="text-gray-400" />
              <h3 className="font-bold text-gray-900">Report Description</h3>
            </div>
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
              {data.comment}
            </div>
            <p className="mt-6 text-sm text-gray-400 italic">
              Category description: {category?.description}
            </p>
          </div>

          {/* The Response (Thread) */}
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
                  <p className="text-xs text-gray-500">Resolution provided</p>
                </div>
              </div>
              <p className="text-gray-800 bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                {data.response}
              </p>
            </div>
          ) : (
            // Reply Action Area
            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 p-8 text-center">
              <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <MessageSquare size={20} className="text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium mb-1">No response yet</h3>
              <p className="text-gray-500 text-sm mb-6">This ticket is currently pending an admin response.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-lg shadow-blue-200"
              >
                Reply to Ticket
              </button>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: SIDEBAR INFO (1/3) */}
        <div className="space-y-6">

          {/* Customer Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-slate-700 to-slate-800"></div>


            {/* Header */}
            <div className="relative h-20 bg-gradient-to-r from-slate-700 to-slate-800">
              {/* Avatar */}
              <div className="absolute -bottom-10 left-6">
                <div className="h-20 w-20 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600">
                  {customer?.firstName?.[0] || <User />}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 relative">

              <div className="mt-12 ">
                <h2 className="text-lg font-bold text-gray-900 ">{customer?.firstName} {customer?.lastName}</h2>
                <p className="text-sm text-gray-500 font-medium">@{customer?.username}</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${customer?.email}`} className="hover:text-blue-600 transition">
                      {customer?.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Ticket Status</h3>
            <div className="flex items-center gap-3">
              {isPending ? (
                <AlertCircle className="text-amber-500" size={24} />
              ) : (
                <Check className="text-green-500" size={24} />
              )}
              <div>
                <p className="font-bold text-gray-900">{isPending ? 'Pending Review' : 'Resolved'}</p>
                <p className="text-xs text-gray-500">
                  {isPending ? 'Needs attention' : 'No further action required'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* REPLY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Compose Reply</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Replying to:</p>
              <p className="text-sm text-gray-800 line-clamp-2 italic">
                &quot;{data.comment}&quot;
              </p>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition resize-none text-gray-700"
              rows={6}
              placeholder="Type your official response here..."
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReply}
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70"
              >
                {loading ? 'Sending...' : <><Send size={16} /> Send Reply</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}