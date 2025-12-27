'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import Image from 'next/image';
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  User,
  GraduationCap,
  Building2,
  Quote,
  X,
  AlertTriangle
} from 'lucide-react';

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

const NotificationModal = ({ isOpen, type, title, message, onClose, onConfirm }: NotificationModalProps) => {
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={type !== 'confirm' ? onClose : undefined} />
      <div className={`relative bg-white w-full max-w-sm rounded-3xl shadow-2xl border-t-8 ${current.borderColor} p-8 text-center animate-in fade-in zoom-in duration-200`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>
        <div className="flex flex-col items-center">
          <div className="mb-4">{current.icon}</div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">{message}</p>
          <div className="flex w-full gap-3">
            {type === 'confirm' ? (
              <>
                <button onClick={onClose} className="flex-1 py-3 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95">
                  Cancel
                </button>
                <button onClick={onConfirm} className={`flex-1 py-3 rounded-2xl font-bold text-white shadow-lg ${current.btnColor} transition-all active:scale-95`}>
                  Confirm
                </button>
              </>
            ) : (
              <button onClick={onClose} className={`w-full py-3 rounded-2xl font-bold text-white shadow-lg ${current.btnColor} transition-all active:scale-95`}>
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
  const router = useRouter();

  // Notification Modal State
  const [notif, setNotif] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'confirm',
    title: '',
    message: '',
    onConfirm: () => { },
  });

  const closeNotif = () => setNotif(prev => ({ ...prev, isOpen: false }));

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

  /* --- LOGIC: VERIFY PROCESS --- */
  const handleVerifyProcess = async () => {
    closeNotif();
    setLoading(true);
    try {
      const res = await meds.onVerify(id);
      if (res) {
        setData(res);
        setVerified(true);
        setNotif({
          isOpen: true,
          type: 'success',
          title: 'Case Study Verified!',
          message: 'The story has been marked as authentic and is now trusted by the community.',
          onConfirm: () => { }
        });
      }
    } catch (err) {
      setNotif({
        isOpen: true,
        type: 'error',
        title: 'Verification Failed',
        message: 'Could not update the status at this time. Please try again later.',
        onConfirm: () => { }
      });
    } finally {
      setLoading(false);
    }
  };

  const onVerifyClick = () => {
    setNotif({
      isOpen: true,
      type: 'confirm',
      title: 'Verify this story?',
      message: 'This will confirm the authenticity of this Success Story for all users.',
      onConfirm: handleVerifyProcess
    });
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
          <div className="text-gray-400 font-medium">Loading Story...</div>
        </div>
      </div>
    );

  const { profileVo, scholarshipVo, medias } = data;
  const heroImage = medias?.[0]?.url;

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">

        {/* Action Toolbar */}
        <div className="flex justify-end items-center mb-8">
          <button
            onClick={onVerifyClick}
            disabled={verified || loading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95 ${verified
              ? 'bg-emerald-50 text-emerald-700 cursor-default border border-emerald-200'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
          >
            {verified ? <><ShieldCheck size={20} /> Verified Case Study</> : 'Verify This Story'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN: STORY CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold border border-indigo-100 uppercase tracking-tight">
                <Quote size={14} /> Success Story
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                {data.title || "My Scholarship Journey"}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <span className="text-gray-900 font-bold underline decoration-indigo-200 decoration-4">By {profileVo?.firstName} {profileVo?.lastName}</span>
                <span>•</span>
                <span>Created: {new Date(data.createdDate).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}</span>
              </div>
            </div>

            {heroImage && (
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image src={heroImage} alt="Success Story" fill className="object-cover" priority />
              </div>
            )}

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
              <article
                className="prose prose-lg prose-indigo max-w-none 
                        prose-headings:font-black prose-headings:text-gray-900 
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg
                        prose-strong:text-indigo-900 prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <User size={14} className="text-blue-500" /> The Achiever
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-100">
                  {profileVo?.firstName?.[0]}
                </div>
                <div>
                  <p className="font-black text-gray-900 text-xl">{profileVo?.firstName} {profileVo?.lastName}</p>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">{profileVo?.hometown}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-400 font-bold text-xs uppercase">Overall GPA</span>
                  <span className="font-black text-emerald-600 text-lg">{profileVo?.overallGpa}</span>
                </div>
                <div className="py-2">
                  <span className="text-gray-400 font-bold text-xs uppercase block mb-2">Career Goal</span>
                  <p className="font-bold text-gray-800 text-sm leading-snug">{profileVo?.careerGoals}</p>
                </div>
                <div className="pt-2">
                  <span className="text-gray-400 font-bold text-xs uppercase block mb-3">Interests</span>
                  <div className="flex flex-wrap gap-2">
                    {profileVo?.favoriteActivities?.split(',').map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-100">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/profileApplicant/${profileVo?.id}`)}
                  className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-100 transition active:scale-95"
                >
                  VIEW FULL PROFILE
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-10 rotate-12">
                <GraduationCap size={140} />
              </div>
              <h3 className="text-xs font-black text-blue-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldCheck size={14} /> Awarded Scholarship
              </h3>
              <h2 className="text-2xl font-black mb-3 leading-tight tracking-tight">{scholarshipVo?.title}</h2>
              <p className="text-blue-200 text-sm font-bold mb-8 italic">{scholarshipVo?.university}</p>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <p className="text-[10px] text-blue-200 uppercase font-black tracking-widest mb-1">Funding Amount</p>
                <p className="text-2xl font-black text-white">{scholarshipVo?.fundingAmount}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Building2 size={14} /> Organization
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 text-indigo-600 font-black">
                  {scholarshipVo?.providerProfileVo?.organizationName?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-gray-900 text-sm truncate uppercase tracking-tight">
                    {scholarshipVo?.providerProfileVo?.organizationName}
                  </p>
                  <p className="text-xs text-gray-400 font-bold">{scholarshipVo?.providerProfileVo?.country}</p>
                </div>
              </div>
              <button
                onClick={() => router.push(`/profileProvider/${scholarshipVo?.providerProfileVo?.id}`)}
                className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-black rounded-xl border border-gray-200 transition tracking-widest uppercase"
              >
                Visit Organization
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATION MODAL SYSTEM */}
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