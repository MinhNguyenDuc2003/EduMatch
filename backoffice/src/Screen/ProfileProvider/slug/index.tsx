'use client';

import Image from 'next/image';
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
  ShieldCheck,
  X,
  XCircle,
  AlertTriangle
} from 'lucide-react';

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
          <h3 className="text-2xl font-sans text-gray-900 mb-2 tracking-tight">{title}</h3>
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
   MAIN PAGE: PROVIDER PROFILE DETAIL
   ========================================================================== */
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

function ProviderProfileInner({ meds, idFormat }: { meds: any; idFormat: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!idFormat || !meds) return;
    const fetchData = async () => {
      onSetLoading(true);
      try {
        const res = await meds.onGetProviderByID(idFormat);
        setData(res || {});
      } catch (error) { console.error(error); } 
      finally { onSetLoading(false); }
    };
    fetchData();
  }, [idFormat, meds]);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="flex flex-col items-center gap-3 animate-pulse">
         <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
         <div className="text-gray-400 font-medium italic">Loading Organization Profile...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full mx-auto space-y-6">
        <ProviderHeader provider={data} meds={meds} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AboutSection provider={data} />
            <ContactsGrid contacts={data.providerContactDtos} />
          </div>
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

  // LOGIC NOTIFICATION STATE
  const [notif, setNotif] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'confirm',
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const closeNotif = () => setNotif(prev => ({ ...prev, isOpen: false }));

  const handleVerifyProcess = async () => {
    closeNotif();
    setLoading(true);
    try {
      const res = await meds.onUpdateProviderVerifyByID(provider.id);
      if (res?.data) {
        setVerified(true);
        setNotif({
          isOpen: true,
          type: 'success',
          title: 'Verified!',
          message: `${provider.organizationName} has been successfully verified.`,
          onConfirm: () => {},
        });
      }
    } catch (error) {
      setNotif({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Could not complete the verification at this time.',
        onConfirm: () => {},
      });
    } finally {
      setLoading(false);
    }
  };

  const onVerifyClick = () => {
    if (verified) return;
    setNotif({
      isOpen: true,
      type: 'confirm',
      title: 'Are you sure?',
      message: `Do you want to verify the organization "${provider.organizationName}"?`,
      onConfirm: handleVerifyProcess,
    });
  };

  const initials = provider.organizationName?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      <div className={`h-32 relative overflow-hidden ${!provider.bannerUrl ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : ''}`}>
        {provider.bannerUrl ? (
            <Image src={provider.bannerUrl} alt={provider.organizationName} fill className="object-cover" priority />
        ) : (
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        )}
      </div>

      <div className="px-8 pb-8 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-6">
          <div className="h-24 w-24 rounded-xl bg-white p-1 shadow-lg ring-1 ring-gray-100 flex items-center justify-center shrink-0 relative overflow-hidden">
             {provider.logoUrl ? (
                <Image src={provider.logoUrl} alt={provider.organizationName + " Logo"} fill className="object-contain p-1 rounded-xl" />
             ) : (
                <div className="h-full w-full bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-2xl border border-blue-100">{initials}</div>
             )}
          </div>

          <div className="flex-1 min-w-0 pt-2 mt-8 md:pt-0">
            <div className="flex items-center gap-2 mb-1">
               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 truncate mt-3">{provider.organizationName}</h1>
               {verified && (
                 <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-tighter">
                   <CheckCircle2 size={14} className="fill-blue-500 text-white" /> Verified
                 </span>
               )}
            </div>
            <p className="text-gray-500 font-medium flex items-center gap-2 italic"><Building2 size={16} /> {provider.organizationType}</p>
          </div>

          <div className="w-full md:w-auto mt-4 md:mt-0">
            <button
              onClick={onVerifyClick}
              disabled={verified || loading}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm ${
                verified ? 'bg-gray-100 text-gray-500 cursor-default border border-gray-200' : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }`}
            >
              {loading ? <span className="animate-pulse">Processing...</span> : verified ? <><ShieldCheck size={18} /> Account Verified</> : 'Verify Organization'}
            </button>
          </div>
        </div>
      </div>

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

/* ----------------------------- 2. MAIN CONTENT (ABOUT) ----------------------------- */
function AboutSection({ provider }: { provider: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 font-sans">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 tracking-tight text-blue-600 uppercase">Organization Overview</h3>
        <p className="text-gray-600 leading-relaxed text-base">{provider.description || 'No description provided.'}</p>
      </div>
      {provider.specialization && (
        <div className="pt-6 border-t border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Specialization</h4>
          <div className="flex flex-wrap gap-2">
            {provider.specialization.split(',').map((tag: string, idx: number) => (
              <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 tracking-tighter uppercase">{tag.trim()}</span>
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
    <div className="space-y-4 font-sans">
      <h3 className="text-lg font-bold text-gray-900 px-1 uppercase tracking-tight">Key Representatives</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"><User size={20} /></div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-gray-900 truncate tracking-tight">{contact.contactName}</h4>
                <p className="text-sm text-blue-600 font-bold mb-2 truncate uppercase tracking-tighter">{contact.roleTitle}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium"><Mail size={14} className="shrink-0" /><span className="truncate">{contact.email}</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium"><Phone size={14} className="shrink-0" /><span>{contact.phone}</span></div>
                  {contact.linkedinUrl && (<a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-[#0077b5] mt-1 transition-colors uppercase tracking-widest"><Linkedin size={14} /> LinkedIn Profile</a>)}
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

function InfoItem({ icon, label, value }: { icon: any; label: string; value: any }) {
  return (
    <div className="flex items-start gap-4 group font-sans">
      {/* Icon: Không nền, căn trên, màu xám nhạt và đổi màu khi hover group */}
      <div className="mt-1 text-gray-400 group-hover:text-emerald-500 transition-colors shrink-0">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        {/* Label: Chữ siêu nhỏ (10px), Đậm (Black), Giãn chữ (Widest) */}
        <p className="text-[10px] text-gray-400 font-sans uppercase tracking-widest mb-1 leading-none">
          {label}
        </p>
        
        {/* Value: Chữ đậm, màu tối để nổi bật thông tin chính */}
        <div className="text-sm font-bold text-gray-900 leading-snug">
          {value || '—'}
        </div>
      </div>
    </div>
  );
}