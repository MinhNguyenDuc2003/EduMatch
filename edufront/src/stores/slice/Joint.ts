import { StateCreator } from 'zustand';

type IListScholarshipOpportunities = {
  Id?: number;
  Provider_id?: number;
  Title?: string;
  Slug?: string;
  Short_description?: string;
  Description?: string;
  Requirements?: string;
  Benefits?: string;
  Fields?: string;
  Country?: string;
  University?: string;
  Study_level?: string;
  Scholarship_type?: string;
  Funding_amount?: number;
  Start_date?: string;
  End_date?: string;
  Available_slots?: number;
  Language_requirement?: string;
  Gpa_requirement?: number;
};

type State = {
  Joint: {
    ListScholarshipOpportunities?: IListScholarshipOpportunities[];
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
