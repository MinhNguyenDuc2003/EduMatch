type RightSidebarProps = {
  activeTab: 'scholarships' | 'research';
  setActiveTab: (tab: 'scholarships' | 'research') => void;
  scholarshipsCount: number;
  researchCount: number;
};

export default function RightSidebar({
  activeTab,
  setActiveTab,
  scholarshipsCount,
  researchCount,
}: RightSidebarProps) {
  return (
    <div className="space-y-4 sticky top-24">
      {/* Scholarships Tab */}
      <button
        onClick={() => setActiveTab('scholarships')}
        className={`w-full px-6 py-4 rounded-lg font-semibold text-left transition-all shadow-sm ${
          activeTab === 'scholarships'
            ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{scholarshipsCount}</span>
          <span className="text-sm">Matched Scholarships</span>
        </div>
      </button>

      {/* Research Opportunities Tab */}
      <button
        onClick={() => setActiveTab('research')}
        className={`w-full px-6 py-4 rounded-lg font-semibold text-left transition-all shadow-sm ${
          activeTab === 'research'
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{researchCount}</span>
          <span className="text-sm">Research Opportunities</span>
        </div>
      </button>
    </div>
  );
}
