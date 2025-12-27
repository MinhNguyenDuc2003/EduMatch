'use client';

import { Check, X, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import Context from '../seg/context';

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
      icon: <AlertCircle className="text-red-500" size={48} />,
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={type !== 'confirm' ? onClose : undefined} />
      <div className={`relative bg-white w-full max-w-sm rounded-3xl shadow-2xl border-t-8 ${current.borderColor} p-8 text-center animate-in fade-in zoom-in duration-200`}>
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
   MAIN COMPONENT: USER CREATE
   ========================================================================== */
export default function UserCreate() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <UserCreateInner meds={meds} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function UserCreateInner({ meds }: { meds: any }) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'confirm',
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const methods = useForm<any>({
    defaultValues: {
      fields: {
        User: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          role: '',
        },
      },
    },
  });

  const { handleSubmit, reset } = methods;

  const handleAction = async (data: any) => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    try {
      setLoading(true);
      const user = {
        ...data.fields.User,
        role: [data.fields.User.role],
      };

      const result = await meds.onCreate(user);
      
      // result will be truthy if API call succeeds
      if (result) {
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Success!',
          message: 'User account has been successfully created.',
          onConfirm: () => {},
        });
        reset(); 
      }
    } catch (err) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Failed',
        message: 'An error occurred during account creation. Please try again.',
        onConfirm: () => {},
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSubmit((data) => {
    setModal({
      isOpen: true,
      type: 'confirm',
      title: 'Confirmation',
      message: `Are you sure you want to create user "${data.fields.User.username}"?`,
      onConfirm: () => handleAction(data),
    });
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="w-[95%] mx-auto bg-white p-10 mt-10 rounded-2xl shadow-lg border border-gray-100 space-y-10"
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Create New User</h1>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check size={18} />
            )}
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <CustomFormField
            name="fields.User.username"
            label="Username"
            placeholder="e.g. hieudm_admin"
            isBorder
            rules={{ required: 'Username is required' }}
          />

          <CustomFormField
            name="fields.User.email"
            label="Email Address"
            placeholder="example@edumatch.com"
            isBorder
            rules={{ 
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } 
            }}
          />

          <CustomFormField
            name="fields.User.firstName"
            label="First Name"
            placeholder="e.g. Minh"
            isBorder
            rules={{ required: 'First name is required' }}
          />

          <CustomFormField
            name="fields.User.lastName"
            label="Last Name"
            placeholder="e.g. Do"
            isBorder
            rules={{ required: 'Last name is required' }}
          />

          <CustomFormField
            name="fields.User.password"
            label="Password"
            placeholder="••••••••"
            type="password"
            isBorder
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } }}
          />

          <CustomFormField
            name="fields.User.role"
            label="System Role"
            type="select"
            placeholder="Select a role"
            isBorder
            rules={{ required: 'Role is required' }}
            options={[
              { value: "PROVIDER", label: "Provider (Organization)" },
              { value: "APPLICANT", label: "Applicant (Student)" },
              { value: "ADMIN", label: "System Administrator" },
            ]}
          />
        </div>
      </form>

      <NotificationModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modal.onConfirm}
      />
    </FormProvider>
  );
}