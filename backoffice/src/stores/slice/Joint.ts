import { IApplicationItem } from 'src/assets/types/ApplicationScholarship';
import { INews } from 'src/assets/types/News';
import { ISubcriptionList } from 'src/assets/types/SubcriptionList';
import { ISubscriptionPlanList } from 'src/assets/types/SubscriptionPlanList';
import { StateCreator } from 'zustand';

type State = {
  Joint: {
    ScholarshipList?: IScholarshipList[];
    SubscriptionPlanList?: ISubscriptionPlanList[];
    SubcriptionList?: ISubcriptionList[];
    ApplicationItem?: IApplicationItem[];
    News?: INews[];
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
