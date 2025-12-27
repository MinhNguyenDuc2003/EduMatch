'use client';

import { Check, ArrowLeft, CreditCard, Clock, Target, FileText, Layers, Plus } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import Context from '../seg/context';
import { useRouter } from 'next/navigation';

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const plan = data.fields.SubcriptionPlan;
      await meds.onCreate(plan);
      router.push('/subscriptionPlan'); // Redirect after success
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center">
      <div className=" w-full">
        
        {/* Navigation */}
         <div className="pt-6 border-t border-gray-100 flex justify-end gap-4 mb-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : <><Check size={20} /> Create Plan</>}
                    </button>
                </div>

        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative"
          >
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-600 relative flex items-center px-8">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 text-white">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Plus className="bg-white/20 p-1 rounded-full" size={32}/> 
                        New Subscription Plan
                    </h1>
                    <p className="text-emerald-100 mt-1">Define a new pricing tier and feature set.</p>
                </div>
            </div>

            <div className="p-8 space-y-8">
                
                {/* Section 1: Core Identity */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Target size={16} className="text-emerald-600"/> Plan Identity
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
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2 border-b border-gray-100 pb-2">
                        <CreditCard size={16} className="text-emerald-600"/> Economics
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
                            <Clock size={16} className="absolute top-10 right-3 text-gray-400 pointer-events-none"/>
                        </div>
                    </div>
                </div>

                {/* Section 3: Content & Features */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Layers size={16} className="text-emerald-600"/> Content Strategy
                    </h3>
                    
                    <CustomFormField
                        label="Marketing Description"
                        name="fields.SubcriptionPlan.description"
                        type="textarea"
                        placeholder="Describe the value proposition..."
                        isBorder
                        rules={{ required: 'Description is required' }}
                    />

                    <CustomFormField
                        type="multi-select"
                        label="Included Features"
                        name="fields.SubcriptionPlan.features"
                        options={[
                            { value: "AI_SCHOLARSHIP_NOTIFICATION", label: "AI Scholarship Notification" },
                            { value: "AI_SCHOLARSHIP_RECOMMENDATION", label: "AI Scholarship Recommendation" },
                            { value: "POST_SCHOLARSHIP", label: "Post Scholarship" },
                            { value: "APPLICATION_FILTERING", label: "Application Filtering" },
                            { value: "AI_PROFILE_RECOMMENDATION", label: "AI Profile Recommendation" },
                        ]}
                        placeholder="Select features..."
                        isBorder
                    />
                </div>

                {/* Actions */}
              

            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}