'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClientService from 'src/apiController/ApiClientService';
import { GenCtx } from 'src/apiController/GeneralContext';
import { sStore } from 'src/stores';
import { onSetLoading } from 'src/utils/eventBus';


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
      async onGetData() {
        onSetLoading(true);
        console.log('dfffffffffff');
        try {
          const data = await apiClientService.get('/api/report/reports/all');
          if (data) {
            ss.setJointData({
              ReportList: data || [],
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

      async onGetByID(id: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(`/api/report/reports/${id}`);
          console.log(data.data);

          return data.data;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onReply(id: string, content: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.post(`/api/report/reports/${id}/reply`, content);
          return data.data;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
    };

    useEffect(() => {
      meds.onGetData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
      ss,meds,
      methods,
    };
  },
});
