'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';
import { 
  CheckCircle2, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Building2,
  Linkedin,
  User,
  ShieldCheck
} from 'lucide-react';

export default function ProviderProfileDetail() {
  const { id } = useParams();
  const idStr = Array.isArray(id) ? id[0] : id;
  const idFormat = idStr?.replace(/^PRO-/, '') || '';

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => (
          <ProviderProfileInner meds={meds} idFormat={idFormat} />
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}

function ProviderProfileInner({
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
        const res = await meds.onGetProviderByID(idFormat);
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
           <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
           <div className="text-gray-400 font-medium">Loading Organization Profile...</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full mx-auto space-y-6">
        {/* Header Section */}
        <ProviderHeader provider={data} meds={meds} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (Left - 2 Cols span) */}
          <div className="lg:col-span-2 space-y-6">
            <AboutSection provider={data} />
            <ContactsGrid contacts={data.providerContactDtos} />
          </div>

          {/* Sidebar Info (Right - 1 Col span) */}
          <div className="space-y-6">
            <QuickInfoCard provider={data} />
            <AccreditationCard provider={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- 1. HEADER HERO ----------------------------- */
function ProviderHeader({ provider, meds }: { provider: any; meds: any }) {
  const [verified, setVerified] = useState(provider.verified);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (verified) return;
    setLoading(true);
    try {
      const res = await meds.onUpdateProviderVerifyByID(provider.id);
      if (res?.data) {
        setVerified(true);
      }
    } catch (error) {
      console.error('Verify error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Tạo Avatar chữ cái đầu nếu không có ảnh logo
  const initials = provider.organizationName
    ?.split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Cover Background Pattern */}
      <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="px-8 pb-8 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-6">
          {/* Logo Box */}
          <div className="h-24 w-24 rounded-xl bg-white p-1 shadow-lg ring-1 ring-gray-100 flex items-center justify-center shrink-0">
             <div className="h-full w-full bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-2xl border border-blue-100">
               {initials}
             </div>
          </div>

          {/* Title Info */}
          <div className="flex-1 min-w-0 pt-2 mt-8 md:pt-0">
            <div className="flex items-center gap-2 mb-1">
               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 truncate mt-3">
                 {provider.organizationName}
                 
               </h1>
               {verified && (
                 <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                   <CheckCircle2 size={14} className="fill-blue-500 text-white" />
                   Verified
                 </span>
               )}
            </div>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <Building2 size={16} />
              {provider.organizationType}
            </p>
            {/* <p className="text-gray-500 font-medium flex items-center gap-2">
              <Building2 size={16} />
              {provider.createddate}
            </p> */}
          </div>

          {/* Action Button */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <button
              onClick={handleVerify}
              disabled={verified || loading}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm ${
                verified
                  ? 'bg-gray-100 text-gray-500 cursor-default border border-gray-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
              }`}
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : verified ? (
                <>
                  <ShieldCheck size={18} /> Account Verified
                </>
              ) : (
                'Verify Organization'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- 2. MAIN CONTENT (ABOUT) ----------------------------- */
function AboutSection({ provider }: { provider: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          Organization Overview
        </h3>
        <p className="text-gray-600 leading-relaxed text-base">
          {provider.description || 'No description provided.'}
        </p>
      </div>

      {provider.specialization && (
        <div className="pt-6 border-t border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
            Specialization
          </h4>
          <div className="flex flex-wrap gap-2">
            {provider.specialization.split(',').map((tag: string, idx: number) => (
              <span 
                key={idx} 
                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- 3. CONTACTS GRID ----------------------------- */
function ContactsGrid({ contacts }: { contacts: any[] }) {
  if (!contacts || contacts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 px-1">Key Representatives</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                 <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-gray-900 truncate">
                  {contact.contactName}
                </h4>
                <p className="text-sm text-blue-600 font-medium mb-2 truncate">
                  {contact.roleTitle}
                </p>
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone size={14} className="shrink-0" />
                    <span>{contact.phone}</span>
                  </div>
                  {contact.linkedinUrl && (
                    <a 
                      href={contact.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-[#0077b5] mt-1 transition-colors"
                    >
                      <Linkedin size={14} /> LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- 4. SIDEBAR (QUICK INFO) ----------------------------- */
function QuickInfoCard({ provider }: { provider: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-base font-bold text-gray-900">Contact & Location</h3>
      </div>
      <div className="p-6 space-y-5">
        
        {/* Website */}
        <InfoItem 
          icon={<Globe size={18} />}
          label="Website"
          value={
            <a href={provider.website} target="_blank" className="text-blue-600 hover:underline truncate block">
              {provider.website}
            </a>
          }
        />

        {/* Email */}
        <InfoItem 
          icon={<Mail size={18} />}
          label="Email Address"
          value={<span className="text-gray-700">{provider.email}</span>}
        />

        {/* Phone */}
        <InfoItem 
          icon={<Phone size={18} />}
          label="Phone Number"
          value={<span className="text-gray-700">{provider.phone}</span>}
        />

        {/* Established */}
        <InfoItem 
          icon={<Calendar size={18} />}
          label="Year Established"
          value={<span className="text-gray-900 font-medium">{provider.yearEstablished}</span>}
        />

         {/* Address */}
         <div className="flex gap-3 pt-2">
            <div className="mt-1 text-gray-400 shrink-0"><MapPin size={18} /></div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Headquarters</p>
              <p className="text-sm text-gray-700 leading-snug">
                {provider.addressSummary}
              </p>
              <p className="text-sm font-medium text-gray-900 mt-1">{provider.country}</p>
            </div>
         </div>

      </div>
    </div>
  );
}

function AccreditationCard({ provider }: { provider: any }) {
    if(!provider.accreditation) return null;
    
    return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
            <div className="flex items-start gap-3">
                <Award className="text-amber-600 shrink-0 mt-1" size={24} />
                <div>
                    <h3 className="text-amber-900 font-bold text-sm uppercase tracking-wide mb-1">Accreditation</h3>
                    <p className="text-amber-800 text-sm font-medium leading-relaxed">
                        {provider.accreditation}
                    </p>
                </div>
            </div>
        </div>
    )
}

/* Helper Component for Sidebar Item */
function InfoItem({ icon, label, value }: { icon: any; label: string; value: any }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="text-gray-400 shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">{label}</p>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}