'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import Context from '../seg/context';

export default function SystemNotificationCreate() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <SystemNotificationCreateInner meds={meds} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function SystemNotificationCreateInner({ meds }: { meds: any }) {
  const [loading, setLoading] = useState(false);

  const methods = useForm<any>({
    defaultValues: {
      fields: {
        SystemNotification: {
          title: '',
          content: '',
        },
      },
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const notification = data.fields.SystemNotification; // Lấy đúng object
      await meds.onCreate(notification); // Truyền object cho API
      alert('Notification created successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to create notification.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="w-[95%] mx-auto bg-white p-10 mt-10 rounded-2xl shadow-lg border border-gray-100 space-y-6"
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Create System Notification</h1>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            <Check size={18} /> {loading ? 'Creating...' : 'Create'}
          </button>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          <CustomFormField
            name="fields.SystemNotification.title"
            label="Title"
            placeholder="Enter notification title"
            isBorder
            rules={{ required: 'Title is required' }}
          />

          <CustomFormField
            name="fields.SystemNotification.content"
            label="Content"
            placeholder="Enter notification content"
            type="textarea"
            isBorder
            rules={{ required: 'Content is required' }}
          />
        </div>
      </form>
    </FormProvider>
  );
}
