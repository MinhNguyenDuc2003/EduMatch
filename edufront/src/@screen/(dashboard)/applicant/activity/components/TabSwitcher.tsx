'use client';

import { type ShortlistTab, type TabConfig } from '../types';

type TabSwitcherProps = {
  tabs: TabConfig[];
  activeTab: ShortlistTab;
  onTabChange: (tab: ShortlistTab) => void;
  counts: Record<ShortlistTab, number>;
};

export default function TabSwitcher({ tabs, activeTab, onTabChange, counts }: TabSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-slate-100 p-1.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const count = counts[tab.key];

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`relative px-6 py-3 text-sm font-semibold transition-all rounded-xl ${
              isActive ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              {count > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

