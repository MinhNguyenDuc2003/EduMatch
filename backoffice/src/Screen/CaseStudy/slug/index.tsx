'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { CheckCircle, XCircle } from 'lucide-react';

export default function CaseStudyDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <CaseStudyDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function CaseStudyDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        setLoading(true);
        try {
          const res = await meds.onGetByID(id);
          setData(res);
          setVerified(!!res.verified);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, meds]);

  const handleVerifyConfirm = async () => {
    setLoading(true);
    try {
      const res = await meds.onVerify(id);
      setData(res);
      setVerified(true);
    } catch (err) {
      console.error("Verify failed", err);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (!data)
    return <div className="p-16 text-center text-gray-500 animate-pulse">Loading...</div>;

  return (
    <>
      <div className="w-[95%] mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md border border-gray-100 space-y-8">
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setShowConfirm(true)}
            disabled={verified || loading}
            className={`px-4 py-2 rounded-lg font-semibold text-white ${
              verified || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {verified ? 'Verified' : loading ? 'Processing...' : 'Verify'}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">
          Case Study Details
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <InfoRow label="ID" value={data.id} />
          <InfoRow label="Scholarship ID" value={data.scholarshipId} />
          <InfoRow label="User ID" value={data.userId} />
          <InfoRow label="Title" value={data.title} />

          {/* Verified */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Status</span>
            {verified ? (
              <span className="mt-1 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium w-max">
                <CheckCircle size={16} /> Verified
              </span>
            ) : (
              <span className="mt-1 inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium w-max">
                <XCircle size={16} /> Unverified
              </span>
            )}
          </div>

          <InfoRow
            label="Created Date"
            value={new Date(data.createdDate).toLocaleString()}
          />
          <InfoRow
            label="Updated Date"
            value={new Date(data.updatedDate).toLocaleString()}
          />
          <InfoRow label="Created By" value={data.createdBy} />
          <InfoRow label="Updated By" value={data.updatedBy} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Content</h2>
          <div
            className="prose max-w-none border p-5 rounded-xl bg-gray-50"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Verify</h2>
            <p className="text-gray-600">
              Are you sure you want to verify this Case Study?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleVerifyConfirm}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Yes, Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-900 font-medium mt-1">{value}</span>
    </div>
  );
}
