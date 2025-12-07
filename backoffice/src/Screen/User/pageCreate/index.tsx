'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomFormField } from 'src/common/components/common/CustomFormField';
import Context from '../seg/context';

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

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const user = {
        ...data.fields.User,
        role: [data.fields.User.role], 
      };

      await meds.onCreate(user);

    } catch (err) {
      console.error(err);
      alert('Failed to create user.');
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
          <h1 className="text-2xl font-semibold text-gray-800">Create User</h1>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            <Check size={18} /> {loading ? 'Creating...' : 'Create'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <CustomFormField
            name="fields.User.username"
            label="Username"
            placeholder="Enter username"
            isBorder
            rules={{ required: 'Username is required' }}
          />

          <CustomFormField
            name="fields.User.email"
            label="Email"
            placeholder="Enter email"
            isBorder
            rules={{ required: 'Email is required' }}
          />

          <CustomFormField
            name="fields.User.firstName"
            label="First Name"
            placeholder="Enter first name"
            isBorder
            rules={{ required: 'First name is required' }}
          />

          <CustomFormField
            name="fields.User.lastName"
            label="Last Name"
            placeholder="Enter last name"
            isBorder
            rules={{ required: 'Last name is required' }}
          />

          <CustomFormField
            name="fields.User.password"
            label="Password"
            placeholder="Enter password"
            type="password"
            isBorder
            rules={{ required: 'Password is required' }}
          />

          <CustomFormField
            name="fields.User.role"
            label="Role"
            type='select'
            placeholder="Select role"
            isBorder
            rules={{ required: 'Role is required' }}
            options={[
              { value: "PROVIDER", label: "Provider" },
              { value: "APPLICANT", label: "Applicant" },
              { value: "ADMIN", label: "Admin" },
              { value: "GUEST", label: "Guest" }
            ]}

          />
        </div>
      </form>
    </FormProvider>
  );
}
