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
    ShieldCheck,
    Save,
    CheckCircle2,
    XCircle,
    AlertTriangle
} from 'lucide-react';
import Context from '../seg/context';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import { FormProvider, useForm } from 'react-hook-form';

/* ==========================================================================
   LOCAL COMPONENT: NOTIFICATION MODAL
   ========================================================================== */
interface ModalProps {
    isOpen: boolean;
    type: 'success' | 'error' | 'confirm';
    title: string;
    message: string;
    onClose: () => void;
    onConfirm?: () => void;
}

const NotificationModal = ({ isOpen, type, title, message, onClose, onConfirm }: ModalProps) => {
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
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
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

    // Modal State
    const [modal, setModal] = useState({
        isOpen: false,
        type: 'success' as 'success' | 'error' | 'confirm',
        title: '',
        message: '',
        onConfirm: () => { },
    });

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

    /* --- LOGIC: SAVE CHANGES --- */
    const performSave = async (formData: any) => {
        setModal(prev => ({ ...prev, isOpen: false }));
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
            
            setModal({
                isOpen: true,
                type: 'success',
                title: 'Changes Saved!',
                message: 'The subscription plan has been updated successfully.',
                onConfirm: () => { }
            });
        } catch (error) {
            setModal({
                isOpen: true,
                type: 'error',
                title: 'Update Failed',
                message: 'Something went wrong while saving the changes.',
                onConfirm: () => { }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveClick = handleSubmit((data) => {
        setModal({
            isOpen: true,
            type: 'confirm',
            title: 'Save Changes?',
            message: 'Are you sure you want to update this subscription plan?',
            onConfirm: () => performSave(data),
        });
    });

    /* --- LOGIC: DELETE PLAN --- */
    const performDelete = async () => {
        setModal(prev => ({ ...prev, isOpen: false }));
        try {
            setLoading(true);
            await meds.onDelete(id);
            setModal({
                isOpen: true,
                type: 'success',
                title: 'Deleted!',
                message: 'The plan has been permanently removed.',
                onConfirm: () => router.push('/subscriptionPlan'),
            });
        } catch (error) {
            setModal({
                isOpen: true,
                type: 'error',
                title: 'Delete Failed',
                message: 'The system could not delete this plan. Please try again.',
                onConfirm: () => { },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = () => {
        setModal({
            isOpen: true,
            type: 'confirm',
            title: 'Delete Plan?',
            message: 'This action cannot be undone. All data associated with this plan will be lost.',
            onConfirm: performDelete,
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
                                onClick={handleDeleteClick}
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
                                onClick={handleSaveClick}
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

                        {/* Decorative Header Background */}
                        <div className="h-32 bg-gradient-to-r from-violet-600 to-indigo-600 relative overflow-hidden rounded-t-3xl">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <div className="absolute -bottom-10 -right-10 text-white/10">
                                <Sparkles size={150} />
                            </div>
                        </div>

                        <div className="px-8 pb-8 -mt-12 relative">
                            {/* Plan Header Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${data.targetType === 'PROVIDER' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {data.targetType} PLAN
                                        </span>
                                        {isEditing && <span className="text-xs text-gray-400 font-medium italic">(Editing Mode)</span>}
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{data.name}</h1>
                                    <span className="tracking-wide text-xs text-gray-400 font-bold uppercase">Created: {new Date(data.createdDate).toLocaleDateString('en-US', {
                                        month: 'short', day: 'numeric', year: 'numeric'
                                    })}</span>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-3xl font-extrabold text-gray-900">{data.price}</span>
                                        <span className="text-lg font-semibold text-gray-500">{data.currency}</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-400">per {data.durationDays} days</span>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {/* General Information */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                                        <Clock size={16} className="text-blue-500" /> Basic Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {isEditing ? (
                                            <>
                                                <CustomFormField name="fields.SubcriptionPlan.name" label="Plan Name" isBorder />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <CustomFormField name="fields.SubcriptionPlan.price" label="Price" type="number" isBorder />
                                                    <CustomFormField name="fields.SubcriptionPlan.currency" label="Currency" isBorder type='select' options={[{ value: 'USD', label: 'USD' }, { value: 'VND', label: 'VND' }]} />
                                                </div>
                                                <CustomFormField name="fields.SubcriptionPlan.durationDays" label="Duration (Days)" type="number" isBorder />
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

                                {/* Description */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                                        <Sparkles size={16} className="text-amber-500" /> Plan Description
                                    </h3>
                                    {isEditing ? (
                                        <CustomFormField name="fields.SubcriptionPlan.description" label="" type="textarea" isBorder />
                                    ) : (
                                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                            {data.description}
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                                        <ShieldCheck size={16} className="text-green-500" /> Plan Features
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
                                                placeholder="Select features included in this plan"
                                                isBorder
                                            />
                                        </div>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {data.features?.map((feature: string, idx: number) => (
                                                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="p-1.5 bg-emerald-50 rounded-full text-emerald-600">
                                                        <Check size={14} />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700 capitalize">
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

                {/* MODAL SYSTEM */}
                <NotificationModal
                    isOpen={modal.isOpen}
                    type={modal.type}
                    title={modal.title}
                    message={modal.message}
                    onClose={() => setModal(prev => ({ ...prev, isOpen: false }))}
                    onConfirm={modal.onConfirm}
                />
            </div>
        </div>
    );
}

function InfoBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-inner">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{label}</p>
            <p className="font-bold text-gray-900">{value}</p>
        </div>
    )
}