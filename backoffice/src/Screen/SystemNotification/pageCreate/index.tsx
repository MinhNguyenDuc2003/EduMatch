'use client';

import { Check, ArrowLeft, Bell, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import Context from '../seg/context';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
      const notification = data.fields.SystemNotification;
      await meds.onCreate(notification);
      router.back(); // Or router.push('/systemNotification') based on your route
    } catch (err) {
      console.error(err);
      alert('Failed to create notification.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center">
      <div className=" w-full">
        
        {/* Navigation */}
        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4 mb-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending...' : <><Send size={18} /> Broadcast</>}
                    </button>
                </div>

        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative"
          >
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative flex items-center px-8">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 text-white">
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                        <Bell className="bg-white/20 p-1.5 rounded-full" size={36}/> 
                        New Notification
                    </h1>
                    <p className="text-blue-100 mt-1 text-sm md:text-base">Broadcast a message to all system users.</p>
                </div>
            </div>

            <div className="p-8 space-y-8">
                
                {/* Notification Details */}
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="mt-3 p-2 bg-blue-50 rounded-lg text-blue-600 hidden sm:block">
                            <MessageSquare size={24} />
                        </div>
                        <div className="flex-1 space-y-6">
                            <CustomFormField
                                name="fields.SystemNotification.title"
                                label="Subject Title"
                                placeholder="e.g. System Maintenance Scheduled"
                                isBorder
                                rules={{ required: 'Title is required' }}
                            />

                            <CustomFormField
                                name="fields.SystemNotification.content"
                                label="Message Content"
                                placeholder="Type your detailed message here..."
                                type="textarea"
                                isBorder
                                className="min-h-[150px]" // Helper class for taller textarea if supported, else relies on default
                                rules={{ required: 'Content is required' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
               

            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}