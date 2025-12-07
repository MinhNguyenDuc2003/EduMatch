import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ScholarshipCompareStore {
  scholarships: Scholarship[];
  addScholarship: (scholarship: Scholarship) => void;
  removeScholarship: (scholarshipId: number) => void;
  clearAll: () => void;
  isScholarshipSelected: (scholarshipId: number) => boolean;
  clearStorage: () => void;
}

const MAX_SCHOLARSHIPS = 3;

export const useScholarshipCompareStore = create<ScholarshipCompareStore>()(
  persist(
    (set, get) => ({
      scholarships: [],
      addScholarship: (scholarship) => {
        const current = get().scholarships;
        if (current.some((s) => s.id === scholarship.id)) {
          return;
        }
        if (current.length >= MAX_SCHOLARSHIPS) {
          return;
        }
        set({ scholarships: [...current, scholarship] });
      },
      removeScholarship: (scholarshipId) => {
        set({
          scholarships: get().scholarships.filter((s) => s.id !== scholarshipId),
        });
      },
      clearAll: () => {
        set({ scholarships: [] });
      },
      isScholarshipSelected: (scholarshipId) => {
        return get().scholarships.some((s) => s.id === scholarshipId);
      },
      clearStorage: () => {
        // Clear both state and localStorage
        set({ scholarships: [] });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('scholarship-compare-storage');
        }
      },
    }),
    {
      name: 'scholarship-compare-storage',
    }
  )
);
