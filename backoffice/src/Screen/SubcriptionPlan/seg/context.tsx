'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiClientService from 'src/apiController/ApiClientService';
import { GenCtx } from 'src/apiController/GeneralContext';
import { ISubscriptionPlanList } from 'src/assets/types/SubscriptionPlanList';
import { sStore } from 'src/stores';
import { onSetLoading } from 'src/utils/eventBus';

export default GenCtx({
  useLogic() {
    type IForm = {
      fields: {
      SubcriptionPlan : ISubscriptionPlanList
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
    const loading = useState(false);
    const meds = {
      async onGetData() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(
            '/subscription/subscription/subscription/plans/all'
          );
          if (data) {
            ss.setJointData({
              SubscriptionPlanList: data || [],
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
          const data = await apiClientService.get(`/subscription/subscription/subscription/plans/${id}`);
          console.log('data.data', data.data)
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
    }, []);
    return {
      ss,
      meds,
      methods
    };
  },
});
