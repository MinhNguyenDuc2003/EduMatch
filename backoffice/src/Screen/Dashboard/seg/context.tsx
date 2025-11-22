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
      async onGetDataRevenueByUsertype() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/subscription/subscription/orders/revenue-by-usertype');
          if (data) {
             ss.setJointData({
              RevenueByUsertype: data || [],
            });
            console.log('revenue-by-usertype', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onGetDataRevenueByMonth() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/subscription/subscription/orders/revenue-by-month');
          if (data) {
            ss.setJointData({
              RevenueByMonth: data || [],
            });
            console.log('revenue-by-month', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onGetDataRevenueMonthly() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/subscription/subscription/orders/monthly-revenue');
          if (data) {
            ss.setJointData({
              RevenueMonthly: data || [],
            });
            console.log('monthly-revenue', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
    };

    useEffect(() => {
      meds.onGetDataRevenueByMonth();
      meds.onGetDataRevenueByUsertype();
      meds.onGetDataRevenueMonthly();
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
