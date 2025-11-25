'use client';

import { Check, Eye, FolderKanban, MessageSquare, X } from 'lucide-react';
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

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
      })();
    }
  }, [id]);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return alert('Please enter a reply');
    try {
      // Gọi API gửi phản hồi
      await meds.onReply(id, replyText);
      window.location.reload();
      setIsModalOpen(false);
      setReplyText('');
    } catch (err) {
      console.error(err);
      alert('Failed to send reply');
    }
  };

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">Loading report details...</div>
    );

  return (
    <div className="w-[95%]  mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-100 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <MessageSquare size={26} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
        </div>

        <span
          className={`px-4 py-1.5 rounded-xl text-sm font-semibold shadow-sm ${
            data.status === 'PENDING'
              ? 'bg-yellow-100 text-yellow-700'
              : data.status === 'RESOLVED'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
          }`}
        >
          {data.status}
        </span>
      </div>

      {/* BUTTON PHẢN HỒI */}
      {!data.isRead && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Reply
          </button>
        </div>
      )}

      {/* BASIC INFO */}
      <div className="flex flex-col gap-4">
        <HorizontalRow label="Report ID" value={data.id} />
        <HorizontalRow label="Title" value={data.title} />

        {/* COMMENT nổi bật */}
        <div className="flex items-start gap-5">
          <p className="text-sm font-semibold text-gray-700 w-40 pt-1">Report Content</p>
          <div className="flex-1 bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {data.comment || '—'}
            </p>
          </div>
        </div>

        <HorizontalRow label="User ID" value={data.userId} />
        <HorizontalRow label="Read Status" value={data.isRead ? 'Read' : 'Unread'} />
      </div>
      {data.response && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center gap-2">
            <Eye size={20} className="text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Response</h2>
          </div>

          <div className="flex items-start gap-5">
            <p className="text-sm font-medium text-gray-600 w-40 pt-1">Response Content</p>
            <div className="flex-1 bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {data.response || '—'}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* CATEGORY */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center gap-2">
          <FolderKanban size={20} className="text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Category</h2>
        </div>

        <HorizontalRow label="Name" value={data.category?.name} />
        <HorizontalRow label="Type" value={data.category?.type} />
        <div className="flex items-start gap-5">
          <p className="text-sm font-medium text-gray-600 w-40 pt-1">Description</p>
          <div className="flex-1 bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {data.category?.description || '—'}
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reply to Report</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-blue-200 focus:border-blue-400"
              rows={5}
              placeholder="Type your reply here..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition flex items-center gap-1"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSubmitReply}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
              >
                <Check size={16} /> Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* HORIZONTAL ROW */
function HorizontalRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-start gap-5">
      <p className="text-sm font-medium text-gray-600 w-40 pt-1">{label}</p>
      <p className="text-gray-900 font-semibold flex-1">{value || '—'}</p>
    </div>
  );
}
