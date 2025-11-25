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
    label: t('activity.tabs.tracking.label'),
    title: t('activity.tabs.tracking.title'),
    description: t('activity.tabs.tracking.description'),
    bgGradient: 'from-blue-600 via-purple-600 to-pink-500',
  },
  {
    key: 'applied',
    label: t('activity.tabs.applied.label'),
    title: t('activity.tabs.applied.title'),
    description: t('activity.tabs.applied.description'),
    bgGradient: 'from-emerald-600 via-teal-600 to-cyan-500',
  },
  {
    key: 'following',
    label: t('activity.tabs.following.label'),
    title: t('activity.tabs.following.title'),
    description: t('activity.tabs.following.description'),
    bgGradient: 'from-orange-600 via-red-600 to-pink-600',
  },
  {
    key: 'application',
    label: t('activity.tabs.application.label'),
    title: t('activity.tabs.application.title'),
    description: t('activity.tabs.application.description'),
    bgGradient: 'from-green-600 via-lime-600 to-emerald-500',
  },
];
