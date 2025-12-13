'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';
import {
  MapPin,
  Calendar,
  School,
  Banknote,
  Users,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Building2,
  Globe,
  Clock,
  ArrowRight,
  Languages,
  User,
  Briefcase,
  FileBarChart,
  ImageIcon
} from 'lucide-react';

export default function ScholarshipDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <ScholarshipDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function ScholarshipDetailInner({ meds, id }: { meds: any; id: string }) {
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
           <div className="text-gray-400 font-medium">Loading Scholarship Details...</div>
        </div>
      </div>
    );

  // Extract Data
  const mediaList = data.scholarshipMedias || [];
  const banner = mediaList.length > 0 ? mediaList[0].url : null;
  const gallery = mediaList.length > 1 ? mediaList.slice(1) : [];
  const provider = data.providerProfileVo;

  // Format Date Helper
  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'TBA';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans">
      {/* 1. HERO SECTION */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="w-full mx-auto space-y-6">
          {/* Banner Image */}
          <div className="relative w-full h-64 md:h-80 overflow-hidden bg-gray-900">
             {banner ? (
                <Image
                  src={banner}
                  alt={data.title}
                  fill
                  className="object-cover opacity-90"
                  priority
                />
             ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-800 to-indigo-900" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          
          {/* Title Card */}
          <div className="relative -mt-24 px-4 sm:px-6 lg:px-8 pb-8">
            <div className="w-full mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start justify-between">
                <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap gap-2 text-sm font-medium">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                            <School size={16} /> {data.studyLevel}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                            <Globe size={16} /> {data.country}
                        </span>
                        {data.scholarshipType && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                                <GraduationCap size={16} /> {data.scholarshipType}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        {data.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 font-medium text-lg">
                        <Building2 size={20} className="text-gray-400" />
                        {data.university}
                    </div>
                </div>

                {/* <div className="flex flex-col items-end gap-4 min-w-[200px]">
                    <div className="text-right">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Funding Amount</p>
                        <p className="text-3xl font-extrabold text-emerald-600">{data.fundingAmount}</p>
                    </div>
                    <button className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5">
                        Apply Now
                    </button>
                </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN (Details) */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Description */}
                <Section title="Program Overview" icon={<BookOpen size={20} className="text-blue-600"/>}>
                    <p className="font-medium text-gray-900 mb-2">{data.shortDescription}</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {data.description}
                    </p>
                </Section>

                {/* Benefits */}
                <Section title="Scholarship Benefits" icon={<Banknote size={20} className="text-emerald-600"/>}>
                    <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 text-emerald-900 leading-relaxed">
                        {data.benefits}
                    </div>
                </Section>

                {/* Detailed Requirements Grid */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                         <CheckCircle2 size={20} className="text-indigo-600"/> Eligibility & Requirements
                    </h2>
                    
                    {/* General Text Requirement */}
                    <p className="text-gray-700 mb-6 pb-6 border-b border-gray-100">
                        {data.requirements}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Test Scores */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Standardized Tests</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <ScoreBadge label="SAT" score={data.requiredSatScore} />
                                <ScoreBadge label="ACT" score={data.requiredActScore} />
                                <ScoreBadge label="TOEFL" score={data.requiredToeflScore} />
                                <ScoreBadge label="IELTS" score={data.requiredIeltsScore} />
                            </div>
                        </div>

                        {/* Demographics & Background */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Candidate Profile</h3>
                            <div className="space-y-3">
                                <RequirementRow icon={<User size={16}/>} label="Age Range" value={`${data.minAge} - ${data.maxAge} years`} />
                                <RequirementRow icon={<Users size={16}/>} label="Gender" value={data.genderRequirement} />
                                <RequirementRow icon={<Briefcase size={16}/>} label="Work Exp." value={data.requiredWorkExperienceYears > 0 ? `${data.requiredWorkExperienceYears} Years` : "None"} />
                                <RequirementRow icon={<FileBarChart size={16}/>} label="Class Rank" value={data.requiredClassRankPercentile ? `Top ${data.requiredClassRankPercentile}%` : "N/A"} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery (If multiple images exist) */}
                {gallery.length > 0 && (
                    <Section title="Program Gallery" icon={<ImageIcon size={20} className="text-purple-600"/>}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {gallery.map((media: any) => (
                                <div key={media.id} className="relative h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition">
                                    <Image 
                                        src={media.url} 
                                        alt="Gallery" 
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Provider Card */}
                {provider && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-24 bg-gray-100 relative">
                             {provider.bannerUrl && (
                                 <Image src={provider.bannerUrl} alt="Cover" fill className="object-cover opacity-50"/>
                             )}
                        </div>
                        <div className="px-6 relative">
                            <div className="flex justify-between items-end -mt-10 mb-4">
                                <div className="h-20 w-20 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden relative">
                                    {provider.logoUrl ? (
                                        <Image src={provider.logoUrl} alt="Logo" fill className="object-contain p-1"/>
                                    ) : (
                                        <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
                                            {provider.organizationName?.[0]}
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={() => router.push(`/profile/${provider.id}/Provider`)}
                                    className="text-sm text-blue-600 font-bold hover:underline flex items-center gap-1 mb-1"
                                >
                                    View Organization <ArrowRight size={14}/>
                                </button>
                            </div>

                            <div className="pb-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-bold text-gray-900">{provider.organizationName}</h3>
                                    {provider.verified && <CheckCircle2 size={18} className="text-blue-500 fill-blue-50" />}
                                </div>
                                <p className="text-sm text-gray-500 font-medium mb-3">{provider.organizationType} • Est. {provider.yearEstablished}</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{provider.description}</p>
                                
                                <div className="grid md:grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Contacts</p>
                                        {provider.providerContactDtos?.map((c: any) => (
                                            <div key={c.id} className="mb-2 last:mb-0">
                                                <p className="font-semibold text-gray-900">{c.contactName}</p>
                                                <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">{c.email}</a>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Address</p>
                                        <p className="text-gray-700">{provider.addressSummary}</p>
                                        <div className="mt-2">
                                            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100 font-medium">
                                                {provider.accreditation}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN (Sidebar Stats) */}
            <div className="space-y-6">
                
                {/* Timeline Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                        <Clock size={18} className="text-gray-400"/> Timeline
                    </h3>
                    
                    <SidebarItem 
                        icon={<Calendar size={18} />} 
                        label="Start Date" 
                        value={formatDate(data.startDate)}
                    />
                    <SidebarItem 
                        icon={<Clock size={18} />} 
                        label="End Date" 
                        value={formatDate(data.endDate)}
                        highlight
                    />
                    <SidebarItem 
                        icon={<Users size={18} />} 
                        label="Available Slots" 
                        value={data.availableSlots || 'Unlimited'} 
                    />
                </div>

                {/* Academic Criteria Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                        <GraduationCap size={18} className="text-gray-400"/> Academic Criteria
                    </h3>
                    
                    <SidebarItem 
                        icon={<BookOpen size={18} />} 
                        label="GPA Requirement" 
                        value={data.gpaRequirement ? `Min. ${data.gpaRequirement} / 4.0` : 'Not specified'} 
                    />
                     <SidebarItem 
                        icon={<Languages size={18} />} 
                        label="Language Req." 
                        value={data.languageRequirement || 'Not specified'} 
                    />
                    
                    <div className="pt-2">
                        <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Target Major</p>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800">
                            {data.requiredMajor}
                        </div>
                    </div>

                    <div className="pt-1">
                        <p className="text-xs text-gray-400 font-semibold uppercase mb-2">Fields</p>
                        <div className="flex flex-wrap gap-2">
                            {data.fields ? (
                                data.fields.split(',').map((f: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                                        {f.trim()}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">All fields</span>
                            )}
                        </div>
                    </div>
                </div>

                 {/* Location Map Placeholder */}
                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Location</p>
                        <p className="text-gray-900 font-medium">{data.country}</p>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Sub Components --------------------------- */

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
      <div className="prose prose-blue max-w-none text-gray-600">
          {children}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, value, highlight }: { icon: any; label: string; value: any; highlight?: boolean }) {
    return (
        <div className="flex items-start gap-3">
            <div className={`mt-0.5 shrink-0 ${highlight ? 'text-red-500' : 'text-gray-400'}`}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">{label}</p>
                <p className={`font-medium ${highlight ? 'text-red-600' : 'text-gray-900'}`}>
                    {value}
                </p>
            </div>
        </div>
    )
}

function ScoreBadge({ label, score }: { label: string, score: number }) {
    const hasScore = score && score > 0;
    return (
        <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${hasScore ? 'bg-gray-50 border-gray-200' : 'bg-gray-50/50 border-transparent'}`}>
            <span className="text-xs font-bold text-gray-500">{label}</span>
            <span className={`text-sm font-bold ${hasScore ? 'text-gray-900' : 'text-gray-400'}`}>
                {hasScore ? score : '—'}
            </span>
        </div>
    )
}

function RequirementRow({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-gray-400 shrink-0">{icon}</div>
            <div className="flex-1 flex justify-between items-center">
                 <span className="text-sm text-gray-600 font-medium">{label}</span>
                 <span className="text-sm text-gray-900 font-bold">{value || 'Any'}</span>
            </div>
        </div>
    )
}