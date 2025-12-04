'use client';

import { useAppDispatch, useAppSelector } from '@/state/redux';
import {
  addScholarship,
  removeScholarship,
  clearAllScholarships,
  clearScholarshipStorage,
} from '@/state';

export const useScholarshipCompareStore = () => {
  const dispatch = useAppDispatch();
  const scholarships = useAppSelector((state) => state.global.scholarshipCompare.scholarships);

  return {
    scholarships,
    addScholarship: (scholarship: Scholarship) => {
      dispatch(addScholarship(scholarship));
    },
    removeScholarship: (scholarshipId: number) => {
      dispatch(removeScholarship(scholarshipId));
    },
    clearAll: () => {
      dispatch(clearAllScholarships());
    },
    isScholarshipSelected: (scholarshipId: number) => {
      return scholarships.some((s) => s.id === scholarshipId);
    },
    clearStorage: () => {
      dispatch(clearScholarshipStorage());
      if (typeof window !== 'undefined') {
        localStorage.removeItem('scholarship-compare-storage');
      }
    },
  };
};
