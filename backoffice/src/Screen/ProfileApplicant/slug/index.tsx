'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';
import { 
  User, 
  MapPin, 
  Phone, 
  Flag, 
  GraduationCap, 
  Award, 
  Code2, 
  Target, // For Career Goals
  Microscope, // For Research
  Activity, // For Student Activities
  Compass, // For Intentions
  CalendarDays,
  HeartPulse, // For Medical/Disabilities
  BookOpen
} from 'lucide-react';

export default function ApplicantProfileDetail() {
  const { id } = useParams();
  const idStr = Array.isArray(id) ? id[0] : id;
  const idFormat = idStr?.replace(/^STU-/, '') || '';

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => (
          <ApplicantProfileInner meds={meds} idFormat={idFormat} />
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}

function ApplicantProfileInner({
  meds,
  idFormat,
}: {
  meds: any;
  idFormat: string;
}) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!idFormat || !meds) return;

    const fetchData = async () => {
      onSetLoading(true);
      try {
        const res = await meds.onGetApplicantByID(idFormat);
        setData(res || {});
      } catch (error) {
        console.error(error);
      } finally {
        onSetLoading(false);
      }
    };

    fetchData();
  }, [idFormat, meds]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 animate-pulse">
           <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
           <div className="text-gray-400 font-medium">Loading Applicant Profile...</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full mx-auto space-y-6">
        <ProfileHeader applicant={data} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Main Academic & Career Info (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
                {/* 1. Future Intentions (Important for Matching) */}
                <IntentionsCard intentions={data.intentions} />

                {/* 2. Education History */}
                <EducationCard history={data.educationHistories} />

                {/* 3. Research & Career Goals */}
                <CareerResearchCard applicant={data} />

                {/* 4. Extracurriculars */}
                <ActivitiesCard applicant={data} />

                 {/* 5. Certificates */}
                 <CertificatesCard certificates={data.certificates} />
            </div>

            {/* Right Column: Skills & Personal Details (1/3 width) */}
            <div className="space-y-6">
                <SkillsCard skills={data.skills} />
                <PersonalDetailsCard applicant={data} />
                <AdditionalInfoCard applicant={data} />
            </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- 1. PROFILE HEADER ----------------------------- */
function ProfileHeader({ applicant }: { applicant: any }) {
    const initials = `${applicant.firstName?.[0] || ''}${applicant.lastName?.[0] || ''}`.toUpperCase();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-600 relative">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>
            
            <div className="px-8 pb-8 relative">
                <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 gap-6">
                    <div className="h-28 w-28 rounded-full ring-4 ring-white bg-gray-100 flex items-center justify-center shadow-md text-3xl font-bold text-gray-500 shrink-0">
                        {initials || <User size={40} />}
                    </div>

                    <div className="flex-1 min-w-0 pt-2 md:pt-0 pb-2">
                        <h1 className="text-3xl font-bold text-gray-900 truncate">
                            {applicant.firstName} {applicant.lastName}
                        </h1>
                        <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                            <MapPin size={16} />
                            {applicant.hometown || 'Unknown Location'}
                        </p>
                    </div>

                    <div className="mb-2 md:mb-4 bg-emerald-50 border border-emerald-100 px-5 py-3 rounded-xl flex flex-col items-center">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Overall GPA</span>
                        <span className="text-2xl font-extrabold text-emerald-700">{applicant.overallGpa || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ----------------------------- 2. INTENTIONS CARD (NEW) ----------------------------- */
function IntentionsCard({ intentions }: { intentions: any[] }) {
    if (!intentions || intentions.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 border-l-4 border-l-blue-500">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Compass size={20} /></div>
                <h2 className="text-lg font-bold text-gray-900">Future Intentions</h2>
            </div>
            
            <div className="space-y-4">
                {intentions.map((item, idx) => (
                    <div key={item.id || idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{item.intendedInstitution}</h3>
                                <p className="text-blue-600 font-medium">{item.intendedMajorName}</p>
                            </div>
                            <span className="px-3 py-1 bg-white border rounded-full text-xs font-bold text-gray-600 uppercase">
                                {item.degreeType}
                            </span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <MapPin size={14}/> {item.intendedState}, {item.intendedCountry}
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays size={14}/> Start: {new Date(item.expectedStartDate).getFullYear()}
                            </div>
                        </div>
                        {item.notes && (
                            <p className="mt-3 text-sm text-gray-500 italic">"{item.notes}"</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ----------------------------- 3. EDUCATION CARD (UPDATED) ----------------------------- */
function EducationCard({ history }: { history: any[] }) {
    if (!history || history.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><GraduationCap size={20} /></div>
                <h2 className="text-lg font-bold text-gray-900">Education History</h2>
            </div>

            <div className="space-y-6 pl-2">
                {history.map((edu, idx) => (
                    <div key={edu.id || idx} className="relative pl-6 border-l-2 border-gray-100 last:border-0">
                        <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm"></div>
                        
                        <div className="space-y-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-base font-bold text-gray-900">{edu.institutionName}</h3>
                                <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600">{edu.degreeType}</span>
                            </div>
                            <p className="text-sm font-semibold text-emerald-600">{edu.majorName} ({edu.majorCategory})</p>
                            
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <span className="text-sm text-gray-600">GPA: <b className="text-gray-900">{edu.gpa}</b></span>
                                <span className="text-sm text-gray-600">Rank: <b className="text-gray-900">{edu.classRank}</b></span>
                                <span className="text-sm text-gray-600">Class Size: {edu.classSize}</span>
                                <span className="text-sm text-gray-600">Graduation: {edu.graduationYear}</span>
                            </div>
                            
                            {edu.notes && <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded">Note: {edu.notes}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ----------------------------- 4. CAREER & RESEARCH (NEW) ----------------------------- */
function CareerResearchCard({ applicant }: { applicant: any }) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                 <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-purple-50 rounded text-purple-600"><Target size={18} /></div>
                    <h3 className="font-bold text-gray-900">Career Goals</h3>
                 </div>
                 <p className="text-gray-700 text-sm leading-relaxed">{applicant.careerGoals || 'Not specified'}</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                 <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-rose-50 rounded text-rose-600"><Microscope size={18} /></div>
                    <h3 className="font-bold text-gray-900">Research Exp.</h3>
                 </div>
                 <p className="text-gray-700 text-sm leading-relaxed">{applicant.researchExperience || 'None'}</p>
            </div>
        </div>
    )
}

/* ----------------------------- 5. ACTIVITIES CARD (NEW) ----------------------------- */
function ActivitiesCard({ applicant }: { applicant: any }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Activity size={20} /></div>
                <h2 className="text-lg font-bold text-gray-900">Extracurricular Activities</h2>
            </div>
            
            <div className="space-y-4">
                <ActivityRow label="Student Organizations" value={applicant.organizationsJoined} />
                <ActivityRow label="Sports" value={applicant.sportsParticipated} />
                <ActivityRow label="Hobbies / Interests" value={applicant.favoriteActivities} />
                <ActivityRow label="Other Activities" value={applicant.studentActivities} />
            </div>
        </div>
    )
}

function ActivityRow({ label, value }: { label: string, value: string }) {
    if (!value || value === "None") return null;
    return (
        <div>
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{label}</p>
            <div className="flex flex-wrap gap-2">
                {value.split(',').map((v, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700">
                        {v.trim()}
                    </span>
                ))}
            </div>
        </div>
    )
}

/* ----------------------------- 6. CERTIFICATES CARD ----------------------------- */
function CertificatesCard({ certificates }: { certificates: any[] }) {
    if (!certificates || certificates.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Award size={20} /></div>
                <h2 className="text-lg font-bold text-gray-900">Certifications</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {certificates.map((cert, idx) => (
                    <div key={cert.id || idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-900">{cert.certificateName}</h3>
                            <span className="text-xs bg-white border px-2 py-0.5 rounded shadow-sm font-bold">{cert.score}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 uppercase">Issued by {cert.issuedBy}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ----------------------------- 7. SKILLS CARD ----------------------------- */
function SkillsCard({ skills }: { skills: any[] }) {
    if (!skills || skills.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Code2 size={20} /></div>
                <h2 className="text-lg font-bold text-gray-900">Skills</h2>
            </div>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                    <div 
                        key={skill.id || idx} 
                        className="group relative flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100 transition-colors"
                    >
                        <span className="text-sm font-semibold">{skill.skillName}</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {skill.proficiencyLevel} • {skill.yearsExperience} yrs exp
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ----------------------------- 8. PERSONAL DETAILS ----------------------------- */
function PersonalDetailsCard({ applicant }: { applicant: any }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-base font-bold text-gray-900">Personal Details</h2>
            </div>
            
            <div className="p-6 space-y-5">
                <DetailRow icon={<User size={16}/>} label="Full Name" value={`${applicant.firstName} ${applicant.lastName}`} />
                <DetailRow icon={<Phone size={16}/>} label="Phone Number" value={applicant.phoneNumber} />
                <DetailRow icon={<Flag size={16}/>} label="Citizenship" value={applicant.citizenshipStatus} />
                <DetailRow icon={<MapPin size={16}/>} label="Hometown" value={applicant.hometown} />
                
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 mt-2">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Ethnicity</p>
                        <p className="text-sm font-medium text-gray-900">{applicant.ethnicity || '—'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Race</p>
                        <p className="text-sm font-medium text-gray-900">{applicant.race || '—'}</p>
                    </div>
                </div>
                <div>
                     <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Religion</p>
                     <p className="text-sm font-medium text-gray-900">{applicant.religion || '—'}</p>
                </div>
            </div>
        </div>
    )
}

/* ----------------------------- 9. ADDITIONAL INFO (SENSITIVE) ----------------------------- */
function AdditionalInfoCard({ applicant }: { applicant: any }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <HeartPulse size={16} className="text-gray-400" />
                <h2 className="text-base font-bold text-gray-900">Additional Info</h2>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Military Family</p>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${applicant.militaryFamilyHistory ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {applicant.militaryFamilyHistory ? 'Yes' : 'No'}
                    </span>
                </div>
                 <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Disabilities</p>
                    <p className="text-sm text-gray-700">{applicant.disabilities}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Medical Conditions</p>
                    <p className="text-sm text-gray-700">{applicant.medicalConditions}</p>
                </div>
            </div>
        </div>
    )
}

function DetailRow({ icon, label, value }: { icon: any, label: string, value: any }) {
    return (
        <div className="flex items-center gap-3">
            <div className="text-gray-400 shrink-0">{icon}</div>
            <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">{label}</p>
                <div className="text-sm font-medium text-gray-900 truncate">{value || '—'}</div>
            </div>
        </div>
    )
}