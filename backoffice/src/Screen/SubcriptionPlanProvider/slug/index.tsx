'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Check,
  X,
  Pencil,
  Trash2,
  Sparkles,
  Clock,
  Users,
  ShieldCheck,
  Save,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import Context from '../seg/context';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFormField } from 'src/common/components/common/CustomFormField';

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
                <button onClick={onClose} className="flex-1 py-3 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all">
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
export default function SubcriptionPlanDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <SubcriptionPlanDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function SubcriptionPlanDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal State quản lý thông báo
  const [notif, setNotif] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'confirm',
    title: '',
    message: '',
    onConfirm: () => { },
    onClose: () => { },
  });

  const closeNotif = () => setNotif(prev => ({ ...prev, isOpen: false }));

  const methods = useForm<any>({ defaultValues: {} });
  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        try {
          const res = await meds.onGetByID(id);
          const featuresArray = Array.isArray(res.features)
            ? res.features
            : (typeof res.features === 'string' ? res.features.split(',').map((f: string) => f.trim()) : []);

          setData({ ...res, features: featuresArray });

          reset({
            fields: {
              SubcriptionPlan: {
                ...res,
                features: featuresArray,
              },
            },
          });
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [id, meds, reset]);

  /* --- ACTIONS: SAVE --- */
  const performSave = async (formData: any) => {
    closeNotif();
    try {
      setLoading(true);
      const planData = formData.fields.SubcriptionPlan;
      const featuresArray = Array.isArray(planData.features)
        ? planData.features
        : planData.features?.split(',').map((f: string) => f.trim()) || [];

      await meds.onUpdate(id, {
        ...planData,
        features: featuresArray,
      });

      setData({ ...planData, features: featuresArray });
      setIsEditing(false);

      setNotif({
        isOpen: true,
        type: 'success',
        title: 'Successfully Updated',
        message: 'Your changes have been saved.',
        onConfirm: () => { },
        onClose: closeNotif,
      });
    } catch (error) {
      setNotif({
        isOpen: true,
        type: 'error',
        title: 'Update Failed',
        message: 'Could not save changes. Please check your connection.',
        onConfirm: () => { },
        onClose: closeNotif,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = handleSubmit((data) => {
    setNotif({
      isOpen: true,
      type: 'confirm',
      title: 'Confirm Changes',
      message: 'Are you sure you want to update this subscription plan?',
      onConfirm: () => performSave(data),
      onClose: closeNotif,
    });
  });

  /* --- ACTIONS: DELETE (Chuyển hướng về trang trước) --- */
  const performDelete = async () => {
    closeNotif();
    try {
      setLoading(true);
      await meds.onDelete(id);
      
      setNotif({
        isOpen: true,
        type: 'success',
        title: 'Plan Deleted',
        message: 'The subscription plan has been removed from the system.',
        // Khi nhấn nút trên Modal Success, thực hiện chuyển hướng
        onConfirm: () => router.push('/subscriptionPlan'),
        onClose: () => router.push('/subscriptionPlan'),
      });
    } catch (error) {
      setNotif({
        isOpen: true,
        type: 'error',
        title: 'Delete Failed',
        message: 'An error occurred while trying to delete the plan.',
        onConfirm: () => { },
        onClose: closeNotif,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setNotif({
      isOpen: true,
      type: 'confirm',
      title: 'Confirm Deletion',
      message: 'This action cannot be undone. Are you sure you want to delete this plan?',
      onConfirm: performDelete,
      onClose: closeNotif,
    });
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
          <div className="text-gray-400 font-medium">Loading Plan Details...</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center overflow-y-auto">
      <div className="w-full  h-fit pb-20">

        {/* Toolbar */}
        <div className="flex justify-end items-center mb-6">
          {!isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg transition shadow-sm font-medium"
              >
                <Trash2 size={18} /> Delete Plan
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-md shadow-blue-200 font-medium"
              >
                <Pencil size={18} /> Edit Plan
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  reset();
                  setIsEditing(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition shadow-sm font-medium"
              >
                <X size={18} /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-md shadow-green-200 font-medium disabled:opacity-70"
              >
                {loading ? <Clock size={18} className="animate-spin" /> : <Save size={18} />}
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        <FormProvider {...methods}>
          <form className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-visible relative">

            <div className="h-32 bg-gradient-to-r from-violet-600 to-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute -bottom-10 -right-10 text-white/10">
                <Sparkles size={150} />
              </div>
            </div>

            <div className="px-8 pb-8 -mt-12 relative">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${data.targetType === 'PROVIDER' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {data.targetType} PLAN
                    </span>
                    {isEditing && <span className="text-xs text-gray-400 font-medium italic">(Editing Mode)</span>}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{data.name}</h1>
                  <span className=" tracking-wide text-sm font-medium">Created Date: {new Date(data.createdDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) || 'Unknown Status'}</span>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-3xl font-extrabold text-gray-900">{data.price}</span>
                    <span className="text-lg font-semibold text-gray-500">{data.currency}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-400">per {data.durationDays} days</span>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-blue-500" /> General Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 p-1">
                    {isEditing ? (
                      <>
                        <CustomFormField name="fields.SubcriptionPlan.name" label="Plan Name" isBorder rules={{ required: true }} />
                        <div className="grid grid-cols-2 gap-4">
                          <CustomFormField name="fields.SubcriptionPlan.price" label="Price" type="number" isBorder rules={{ required: true }} />
                          <CustomFormField name="fields.SubcriptionPlan.currency" label="Currency" isBorder type='select' options={[{ value: 'USD', label: 'USD' }, { value: 'VND', label: 'VND' }]} />
                        </div>
                        <CustomFormField name="fields.SubcriptionPlan.durationDays" label="Duration (Days)" type="number" isBorder rules={{ required: true }} />
                        <CustomFormField name="fields.SubcriptionPlan.targetType" label="Target Audience" isBorder type="select" options={[{ value: 'PROVIDER', label: 'Provider' }, { value: 'APPLICANT', label: 'Applicant' }]} />
                      </>
                    ) : (
                      <>
                        <InfoBox label="Duration" value={`${data.durationDays} Days`} />
                        <InfoBox label="Target Audience" value={data.targetType} />
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users size={20} className="text-amber-500" /> Description
                  </h3>
                  {isEditing ? (
                    <CustomFormField name="fields.SubcriptionPlan.description" label="" type="textarea" isBorder rules={{ required: true }} />
                  ) : (
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {data.description}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-green-500" /> Included Features
                  </h3>
                  {isEditing ? (
                    <div className="z-20 relative">
                      <CustomFormField
                        type="multi-select"
                        label=""
                        name="fields.SubcriptionPlan.features"
                        options={[
                          { value: "AI_SCHOLARSHIP_NOTIFICATION", label: "AI Scholarship Notification" },
                          { value: "AI_SCHOLARSHIP_RECOMMENDATION", label: "AI Scholarship Recommendation" },
                          { value: "POST_SCHOLARSHIP", label: "Post Scholarship" },
                          { value: "APPLICATION_FILTERING", label: "Application Filtering" },
                          { value: "AI_PROFILE_RECOMMENDATION", label: "AI Profile Recommendation" },
                        ]}
                        placeholder="Select features"
                        isBorder
                      />
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {data.features?.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <div className="p-1 bg-green-100 rounded-full text-green-600">
                            <Check size={14} />
                          </div>
                          <span className="text-sm font-semibold text-gray-700 capitalize">
                            {feature.replace(/_/g, ' ').toLowerCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>

        {/* NOTIFICATION MODAL SYSTEM */}
        <NotificationModal
          isOpen={notif.isOpen}
          type={notif.type}
          title={notif.title}
          message={notif.message}
          onClose={notif.onClose} // Sửa ở đây để nhận callback đóng/chuyển hướng
          onConfirm={notif.onConfirm}
        />
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
      <p className="text-xs text-gray-500 font-bold uppercase mb-1">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  )
}