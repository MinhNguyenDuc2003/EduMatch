'use client';

import * as React from 'react';
import MultipleSelector, { Option } from './multi-select';

interface StringMultiSelectProps {
  value?: string; // String value (comma-separated or JSON)
  onChange?: (value: string) => void;
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  badgeClassName?: string;
  maxSelected?: number;
  onMaxSelected?: (maxLimit: number) => void;
  hidePlaceholderWhenSelected?: boolean;
  hideClearAllButton?: boolean;
  creatable?: boolean;
  // Format options
  stringFormat?: 'comma' | 'json' | 'pipe'; // comma-separated, JSON array, pipe-separated
}

export const StringMultiSelect: React.FC<StringMultiSelectProps> = ({
  value = '',
  onChange,
  options = [],
  placeholder = 'Select items...',
  disabled = false,
  className,
  badgeClassName,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  hidePlaceholderWhenSelected = true,
  hideClearAllButton = false,
  creatable = false,
  stringFormat = 'comma',
}) => {
  // Convert string to Option array
  const stringToOptions = React.useCallback(
    (str: string): Option[] => {
      if (!str || str.trim() === '') return [];

      try {
        switch (stringFormat) {
          case 'json':
            const parsed = JSON.parse(str);
            if (Array.isArray(parsed)) {
              return parsed.map((item, index) =>
                typeof item === 'string'
                  ? { value: item, label: item }
                  : {
                      value: item.value || String(index),
                      label: item.label || String(item.value || index),
                    }
              );
            }
            return [];
          case 'pipe':
            return str.split('|').map((item) => ({ value: item.trim(), label: item.trim() }));
          case 'comma':
          default:
            return str.split(',').map((item) => ({ value: item.trim(), label: item.trim() }));
        }
      } catch (error) {
        console.warn('Error parsing string value:', error);
        return [];
      }
    },
    [stringFormat]
  );

  // Convert Option array to string
  const optionsToString = React.useCallback(
    (opts: Option[]): string => {
      if (!opts || opts.length === 0) return '';

      switch (stringFormat) {
        case 'json':
          return JSON.stringify(opts.map((opt) => ({ value: opt.value, label: opt.label })));
        case 'pipe':
          return opts.map((opt) => opt.value).join('|');
        case 'comma':
        default:
          return opts.map((opt) => opt.value).join(',');
      }
    },
    [stringFormat]
  );

  // Convert options to Option format
  const convertedOptions = React.useMemo(
    () =>
      options.map((option) => ({
        value: String(option.value),
        label: option.label,
      })),
    [options]
  );

  // Current selected options
  const selectedOptions = React.useMemo(() => stringToOptions(value), [value, stringToOptions]);

  // Handle change
  const handleChange = React.useCallback(
    (newOptions: Option[]) => {
      const stringValue = optionsToString(newOptions);
      onChange?.(stringValue);
    },
    [onChange, optionsToString]
  );

  return (
    <MultipleSelector
      value={selectedOptions}
      onChange={handleChange}
      options={convertedOptions}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      badgeClassName={badgeClassName}
      maxSelected={maxSelected}
      onMaxSelected={onMaxSelected}
      hidePlaceholderWhenSelected={hidePlaceholderWhenSelected}
      hideClearAllButton={hideClearAllButton}
      creatable={creatable}
      emptyIndicator={<p className="text-center text-sm">No results found</p>}
    />
  );
};

export default StringMultiSelect;
