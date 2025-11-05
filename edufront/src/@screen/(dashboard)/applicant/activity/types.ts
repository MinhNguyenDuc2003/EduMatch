export type ShortlistTab = 'tracking' | 'applied' | 'following';

export type TabConfig = {
  key: ShortlistTab;
  label: string;
  title: string;
  description: string;
  bgGradient: string;
};

export const TAB_CONFIGS: TabConfig[] = [
  {
    key: 'tracking',
    label: 'Shortlist',
    title: 'Scholarships You Are Tracking',
    description:
      'Keep every opportunity you are monitoring in one place. Review benefits, follow deadlines, and be ready to apply when the timing is right.',
    bgGradient: 'from-blue-600 via-purple-600 to-pink-500',
  },
  {
    key: 'applied',
    label: 'Applied',
    title: 'Your Applications',
    description:
      'Track all scholarships you have applied to. Monitor application status, review submission details, and follow up on your opportunities.',
    bgGradient: 'from-emerald-600 via-teal-600 to-cyan-500',
  },
  {
    key: 'following',
    label: 'Following',
    title: 'Providers You Follow',
    description:
      'Stay connected with scholarship providers you are interested in. Get updates on new opportunities and never miss a relevant scholarship.',
    bgGradient: 'from-orange-600 via-red-600 to-pink-600',
  },
];
