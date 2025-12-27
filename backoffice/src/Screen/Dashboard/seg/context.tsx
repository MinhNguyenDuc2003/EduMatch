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
      async onGetDataTopApply() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/scholarship/applications-scholarship/top-applied');
          if (data) {
             ss.setJointData({
              TopApply : data.data || [],
            });
            console.log('TopApply', data.data);
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
              TopView : data.data || [],
            });
            console.log('TopView', data.data);
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
          const data = await apiClientService.get('/api/subscription/subscription/payments/revenue-by-usertype');
          if (data) {
             ss.setJointData({
              RevenueByUsertype: data.data || [],
            });
            console.log('phần trăm danh thu từ provider và applicant', data);
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
          const data = await apiClientService.get('/api/subscription/subscription/payments/revenue-by-month');
          if (data) {
            ss.setJointData({
              RevenueByMonth: data.data || [],
            });
            console.log('số subscription đã được đk theo tháng năm , + số tiền ', data);
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
              RevenueMonthly: data.data || [],
            });
            console.log('số tiền đã thu được theo tháng, năm', data);
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
              ScholarshipCreatedInMonth: data.data || [],
            });
            console.log('só lượng scholarship đã được tạo theo tháng, năm', data);
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
              ReportsStatistics: data.data || [],
            });
            console.log('phần trăm số lượng report của provider, applicant, system , AI trong tháng', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onGetDataTopCountry() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/scholarship/scholarships/statistics/top-country');
          if (data) {
            ss.setJointData({
              TopCountry: data.data || [],
            });
            console.log('top 5 quốc gia của Applicant, Provider , Scholarship', data);
          }
          return;
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
      async onGetDataAmountViewApplyApproveReject() {
        onSetLoading(true);
        try {
          const data = await apiClientService.get('/api/scholarship/scholarships/provider/statistics');
          if (data) {
            ss.setJointData({
              AmountViewApplyApproveReject: data.data || [],
            });
            console.log('số lượng view, apply, approve , reject', data);
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
      meds.onGetDataTopApply();
      meds.onGetDataTopView();
      meds.onGetDataRevenueByMonth();
      meds.onGetDataRevenueMonthly();
      meds.onGetDataRevenueByUsertype();
      meds.onGetDataTopCountry()
      meds.onGetDataAmountViewApplyApproveReject()
      meds.onGetDataReportsStatistics();
      meds.onGetDataScholarshipCreatedInMonth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
      ss,meds,
      methods
    };
  },
});
