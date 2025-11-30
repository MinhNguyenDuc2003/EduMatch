'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClientService from 'src/apiController/ApiClientService';
import { GenCtx } from 'src/apiController/GeneralContext';
import { sStore } from 'src/stores';
import { onSetLoading } from 'src/utils/eventBus';

const data = 'ffffff';
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
      async onGetDataProvider() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(`/api/profile/providers/all`);
          if (data) {
            ss.Joint.Provider = data;
            console.log('first', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onGetDataApplicant() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(`/api/profile/applicants/all`);
          if (data) {
            ss.Joint.Students = data;
            console.log('first', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
       async onGetProviderByID(id: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(`/api/profile/providers/${id}`);
          return data.data;
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
       async onUpdateProviderVerifyByID(id: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.put(`/api/profile/providers/${id}/verified?verified=true`,{});
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
      meds.onGetDataProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
      ss,
      data,
      meds,
      methods
    };
  },
});
