'use client';

import { type ShortlistTab, type TabConfig } from '../types';

type TabSwitcherProps = {
  tabs: TabConfig[];
  activeTab: ShortlistTab;
  onTabChange: (tab: ShortlistTab) => void;
};

export default function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center justify-start gap-2 rounded-lg bg-[#3D6CB9] p-1.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`relative px-2 py-1 text-sm font-semibold transition-all rounded-md ${
              isActive ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-300 hover:text-slate-50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
