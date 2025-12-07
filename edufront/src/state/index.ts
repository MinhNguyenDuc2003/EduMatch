import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const MAX_SCHOLARSHIPS = 3;

interface GlobalState {
  scholarshipCompare: {
    scholarships: Scholarship[];
  };
}

export const initialState: GlobalState = {
  scholarshipCompare: {
    scholarships: [],
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addScholarship: (state, action: PayloadAction<Scholarship>) => {
      const scholarship = action.payload;
      const current = state.scholarshipCompare.scholarships;

      // Check if already exists
      if (current.some((s) => s.id === scholarship.id)) {
        return;
      }

      // Check max limit
      if (current.length >= MAX_SCHOLARSHIPS) {
        return;
      }

      state.scholarshipCompare.scholarships.push(scholarship);
    },
    removeScholarship: (state, action: PayloadAction<number>) => {
      state.scholarshipCompare.scholarships = state.scholarshipCompare.scholarships.filter(
        (s) => s.id !== action.payload
      );
    },
    clearAllScholarships: (state) => {
      state.scholarshipCompare.scholarships = [];
    },
    clearScholarshipStorage: (state) => {
      state.scholarshipCompare.scholarships = [];
      // localStorage will be cleared in the action thunk or component
    },
  },
});

export const { addScholarship, removeScholarship, clearAllScholarships, clearScholarshipStorage } =
  globalSlice.actions;

export default globalSlice.reducer;
