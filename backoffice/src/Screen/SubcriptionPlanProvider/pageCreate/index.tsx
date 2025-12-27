'use client';

import { Check, CreditCard, Clock, Target, Layers, Plus, X, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import Context from '../seg/context';
import { useRouter } from 'next/navigation';

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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h3>
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
export default function SubcriptionPlanCreate() {
    return (
        <Context.Provider>
            <Context.Consumer>
                {({ meds }) => <SubcriptionPlanCreateInner meds={meds} />}
            </Context.Consumer>
        </Context.Provider>
    );
}

function SubcriptionPlanCreateInner({ meds }: { meds: any }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Notification State
    const [modal, setModal] = useState({
        isOpen: false,
        type: 'success' as 'success' | 'error' | 'confirm',
        title: '',
        message: '',
        onConfirm: () => { },
    });

    const methods = useForm<any>({
        defaultValues: {
            fields: {
                SubcriptionPlan: {
                    name: '',
                    price: '',
                    currency: 'USD',
                    durationDays: 30,
                    targetType: 'APPLICANT',
                    description: '',
                    features: [],
                },
            },
        },
    });

    const { handleSubmit } = methods;

    const performCreate = async (data: any) => {
        setModal(prev => ({ ...prev, isOpen: false }));
        try {
            setLoading(true);
            const plan = data.fields.SubcriptionPlan;
            const res = await meds.onCreate(plan);

            if (res) {
                setModal({
                    isOpen: true,
                    type: 'success',
                    title: 'Plan Created!',
                    message: 'The new subscription plan has been added to the system.',
                    onConfirm: () => router.push('/subscriptionPlanProvider'),
                });
            }
        } catch (err) {
            setModal({
                isOpen: true,
                type: 'error',
                title: 'Creation Failed',
                message: 'Could not create the plan. Please check your network or data.',
                onConfirm: () => { },
            });
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = handleSubmit((data) => {
        setModal({
            isOpen: true,
            type: 'confirm',
            title: 'Create New Plan?',
            message: `Are you sure you want to create the plan "${data.fields.SubcriptionPlan.name}"?`,
            onConfirm: () => performCreate(data),
        });
    });

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center overflow-y-auto">
            <div className="w-full  h-fit pb-20"> {/* pb-20 để dropdown không bị chạm đáy */}

                <FormProvider {...methods}>
                    <form
                        onSubmit={onSubmit}
                        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-visible relative" // Chú ý: overflow-visible
                    >
                        {/* Header Banner */}
                        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-600 relative flex items-center justify-between px-8 rounded-t-3xl">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <div className="relative z-10 text-white">
                                <h1 className="text-3xl font-bold flex items-center gap-3">
                                    <Plus className="bg-white/20 p-1 rounded-full" size={32} />
                                    New Subscription Plan
                                </h1>
                                <p className="text-emerald-100 mt-1">Define a new pricing tier and feature set.</p>
                            </div>

                            <div className="relative z-10 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition backdrop-blur-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-2 bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl font-bold shadow-lg transition transform active:scale-95 disabled:opacity-70"
                                >
                                    {loading ? 'Wait...' : <><Check size={18} /> Create Plan</>}
                                </button>
                            </div>
                        </div>

                        <div className="p-8 space-y-10">

                            {/* Section 1: Core Identity */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                                    <Target size={14} className="text-emerald-600" /> Plan Identity
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <CustomFormField
                                        name="fields.SubcriptionPlan.name"
                                        label="Plan Name"
                                        placeholder="e.g. Premium Access 30 Days"
                                        isBorder
                                        rules={{ required: 'Plan name is required' }}
                                    />
                                    <CustomFormField
                                        name="fields.SubcriptionPlan.targetType"
                                        label="Target Audience"
                                        type="select"
                                        options={[
                                            { value: 'PROVIDER', label: 'Provider (Recruiter/Uni)' },
                                            { value: 'APPLICANT', label: 'Applicant (Student)' },
                                        ]}
                                        placeholder="Select target"
                                        isBorder
                                        rules={{ required: 'Target type is required' }}
                                    />
                                </div>
                            </div>

                            {/* Section 2: Pricing & Duration */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                                    <CreditCard size={14} className="text-emerald-600" /> Economic Setup
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <CustomFormField
                                        name="fields.SubcriptionPlan.price"
                                        label="Price"
                                        type="number"
                                        placeholder="0.00"
                                        isBorder
                                        rules={{
                                            required: 'Price is required',
                                            min: { value: 0, message: 'Price must be positive' },
                                        }}
                                    />
                                    <CustomFormField
                                        name="fields.SubcriptionPlan.currency"
                                        label="Currency"
                                        type='select'
                                        options={[
                                            { value: 'USD', label: 'USD ($)' },
                                        ]}
                                        isBorder
                                        rules={{ required: 'Currency is required' }}
                                    />
                                    <div className="relative">
                                        <CustomFormField
                                            name="fields.SubcriptionPlan.durationDays"
                                            label="Duration (Days)"
                                            type="number"
                                            placeholder="30"
                                            isBorder
                                            rules={{
                                                required: 'Duration is required',
                                                min: { value: 1, message: 'Min 1 day' },
                                            }}
                                        />
                                        <Clock size={16} className="absolute top-10 right-3 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Content & Features */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-3">
                                    <Layers size={14} className="text-emerald-600" /> Content & Marketing
                                </h3>

                                <CustomFormField
                                    label="Marketing Description"
                                    name="fields.SubcriptionPlan.description"
                                    type="textarea"
                                    placeholder="Describe the value proposition for this tier..."
                                    isBorder
                                    rules={{ required: 'Description is required' }}
                                />

                                {/* Multi-select feature: Đảm bảo parent không có overflow-hidden */}
                                <div className="z-20 relative"> 
                                    <CustomFormField
                                        type="multi-select"
                                        label="Included Features"
                                        name="fields.SubcriptionPlan.features"
                                        options={[
                                            { value: "AI_SCHOLARSHIP_NOTIFICATION", label: "AI Scholarship Notification" },
                                            { value: "AI_SCHOLARSHIP_RECOMMENDATION", label: "AI Scholarship Recommendation" },
                                            { value: "POST_SCHOLARSHIP", label: "Post Scholarship (For Providers)" },
                                            { value: "APPLICATION_FILTERING", label: "Application Filtering" },
                                            { value: "AI_PROFILE_RECOMMENDATION", label: "AI Profile Recommendation" },
                                        ]}
                                        placeholder="Pick the features available for this plan..."
                                        isBorder
                                    />
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