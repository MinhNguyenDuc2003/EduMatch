'use client';

import { useEffect } from 'react';
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
        SubscriptionPlan: ISubscriptionPlanList;
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
    // const loading = useState(false);
    // const { getValues } = methods;
    const meds = {
      async onGetData() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(
            '/api/subscription/subscription/subscription/plans/all'
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
            `/api/subscription/subscription/subscription/plans/${id}`
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
          const featuresString = (plan?.features as any).join(", ");

          const data = await apiClientService.post(
            `/api/subscription/subscription/subscription/plans`,
            {
              name: plan.name,
              description: plan.description,
              currency: plan.currency,
              price: Number(plan.price),          // chuyển string -> number
              durationDays: Number(plan.durationDays), // chuyển string -> number
              targetType: plan.targetType,
              features: Array.isArray(plan.features) ? plan.features : plan.features?.split(',') || [],
            }
          );
          console.log('Created plan:', data.data);
          if (data !== null) {
            alert('Create subscriptions successfull')
            window.location.reload()

          }
          return data.data;
        } catch (error) {
          alert('Create subscriptions failed')
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onUpdate(id: string, plan: ISubscriptionPlanList) {
        onSetLoading(true);

        try {
          const data = await apiClientService.put(
            `/api/subscription/subscription/subscription/plans`,
            {
              id: id,
              name: plan.name,
              description: plan.description,
              currency: plan.currency,
              price: Number(plan.price),
              durationDays: Number(plan.durationDays),
              targetType: plan.targetType,
              features: Array.isArray(plan.features) ? plan.features : plan.features?.split(',') || [],
            }
          );
          console.log('Update plan:', data.data);
          if (data !== null) {
            alert('Update subscriptions successfull')
            window.location.reload()
          }
          return data.data;
        } catch (error) {
          alert('Update subscriptions failed')
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },

      async onDelete(id: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.delete(
            `/api/subscription/subscription/subscription/plans/${id}`
          );
          if(data !== null){
            alert('Delete subscriptions failed')
            window.location.reload()
          }
          console.log('Delete plan:', data.data);
              return data?.data ?? true;   
        } catch (error) {
          alert('Delete subscriptions failed')
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
      meds,
      methods,
    };
  },
});
