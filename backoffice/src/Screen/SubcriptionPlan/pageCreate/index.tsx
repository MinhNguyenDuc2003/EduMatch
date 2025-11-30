'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import Context from '../seg/context';

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

  const methods = useForm<any>({
    defaultValues: {
      fields: {
        SubcriptionPlan: {
          name: '',
          price: '',
          currency: '',
          durationDays: '',
          targetType: '',
          description: '',
          features: '',
        },
      },
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const plan = data.fields.SubcriptionPlan; // Lấy đúng object
      await meds.onCreate(plan); // Truyền object cho API
    } catch (err) {
      console.error(err);
      alert('Failed to create subscription plan.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="w-[95%] mx-auto bg-white p-10 mt-10 rounded-2xl shadow-lg border border-gray-100 space-y-10"
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Create Subscription Plan</h1>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <Check size={18} /> {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <CustomFormField
            name="fields.SubcriptionPlan.name"
            label="Plan Name"
            placeholder="Enter plan name"
            isBorder
            rules={{ required: 'Plan name is required' }}
          />
          <CustomFormField
            name="fields.SubcriptionPlan.price"
            label="Price (USD)"
            type="number"
            placeholder="Enter price"
            isBorder
            rules={{
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
            }}
          />
          <CustomFormField
            name="fields.SubcriptionPlan.currency"
            label="Currency"
            placeholder="Enter currency"
            isBorder
            rules={{ required: 'Currency is required' }}
          />
          <CustomFormField
            name="fields.SubcriptionPlan.durationDays"
            label="Duration (Days)"
            type="number"
            placeholder="Enter duration"
            isBorder
            rules={{
              required: 'Duration is required',
              min: { value: 1, message: 'Duration must be at least 1' },
            }}
          />
          <CustomFormField
            name="fields.SubcriptionPlan.targetType"
            label="Target Type"
            placeholder="Enter target type"
            isBorder
            rules={{ required: 'Target type is required' }}
          />
        </div>

        <div>
          <CustomFormField
            label="Description"
            name="fields.SubcriptionPlan.description"
            type="textarea"
            placeholder="Enter description"
            isBorder
            rules={{ required: 'Description is required' }}
          />
        </div>

        <div>
          <CustomFormField
            label="Features"
            name="fields.SubcriptionPlan.features"
            placeholder="Comma-separated, e.g. AI_MATCHING,PROFILE_SCORING"
            isBorder
            rules={{ required: 'Features are required' }}
          />
        </div>
      </form>
    </FormProvider>
  );
}
