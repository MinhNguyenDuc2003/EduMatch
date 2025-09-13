'use client';

import apiClientService from '@/common/services/ApiClientService';
import { GenCtx } from '@/provider/GeneralContext';
import { sStore } from '@/stores';
import { onSetLoading } from '@/utils/eventBus';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, IForm } from '@/lib/schemas';

const data = [
  {
    id: 1,
    title: 'Heading title',
    image:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
  },
];

export default GenCtx({
  useLogic() {
    // type IForm = {
    //   Fields: {
    //     User: {
    //       name: string;
    //       age: number;
    //       gmail: string;
    //       description: string;
    //     };
    //   };
    //   Filters: object;
    // };

    const ss = sStore();

    const methods = useForm<IForm>({
      reValidateMode: 'onSubmit', // Validate lại khi submit
      mode: 'onChange', // Validate khi thay đổi
      resolver: zodResolver(formSchema), // Tích hợp Zod
      defaultValues: {
        Fields: {
          User: {
            name: '',
            age: 0,
            gmail: '',
            description: '',
          },
        },
        Filters: {},
      },
    });

    const { watch, getValues, setValue } = methods;

    const loading = useState(false);

    const meds = {
      async onPushDataToN8n() {
        onSetLoading(true);
        const res = await fetch('/cv/CV_test.pdf');
        const blob = await res.blob();
        try {
          const formData = new FormData();
          formData.append('cv', blob, 'CV_DoMinhHieu.pdf');
          formData.append('name', 'Nguyen Van A');
          formData.append('email', 'test@example.com');
          formData.append('description', 'testttt');

          const data = await apiClientService.post(
            'https://justindo.app.n8n.cloud/webhook-test/8c87db94-10db-4f9d-939b-d079bacb16c1',
            formData
          );

          return ss.setJointData({ ListTest: data });
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
    };

    return {
      ss,
      data,
      meds,
      methods,
    };
  },
});
