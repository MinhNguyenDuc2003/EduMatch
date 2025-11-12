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
      async onGetData() {
        onSetLoading(true);
        try {
          const data = await apiClientService.post('/api/scholarship/scholarships/page', {
            criteria: {
              country: '',
              university: '',
              studyLevel: '',
              scholarshipType: '',
            },
            sortBy: 'id',
            sortDirection: 'DESC',
            page: 0,
            size: 50,
          });
          if (data) {
            ss.setJointData({
              ScholarshipList: data || [],
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
          const data = await apiClientService.get(`/api/scholarship/scholarships/${id}`);
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
      ss,
      data,
      meds,
      methods,
    };
  },
});
