import { Search } from 'lucide-react';

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  iconSize?: string;
};

export default function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  onKeyDown,
  className = '',
  inputClassName = '',
  iconSize = 'w-4 h-4',
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconSize} text-gray-400 z-10`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className={`w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm ${inputClassName}`}
      />
    </div>
  );
}
