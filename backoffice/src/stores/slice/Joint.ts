import { IApplicationItem } from 'src/assets/types/ApplicationScholarship';
import { INews } from 'src/assets/types/News';
import { IOrderList } from 'src/assets/types/Orders';
import { IProviders } from 'src/assets/types/Providers';
import { IReportList } from 'src/assets/types/Report';
import { IRevenueByMonth } from 'src/assets/types/RevenueByMonth';
import { IRevenueByUsertype } from 'src/assets/types/RevenueByUsertype';
import { IRevenueMonthly } from 'src/assets/types/RevenueMonthly';
import { IStudents } from 'src/assets/types/Student';
import { ISubcriptionList } from 'src/assets/types/SubcriptionList';
import { ISubscriptionPlanList } from 'src/assets/types/SubscriptionPlanList';
import { StateCreator } from 'zustand';

type State = {
  Joint: {
    ScholarshipList?: IScholarshipList[];
    SubscriptionPlanList?: ISubscriptionPlanList[];
    SubcriptionList?: ISubcriptionList[];
    ApplicationItem?: IApplicationItem[];
    ReportList?: IReportList[];
    OrderList?: IOrderList[];
    RevenueByUsertype?: IRevenueByUsertype[];
    RevenueByMonth?: IRevenueByMonth[];
    RevenueMonthly?: IRevenueMonthly[];
    News?: INews[];
    Provider?: IProviders[];
    Students?: IStudents[];
    TopApply?: ITopApply[];
    TopView?: ITopView[];
    formFocusID?: string;
  };
  setJointData(Obj: State['Joint']): void;
  resetJoint(): void;
};

export const JointSlice: StateCreator<State> = (set) => {
  return {
    Joint: {},
    setJointData(Obj) {
      set((state) => ({ Joint: { ...state.Joint, ...Obj } }));
    },
    resetJoint() {
      set({ Joint: {} });
    },
  } as const;
};
