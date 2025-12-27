'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClientService from 'src/apiController/ApiClientService';
import { GenCtx } from 'src/apiController/GeneralContext';
import { sStore } from 'src/stores';
import { onSetLoading } from 'src/utils/eventBus';
export type IUser = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
};

export default GenCtx({
  useLogic() {
    type IForm = {
      fields: {
        User: {
          name: string;
          age: number;
          gmail: string;
          description: string;
        };
      };
      filters: object;
    };
    const ss = sStore();
    const methods = useForm<IForm>({
      mode: 'onSubmit',
      defaultValues: {
        fields: {},
        filters: {},
      },
    });
    // const loading = useState(false);
    const meds = {
      async onGetDataApplicant() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(`/api/profile/applicants/all`);
          if (data) {
            ss.setJointData({
              Students: data || [],
            });

            console.log('first', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },

      async onGetApplicantByID(id: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(`/api/profile/applicants/${id}`);
          return data.data;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
    };
    useEffect(() => {
      meds.onGetDataApplicant();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
      ss,meds,
      methods,
    };
  },
});
