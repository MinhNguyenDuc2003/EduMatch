import { StateCreator } from "zustand";

type State = {
  Joint: {
    ListTest?: IListTest[];
  };
  setJointData(Obj: State["Joint"]): void;
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
