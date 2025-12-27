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
  ImageIcon,
  FileText,
  Trophy,
  Mail,
  Phone,
  Search,
  Award,
  Power,
  RefreshCcw,
  ChevronDown,
  X,
  AlertCircle,
  XCircle,
  AlertTriangle,
  Settings2, // Thêm mới
  Sliders, // Thêm mới
} from 'lucide-react';

/* =========================
   NOTIFICATION MODAL COMPONENT
   ========================= */
interface NotificationModalProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const NotificationModal = ({
  isOpen,
  type,
  title,
  message,
  onClose,
  onConfirm,
}: NotificationModalProps) => {
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={type !== 'confirm' ? onClose : undefined}
      />
      <div
        className={`relative bg-white w-full max-w-sm rounded-3xl shadow-2xl border-t-8 ${current.borderColor} p-8 animate-in fade-in zoom-in duration-200 text-center`}
      >
        <div className="flex flex-col items-center">
          <div className="mb-4">{current.icon}</div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">{message}</p>
          <div className="flex w-full gap-3">
            {type === 'confirm' ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 py-3 rounded-2xl font-bold text-white shadow-lg ${current.btnColor} transition-all active:scale-95`}
                >
                  Confirm
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`w-full py-3 rounded-2xl font-bold text-white shadow-lg ${current.btnColor} transition-all active:scale-95`}
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

/* =========================
   MAIN PAGE COMPONENT
   ========================= */
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
  const [dataApplication, setDataApplication] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false); // State cho Preferences Modal
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const [notif, setNotif] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'confirm',
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const closeNotif = () => setNotif((prev) => ({ ...prev, isOpen: false }));

  const statusOptions = [
    { label: 'Pending', value: 'Pending', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    {
      label: 'Approved',
      value: 'Approved',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    { label: 'Rejected', value: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200' },
    {
      label: 'Successful',
      value: 'Successful',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500 text-white shadow-emerald-100';
      case 'Rejected':
        return 'bg-red-500 text-white shadow-red-100';
      case 'Successful':
        return 'bg-blue-600 text-white shadow-blue-100';
      case 'Pending':
      default:
        return 'bg-amber-500 text-white shadow-amber-100';
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return;

    setNotif({
      isOpen: true,
      type: 'confirm',
      title: 'Are you sure?',
      message: `Do you want to change the status to "${selectedStatus}"?`,
      onConfirm: async () => {
        closeNotif();
        try {
          onSetLoading(true);
          await meds.onChangeStatusScholarship(id, selectedStatus);
          setData({ ...data, status: selectedStatus });
          setIsModalOpen(false);

          setNotif({
            isOpen: true,
            type: 'success',
            title: 'Updated!',
            message: 'The scholarship status has been updated successfully.',
            onConfirm: () => {},
          });
        } catch (error) {
          setNotif({
            isOpen: true,
            type: 'error',
            title: 'Update Failed',
            message: 'An error occurred while updating the status. Please try again.',
            onConfirm: () => {},
          });
        } finally {
          onSetLoading(false);
        }
      },
    });
  };

  useEffect(() => {
    if (!id || !meds?.onGetByID) return;
    const fetchData = async () => {
      onSetLoading(true);
      try {
        const res = await meds.onGetByID(id);
        const res2 = await meds.onGetApplicationByScholarshipID(id);
        setData(res);
        setDataApplication(res2);
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

  const mediaList = data.scholarshipMedias || [];
  const banner = mediaList.length > 0 ? mediaList[0].url : null;
  const gallery = mediaList.length > 1 ? mediaList.slice(1) : [];
  const provider = data.providerProfileVo;

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
      {/* MODAL: CHANGE STATUS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm shadow-inner"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Change Status</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Select a new status for this scholarship
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-8">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedStatus(opt.value)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                    selectedStatus === opt.value
                      ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-50'
                      : 'border-gray-50 hover:border-gray-200 bg-gray-50/30'
                  }`}
                >
                  <span
                    className={`font-bold py-1 px-4 rounded-full text-xs uppercase tracking-widest ${opt.color}`}
                  >
                    {opt.label}
                  </span>
                  {selectedStatus === opt.value && (
                    <div className="bg-blue-600 rounded-full p-1 shadow-sm shadow-blue-200">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={!selectedStatus}
                className="flex-1 py-4 rounded-2xl font-bold text-white bg-gray-900 hover:bg-black disabled:opacity-30 shadow-xl transition-all active:scale-95"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIEW PREFERENCES */}
      {isPrefModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPrefModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Sliders size={24} className="text-blue-400" />
                  Matching Preferences
                </h3>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">
                  Algorithm Weight Distribution
                </p>
              </div>
              <button
                onClick={() => setIsPrefModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.scholarshipPreferences?.map((pref: any) => (
                  <div
                    key={pref.id}
                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full mb-1 inline-block ${
                          pref.type === 'PROFILE'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {pref.type || 'SYSTEM'}
                      </span>
                      <p className="font-bold text-gray-800 capitalize leading-tight">
                        {pref.field.replace('_w', '').replace('_', ' ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Weight</p>
                      <p className="text-lg font-black text-blue-600">
                        {(pref.weight * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {(!data.scholarshipPreferences || data.scholarshipPreferences.length === 0) && (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto text-gray-300 mb-2" size={48} />
                  <p className="text-gray-400 font-medium">
                    No preference weights set for this scholarship.
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
              <button
                onClick={() => setIsPrefModalOpen(false)}
                className="w-full py-4 rounded-2xl font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Close Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="w-full mx-auto space-y-6">
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

          <div className="relative -mt-24 px-4 sm:px-6 lg:px-8 pb-8">
            <div className="w-full mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    <School size={16} /> {data.studyLevel}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider shadow-sm transition-colors duration-300 ${getStatusBadgeClass(data.status)}`}
                  >
                    <RefreshCcw
                      size={12}
                      className={data.status === 'Pending' ? 'animate-spin-slow' : ''}
                    />
                    {data.status || 'Pending'}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  {data.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 font-medium text-lg">
                  <Building2 size={20} className="text-gray-400" />
                  {data.university}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 min-w-[220px]">
                {/* BUTTON VIEW PREFERENCES */}
                <button
                  onClick={() => setIsPrefModalOpen(true)}
                  className="w-full md:w-auto px-6 py-4 rounded-2xl font-black text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Settings2
                    size={18}
                    className="group-hover:rotate-90 transition-transform duration-500"
                  />
                  VIEW PREFERENCES
                </button>

                <button
                  onClick={() => {
                    setSelectedStatus(data.status);
                    setIsModalOpen(true);
                  }}
                  className="w-full md:w-auto px-6 py-4 rounded-2xl font-black text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group active:scale-95"
                >
                  <RefreshCcw
                    size={18}
                    className="group-hover:rotate-180 transition-transform duration-500"
                  />
                  CHANGE STATUS
                  <ChevronDown size={18} />
                </button>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <AlertCircle size={10} /> Administrative Actions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Section
              title="Program Overview"
              icon={<BookOpen size={20} className="text-blue-600" />}
            >
              <p className="font-medium text-gray-900 mb-2">{data.shortDescription}</p>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </Section>

            <Section
              title="Scholarship Benefits"
              icon={<Banknote size={20} className="text-emerald-600" />}
            >
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 text-emerald-900 leading-relaxed">
                {data.benefits}
              </div>
            </Section>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-indigo-600" /> Eligibility & Requirements
              </h2>
              <p className="text-gray-700 mb-6 pb-6 border-b border-gray-100">
                {data.requirements}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                    Standardized Tests
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ScoreBadge label="SAT" score={data.requiredSatScore} />
                    <ScoreBadge label="ACT" score={data.requiredActScore} />
                    <ScoreBadge label="TOEFL" score={data.requiredToeflScore} />
                    <ScoreBadge label="IELTS" score={data.requiredIeltsScore} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                    Candidate Profile
                  </h3>
                  <div className="space-y-3">
                    <RequirementRow
                      icon={<User size={16} />}
                      label="Age Range"
                      value={`${data.minAge} - ${data.maxAge} years`}
                    />
                    <RequirementRow
                      icon={<Users size={16} />}
                      label="Gender"
                      value={data.genderRequirement}
                    />
                    <RequirementRow
                      icon={<Briefcase size={16} />}
                      label="Work Exp."
                      value={
                        data.requiredWorkExperienceYears > 0
                          ? `${data.requiredWorkExperienceYears} Years`
                          : 'None'
                      }
                    />
                    <RequirementRow
                      icon={<FileBarChart size={16} />}
                      label="Class Rank"
                      value={
                        data.requiredClassRankPercentile
                          ? `Top ${data.requiredClassRankPercentile}%`
                          : 'N/A'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {dataApplication && dataApplication.length > 0 && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Users className="text-blue-600" /> Recent Applications
                    <span className="text-xs bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full">
                      {dataApplication.length}
                    </span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {dataApplication.map((app: any) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 bg-gray-50/50 p-6 flex flex-col items-center border-r border-gray-100">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-3 border-2 border-white shadow-sm bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                            {app.applicationMedias?.find((m: any) =>
                              m.contentType.includes('image')
                            ) ? (
                              <Image
                                src={
                                  app.applicationMedias.find((m: any) =>
                                    m.contentType.includes('image')
                                  ).url
                                }
                                alt="Profile"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              app.fullName
                                .split(' ')
                                .map((n: any) => n[0])
                                .join('')
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 text-center leading-tight">
                            {app.fullName}
                          </h3>
                          <p className="text-blue-600 text-[11px] font-bold uppercase tracking-wider mt-1">
                            {app.major}
                          </p>
                          <div className="w-full mt-5 space-y-1.5">
                            <div className="flex justify-between text-[11px] font-bold px-2 py-1 bg-white rounded border border-gray-100">
                              <span className="text-gray-400">GPA</span>
                              <span className="text-emerald-600">{app.gpa}</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold px-2 py-1 bg-white rounded border border-gray-100">
                              <span className="text-gray-400">IELTS</span>
                              <span className="text-purple-600">{app.ieltsScore}</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold px-2 py-1 bg-white rounded border border-gray-100">
                              <span className="text-gray-400">SAT</span>
                              <span className="text-blue-600">{app.satScore}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 p-6 flex flex-col">
                          <div className="flex justify-between mb-4">
                            <div className="flex gap-4">
                              <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                                <MapPin size={14} /> {app.nationality}
                              </div>
                              <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                                <Calendar size={14} /> Age: {app.age}
                              </div>
                            </div>
                            <div className="text-[10px] font-bold text-gray-300 uppercase italic">
                              Applied: {new Date(app.createdDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="space-y-3 mb-5">
                            <div>
                              <h4 className="text-[11px] font-extrabold text-gray-400 uppercase mb-1 flex items-center gap-1">
                                <Trophy size={12} className="text-amber-500" /> Top Achievement
                              </h4>
                              <p className="text-xs text-gray-700 font-medium line-clamp-1 italic">
                                &quot;{app.achievements}&quot;
                              </p>
                            </div>
                            <div>
                              <h4 className="text-[11px] font-extrabold text-gray-400 uppercase mb-1">
                                Career Goal
                              </h4>
                              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                {app.careerGoal}
                              </p>
                            </div>
                          </div>
                          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex gap-2">
                              {app.applicationMedias
                                ?.filter((m: any) => m.contentType === 'application/pdf')
                                .map((file: any) => (
                                  <a
                                    key={file.id}
                                    href={file.url}
                                    target="_blank"
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-[10px] font-bold border border-red-100 hover:bg-red-100 transition-colors"
                                  >
                                    <FileText size={12} /> CV_FILE.PDF
                                  </a>
                                ))}
                            </div>
                            <button
                              onClick={() =>
                                router.push(
                                  `/applicationScholarship/${app.applicationScholarshipId}`
                                )
                              }
                              className="flex items-center gap-1 text-blue-600 text-xs font-bold hover:underline"
                            >
                              Full details <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {gallery.length > 0 && (
              <Section
                title="Program Gallery"
                icon={<ImageIcon size={20} className="text-purple-600" />}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map((media: any) => (
                    <div
                      key={media.id}
                      className="relative h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
                    >
                      <Image src={media.url} alt="Gallery" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Clock size={18} className="text-gray-400" /> Timeline
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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <GraduationCap size={18} className="text-gray-400" /> Academic Criteria
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
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                      >
                        {f.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">All fields</span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Location</p>
                <p className="text-gray-900 font-medium">{data.country}</p>
              </div>
            </div>

            {provider && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-24 bg-gray-100 relative">
                  {provider.bannerUrl && (
                    <Image
                      src={provider.bannerUrl}
                      alt="Cover"
                      fill
                      className="object-cover opacity-50"
                    />
                  )}
                </div>
                <div className="px-6 relative">
                  <div className="flex justify-between items-end -mt-10 mb-4">
                    <div className="h-20 w-20 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden relative">
                      {provider.logoUrl ? (
                        <Image
                          src={provider.logoUrl}
                          alt="Logo"
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
                          {provider.organizationName?.[0]}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => router.push(`/profileProvider/${provider.id}`)}
                      className="text-sm text-blue-600 font-bold hover:underline flex items-center gap-1 mb-1"
                    >
                      View Organization <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {provider.organizationName}
                      </h3>
                      {provider.verified && (
                        <CheckCircle2 size={18} className="text-blue-500 fill-blue-50" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-3">
                      {provider.organizationType} • Est. {provider.yearEstablished}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {provider.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Contacts</p>
                        {provider.providerContactDtos?.map((c: any) => (
                          <div key={c.id} className="mb-2 last:mb-0">
                            <p className="font-semibold text-gray-900">{c.contactName}</p>
                            <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">
                              {c.email}
                            </a>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Address</p>
                        <p className="text-gray-700">{provider.addressSummary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

/* -------------------------- Sub Components --------------------------- */
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
      <div className="prose prose-blue max-w-none text-gray-600">{children}</div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  value,
  highlight,
}: {
  icon: any;
  label: string;
  value: any;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 shrink-0 ${highlight ? 'text-red-500' : 'text-gray-400'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">{label}</p>
        <p className={`font-medium ${highlight ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
      </div>
    </div>
  );
}

function ScoreBadge({ label, score }: { label: string; score: number }) {
  const hasScore = score && score > 0;
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg border ${hasScore ? 'bg-gray-50 border-gray-200' : 'bg-gray-50/50 border-transparent'}`}
    >
      <span className="text-xs font-bold text-gray-500">{label}</span>
      <span className={`text-sm font-bold ${hasScore ? 'text-gray-900' : 'text-gray-400'}`}>
        {hasScore ? score : '—'}
      </span>
    </div>
  );
}

function RequirementRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="text-gray-400 shrink-0">{icon}</div>
      <div className="flex-1 flex justify-between items-center">
        <span className="text-sm text-gray-600 font-medium">{label}</span>
        <span className="text-sm text-gray-900 font-bold">{value || 'Any'}</span>
      </div>
    </div>
  );
}
