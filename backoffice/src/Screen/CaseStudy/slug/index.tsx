'use client';

import { useParams } from 'next/navigation';
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
  Calendar, 
  ArrowLeft,
  Quote
} from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
        
        {/* Navigation & Actions */}
        <div className="flex justify-end items-center mb-8">
          
            
            <button
                onClick={() => !verified && setShowConfirm(true)}
                disabled={verified || loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition shadow-sm ${
                    verified
                    ? 'bg-green-100 text-green-700 cursor-default border border-green-200'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
                {verified ? <><ShieldCheck size={18}/> Verified Case Study</> : 'Verify This Story'}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* LEFT COLUMN: STORY CONTENT */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Header */}
                <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100">
                        <Quote size={14} /> Success Story
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        {data.title || "My Scholarship Journey"}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span className="font-medium text-gray-900">By {profileVo?.firstName} {profileVo?.lastName}</span>
                        <span>•</span>
                        <span>{new Date().getFullYear()}</span> 
                    </div>
                </div>

                {/* Hero Image */}
                {heroImage && (
                    <div className="relative w-full h-[350px] rounded-2xl overflow-hidden shadow-sm">
                        <Image src={heroImage} alt="Success Story" fill className="object-cover" priority />
                    </div>
                )}

                {/* Content Body */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <article 
                        className="prose prose-lg prose-indigo max-w-none 
                        prose-headings:font-bold prose-headings:text-gray-900 
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-strong:text-indigo-900 prose-strong:font-semibold"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>

            </div>

            {/* RIGHT COLUMN: CONTEXT SIDEBAR */}
            <div className="space-y-6">
                
                {/* Student Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <User size={14}/> The Achiever
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                            {profileVo?.firstName?.[0]}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg">{profileVo?.firstName} {profileVo?.lastName}</p>
                            <p className="text-sm text-gray-500">{profileVo?.hometown}</p>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">GPA</span>
                            <span className="font-bold text-gray-900">{profileVo?.overallGpa}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Career Goal</span>
                            <span className="font-medium text-gray-900 text-right">{profileVo?.careerGoals}</span>
                        </div>
                        <div className="pt-2">
                            <span className="text-gray-500 block mb-1">Interests</span>
                            <div className="flex flex-wrap gap-1">
                                {profileVo?.favoriteActivities?.split(',').map((tag:string, i:number) => (
                                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scholarship Won Card */}
                <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10">
                        <GraduationCap size={100} />
                    </div>
                    
                    <h3 className="text-xs font-bold text-blue-200 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <GraduationCap size={14}/> Scholarship Won
                    </h3>
                    
                    <h2 className="text-xl font-bold mb-2 leading-tight">{scholarshipVo?.title}</h2>
                    <p className="text-blue-100 text-sm mb-4">{scholarshipVo?.university}, {scholarshipVo?.country}</p>
                    
                    <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                        <p className="text-xs text-blue-200 uppercase font-bold">Value</p>
                        <p className="text-lg font-bold text-white">{scholarshipVo?.fundingAmount}</p>
                    </div>
                </div>

                {/* Provider Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <Building2 size={14}/> Provided By
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                            {scholarshipVo?.providerProfileVo?.organizationName?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-sm truncate">{scholarshipVo?.providerProfileVo?.organizationName}</p>
                            <p className="text-xs text-gray-500">{scholarshipVo?.providerProfileVo?.country}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => router.push(`/profile/${scholarshipVo?.providerProfileVo?.id}/Provider`)}
                        className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline mt-2"
                    >
                        View Organization
                    </button>
                </div>

            </div>
        </div>
      </div>

      {/* VERIFY MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-center mb-4 text-green-600">
                <ShieldCheck size={48} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Verify Success Story?</h2>
            <p className="text-gray-600 text-center text-sm mb-6">
              Verifying this case study marks it as authentic and trustworthy for other students.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-200 transition"
              >
                Yes, Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}