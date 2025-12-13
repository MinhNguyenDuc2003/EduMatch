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
      async onGetDataTopApply() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/scholarship/applications-scholarship/top-applied');
          if (data) {
             ss.setJointData({
              TopApply : data || [],
            });
            console.log('TopApply', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onGetDataTopView() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/scholarship/scholarships/top-views/month');
          if (data) {
             ss.setJointData({
              TopView : data || [],
            });
            console.log('TopView', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
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
          const data = await apiClientService.get('/api/subscription/subscription/payments/monthly-revenue');
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
      async onGetDataScholarshipCreatedInMonth() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/scholarship/scholarships/statistics/created/year-month');
          if (data) {
            ss.setJointData({
              ScholarshipCreatedInMonth: data || [],
            });
            console.log('ScholarshipCreatedInMonth', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onGetDataReportsStatistics() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/report/reports/statistics');
          if (data) {
            ss.setJointData({
              ReportsStatistics: data || [],
            });
            console.log('ReportsStatistics', data);
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
      // meds.onGetDataRevenueByMonth();
      meds.onGetDataRevenueMonthly();
      // meds.onGetDataTopApply();
      // meds.onGetDataTopView();
      meds.onGetDataReportsStatistics();
      meds.onGetDataScholarshipCreatedInMonth();
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
