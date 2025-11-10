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
        SubcriptionPlan: ISubscriptionPlanList;
      };
      filters: object;
    };
    const ss = sStore();
    const methods = useForm<IForm>({
      mode: 'onChange',
      reValidateMode: 'onSubmit',
      defaultValues: {
        fields: {},
        filters: {},
      },
    });
    const loading = useState(false);
    const { getValues } = methods;
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
          const data = await apiClientService.get(
            `/subscription/subscription/subscription/plans/${id}`
          );
          console.log('data.data', data.data);
          return data.data;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },

      async onCreate(plan: ISubscriptionPlanList) {
        onSetLoading(true);
        try {
          const data = await apiClientService.post(
            `/subscription/subscription/subscription/plans`,
            {
              name: plan.name,
              description: plan.description,
              currency: plan.currency,
              price: plan.price,
              durationDays: plan.durationDays,
              targetType: plan.targetType,
              features: plan.features,
            }
          );
          console.log('Created plan:', data.data);
          return data.data;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onUpdate(id : string, plan: ISubscriptionPlanList ) {
        onSetLoading(true);
        try {
          const data = await apiClientService.put(
            `/subscription/subscription/subscription/plans`,
            {
              id: id,
              name: plan.name,
              description: plan.description,
              currency: plan.currency,
              price: plan.price,
              durationDays: plan.durationDays,
              targetType: plan.targetType,
              features: plan.features,
            }
          );
          console.log('Update plan:', data.data);
          return data.data;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onDelete(id: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.delete(
            `/subscription/subscription/subscription/plans/${id}`
          );
          console.log('Delete plan:', data.data);
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
      methods,
    };
  },
});
