'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
  FileText,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  Award,
  ArrowRight,
  School,
  Link as LinkIcon,
  Briefcase,
  Heart,
  Linkedin,
  Banknote,
  Users
} from 'lucide-react';

export default function ApplicationDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <ApplicationDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function ApplicationDetailInner({ meds, id }: { meds: any; id: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id || !meds?.onGetByID) return;
    const fetchData = async () => {
      onSetLoading(true);
      try {
        const res = await meds.onGetByID(id);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        onSetLoading(false);
      }
    };
    fetchData();
  }, [id, meds]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 animate-pulse">
           <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
           <div className="text-gray-400 font-medium">Loading Application...</div>
        </div>
      </div>
    );

  const application = data.applicationVo;
  const scholarship = data.scholarshipVo;
  const provider = scholarship.providerProfileVo;
  const banner = provider?.bannerUrl || scholarship?.bannerUrl;
  
  // Status Color Logic
  const getStatusColor = (status: string) => {
      switch(status?.toLowerCase()) {
          case 'approved': return 'bg-green-100 text-green-700 border-green-200';
          case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
          case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
          default: return 'bg-blue-100 text-blue-700 border-blue-200';
      }
  };

  const getStatusIcon = (status: string) => {
      switch(status?.toLowerCase()) {
          case 'approved': return <CheckCircle2 size={18} />;
          case 'rejected': return <XCircle size={18} />;
          case 'pending': return <Clock size={18} />;
          default: return <FileText size={18} />;
      }
  };

  // Helper to determine icon for attributes
  const getAttributeIcon = (key: string) => {
      const k = key.toLowerCase();
      if(k.includes('link') || k.includes('url')) return <LinkIcon size={16}/>;
      if(k.includes('intern') || k.includes('experience')) return <Briefcase size={16}/>;
      if(k.includes('hobbies') || k.includes('interest')) return <Heart size={16}/>;
      if(k.includes('linkedin')) return <Linkedin size={16}/>;
      return <FileText size={16}/>;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans">
      
      {/* 1. HERO / HEADER SECTION */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* Scholarship Context */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium uppercase tracking-wide">
                        <Building2 size={16} /> Application for Scholarship
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {scholarship.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        <span className="flex items-center gap-1.5"><School size={16}/> {scholarship.university}</span>
                        <span className="hidden md:inline text-gray-300">|</span>
                        <span className="flex items-center gap-1.5"><Globe size={16}/> {scholarship.country}</span>
                    </div>
                </div>

                {/* Status Badge */}
                <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold shadow-sm ${getStatusColor(data.status)}`}>
                    {getStatusIcon(data.status)}
                    <span className="uppercase tracking-wide text-sm">{data.status || 'Unknown Status'}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Applicant Data & Submission (2/3) */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Applicant Snapshot Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2">
                            <User size={18} className="text-blue-600"/> Applicant Profile
                        </h2>
                        <button 
                            onClick={() => router.push(`/profile/${application.userId}/Applicant`)}
                            className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                        >
                            View Full Profile <ArrowRight size={14}/>
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="flex items-start gap-5">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                                {application.fullName?.[0] || 'U'}
                            </div>
                            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{application.fullName}</h3>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                        <Mail size={14}/> {application.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                        <Phone size={14}/> {application.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                        <MapPin size={14}/> {application.address}, {application.nationality}
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-100">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Major</span>
                                        <span className="font-medium text-gray-900 text-right">{application.major}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">GPA</span>
                                        <span className="font-bold text-emerald-600">{application.gpa}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">School</span>
                                        <span className="font-medium text-gray-900 text-right truncate max-w-[150px]" title={application.schoolName}>{application.schoolName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Skills & Extras */}
                        <div className="mt-6 pt-6 border-t border-gray-100 grid md:grid-cols-2 gap-6">
                             <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {application.skills ? (
                                        application.skills.split(',').map((s:string, i:number) => (
                                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-medium border border-blue-100">
                                                {s.trim()}
                                            </span>
                                        ))
                                    ) : <span className="text-sm text-gray-500">None listed</span>}
                                </div>
                             </div>
                             <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Achievements</p>
                                <p className="text-sm text-gray-700">{application.achievements || 'None listed'}</p>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Additional Attributes (New Section) */}
                {application.applicationAttributes?.length > 0 && (
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                         <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Additional Details</h3>
                         <div className="grid md:grid-cols-2 gap-4">
                             {application.applicationAttributes.map((attr: any) => (
                                 <div key={attr.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                     <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs font-bold uppercase">
                                         {getAttributeIcon(attr.key)}
                                         {attr.key.replace(/([A-Z])/g, ' $1').trim()} 
                                     </div>
                                     <div className="text-sm font-medium text-gray-900 break-words">
                                         {attr.value.startsWith('http') ? (
                                             <a href={attr.value} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                                                 {attr.value} <LinkIcon size={12}/>
                                             </a>
                                         ) : attr.value}
                                     </div>
                                     {attr.note && <p className="text-xs text-gray-400 mt-1 italic">{attr.note}</p>}
                                 </div>
                             ))}
                         </div>
                     </div>
                )}

                {/* Essays Section */}
                <div className="space-y-6">
                    <EssayCard 
                        title="Motivation Letter" 
                        icon={<Award size={20} className="text-amber-500"/>} 
                        content={application.motivation} 
                    />
                    <EssayCard 
                        title="Personal Statement" 
                        icon={<FileText size={20} className="text-indigo-500"/>} 
                        content={application.personalStatement} 
                    />
                </div>
                
            </div>

            {/* RIGHT COLUMN: Scholarship & Provider Sidebar (1/3) */}
            <div className="space-y-6">
                
                {/* Scholarship Snapshot */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                     <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                        <GraduationCap size={18} className="text-gray-400"/> Program Details
                     </h3>
                     
                     <div className="space-y-4">
                        <SidebarItem label="Study Level" value={scholarship.studyLevel} />
                        <SidebarItem label="Funding" value={scholarship.fundingAmount} highlight />
                        <SidebarItem label="Slots Available" value={scholarship.availableSlots} />
                        <SidebarItem label="Type" value={scholarship.scholarshipType} />
                        
                        <div className="pt-2 border-t border-gray-100"></div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Start Date</p>
                                <p className="text-sm font-medium">{scholarship.startDate ? new Date(scholarship.startDate).toLocaleDateString() : '—'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">End Date</p>
                                <p className="text-sm font-medium">{scholarship.endDate ? new Date(scholarship.endDate).toLocaleDateString() : '—'}</p>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Requirements Check */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                     <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-gray-400"/> Requirements
                     </h3>
                     <SidebarItem label="Min GPA" value={scholarship.gpaRequirement || 'N/A'} />
                     <SidebarItem label="Language" value={scholarship.languageRequirement || 'N/A'} />
                     <div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Target Fields</p>
                        <p className="text-sm text-gray-700 leading-snug">{scholarship.fields || 'All Fields'}</p>
                     </div>
                </div>

                {/* Provider Mini Card */}
                {provider && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                         <div className="flex items-center gap-3 mb-3">
                             {provider.logoUrl ? (
                                <Image src={provider.logoUrl} width={40} height={40} alt="Logo" className="rounded border p-1" />
                             ) : (
                                <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                    {provider.organizationName?.[0]}
                                </div>
                             )}
                             <div className="min-w-0">
                                 <p className="text-xs text-gray-400 font-bold uppercase">Provider</p>
                                 <p className="font-bold text-gray-900 truncate" title={provider.organizationName}>
                                    {provider.organizationName}
                                 </p>
                             </div>
                         </div>
                         
                         {/* Contacts Preview */}
                         {provider.providerContactDtos?.length > 0 && (
                             <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
                                 <p className="font-semibold">{provider.providerContactDtos[0].contactName}</p>
                                 <p className="text-xs text-gray-500">{provider.providerContactDtos[0].email}</p>
                             </div>
                         )}

                         <button 
                             onClick={() => router.push(`/profile/${provider.id}/Provider`)}
                             className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition"
                         >
                             View Organization
                         </button>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Sub Components --------------------------- */

function EssayCard({ title, icon, content }: { title: string; icon: any; content: string }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                {icon} {title}
            </h3>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {content || "No content provided."}
            </div>
        </div>
    )
}

function SidebarItem({ label, value, highlight }: { label: string; value: any; highlight?: boolean }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{label}</span>
            <span className={`text-sm font-medium ${highlight ? 'text-emerald-600 font-bold' : 'text-gray-900'}`}>
                {value || '—'}
            </span>
        </div>
    )
}