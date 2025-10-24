import { Country, District, ProfileApiResponse, StateOrProvince } from '@/@screen/Profile/types';
import { StateCreator } from 'zustand';

type State = {
  Applicant: {
    ApplicantProfile?: ProfileApiResponse;
    Countries?: Country[];
    StateOrProvinces?: StateOrProvince[];
    Districts?: District[];
  };
  setApplicantProfileData(Obj: State['Applicant']['ApplicantProfile']): void;
  setCountriesData(Obj: State['Applicant']['Countries']): void;
  setStateOrProvincesData(Obj: State['Applicant']['StateOrProvinces']): void;
  setDistrictsData(Obj: State['Applicant']['Districts']): void;
  resetApplicant(): void;
};

export const ApplicantSlice: StateCreator<State> = (set) => {
  return {
    Applicant: {},
    setApplicantProfileData(Obj) {
      set((state) => ({ Applicant: { ...state.Applicant, ApplicantProfile: Obj } }));
    },
    setCountriesData(Obj) {
      set((state) => ({ Applicant: { ...state.Applicant, Countries: Obj } }));
    },
    setStateOrProvincesData(Obj) {
      set((state) => ({ Applicant: { ...state.Applicant, StateOrProvinces: Obj } }));
    },
    setDistrictsData(Obj) {
      set((state) => ({ Applicant: { ...state.Applicant, Districts: Obj } }));
    },
    resetApplicant() {
      set({ Applicant: {} });
    },
  } as const;
};
