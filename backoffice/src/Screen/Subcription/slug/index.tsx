'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Check, X, Pencil } from 'lucide-react';
import Context from '../seg/context';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import { FormProvider, useForm } from 'react-hook-form';

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
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm<any>({ defaultValues: {} });
  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
        reset({
          fields: {
            Subscription: res,
          },
          filters: {},
        });
      })();
    }
  }, [id]);

  const handleSave = handleSubmit(async (formData) => {
    try {
      setLoading(true);
      await meds.onUpdate(id, formData);
      setData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update subscription.');
    } finally {
      setLoading(false);
    }
  });

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading subscription detail...
      </div>
    );

  const featureList =
    typeof data?.plan?.features === 'string'
      ? data.plan.features.split(',').map((f: string) => f.trim())
      : [];

  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('en-US');
    } catch {
      return 'Invalid date';
    }
  };

  return (
  <FormProvider {...methods}>
    <form
      onSubmit={handleSave}
      className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100 space-y-10"
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEditing ? 'Edit Subscription Detail' : 'Subscription Detail'}
        </h2>

       
        
      </div>

      {/* Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <CustomFormField
          name="fields.Subscription.id"
          label="Subscription ID"
          type="text"
          disabled
          isBorder
        />
        <CustomFormField
          name="fields.Subscription.userType"
          label="User Type"
          type="text"
          disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          name="fields.Subscription.status"
          label="Status"
          type="text"
          disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          name="fields.Subscription.autoRenew"
          label="Auto Renew"
          type="switch"
          disabled={!isEditing}
          isBorder
        />
        <CustomFormField
          name="fields.Subscription.startDate"
          label="Start Date"
          type="text"
          disabled
          isBorder
        />
        <CustomFormField
          name="fields.Subscription.endDate"
          label="End Date"
          type="text"
          disabled
          isBorder
        />
      </div>

      {/* Plan Info */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Plan Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <CustomFormField
            name="fields.Subscription.plan.name"
            label="Subcription Name"
            type="text"
            disabled={!isEditing}
            isBorder
          />
          <CustomFormField
            name="fields.Subscription.plan.price"
            label="Price"
            type="number"
            disabled={!isEditing}
            isBorder
          />
          <CustomFormField
            name="fields.Subscription.plan.currency"
            label="Currency"
            type="text"
            disabled={!isEditing}
            isBorder
          />
          <CustomFormField
            name="fields.Subscription.plan.durationDays"
            label="Duration (Days)"
            type="number"
            disabled={!isEditing}
            isBorder
          />
          <CustomFormField
            name="fields.Subscription.plan.targetType"
            label="Target Type"
            type="text"
            disabled={!isEditing}
            isBorder
          />
        </div>

        <CustomFormField
          name="fields.Subscription.plan.description"
          label="Description"
          type="textarea"
          disabled={!isEditing}
          isBorder
        />

        <div>
          <CustomFormField
            name="fields.Subscription.plan.features"
            label="Features"
            type="text"
            disabled={!isEditing}
            isBorder
          />
        </div>
      </div>
    </form>
  </FormProvider>
);
}