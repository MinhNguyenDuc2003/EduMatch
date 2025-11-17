export type ShortlistTab = 'tracking' | 'applied' | 'following' | 'application';

export type TabConfig = {
  key: ShortlistTab;
  label: string;
  title: string;
  description: string;
  bgGradient: string;
};

export const getTabConfigs = (t: (key: string) => string): TabConfig[] => [
  {
    key: 'tracking',
    label: t('homepage.activity.tabs.tracking.label'),
    title: t('homepage.activity.tabs.tracking.title'),
    description: t('homepage.activity.tabs.tracking.description'),
    bgGradient: 'from-blue-600 via-purple-600 to-pink-500',
  },
  {
    key: 'applied',
    label: t('homepage.activity.tabs.applied.label'),
    title: t('homepage.activity.tabs.applied.title'),
    description: t('homepage.activity.tabs.applied.description'),
    bgGradient: 'from-emerald-600 via-teal-600 to-cyan-500',
  },
  {
    key: 'following',
    label: t('homepage.activity.tabs.following.label'),
    title: t('homepage.activity.tabs.following.title'),
    description: t('homepage.activity.tabs.following.description'),
    bgGradient: 'from-orange-600 via-red-600 to-pink-600',
  },
  {
    key: 'application',
    label: t('homepage.activity.tabs.application.label'),
    title: t('homepage.activity.tabs.application.title'),
    description: t('homepage.activity.tabs.application.description'),
    bgGradient: 'from-green-600 via-lime-600 to-emerald-500',
  },
];
