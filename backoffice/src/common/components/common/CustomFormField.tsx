import React from 'react';
import { ControllerRenderProps, FieldValues, useFormContext, useFieldArray } from 'react-hook-form';
import { Edit, X, Plus } from 'lucide-react';
// import MultipleSelector from './multi-select';
import StringMultiSelect from './string-multi-select';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Switch } from './switch';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Button } from './button';

// Helpers to convert between timestamp values and <input type="date"> value (yyyy-mm-dd)
function toDateInputValue(value: unknown): string {
  if (value === undefined || value === null || value === '') return '';
  const isNumericString = typeof value === 'string' && /^\d+$/.test(value);
  if (typeof value === 'number' || isNumericString) {
    const numeric = typeof value === 'number' ? value : Number(value);
    const ms = numeric < 1e12 ? numeric * 1000 : numeric; // seconds vs ms
    try {
      return new Date(ms).toISOString().slice(0, 10);
    } catch {
      return '';
    }
  }
  if (typeof value === 'string') {
    // If already yyyy-mm-dd, pass through; else try to parse
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return new Date(parsed).toISOString().slice(0, 10);
  }
  return '';
}

function fromDateInputValueToTimestamp(value: string): number | '' {
  if (!value) return '';
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? '' : parsed;
}

function isSecondsTimestamp(value: unknown): boolean {
  const isNumericString = typeof value === 'string' && /^\d+$/.test(value);
  const numeric = typeof value === 'number' || isNumericString ? Number(value) : NaN;
  return Number.isFinite(numeric) && numeric > 0 && numeric < 1e12;
}

interface FormFieldProps {
  name?: string;
  label: React.ReactNode;
  type?:
    | 'text'
    | 'email'
    | 'textarea'
    | 'number'
    | 'date'
    | 'select'
    | 'switch'
    | 'password'
    | 'file'
    | 'multi-input'
    | 'multi-select';
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  accept?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: string;
  disabled?: boolean;
  multiple?: boolean;
  isIcon?: boolean;
  initialValue?: string | number | boolean | string[];
  inlineLabel?: boolean;
  isBorder?: boolean;
  stringFormat?: 'comma' | 'json' | 'pipe';
  rules?: any;
}

export const CustomFormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  options,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  isIcon = false,
  initialValue,
  inlineLabel,
  isBorder,
  rules,
  stringFormat = 'comma',
}) => {
  const { control } = useFormContext();

  const renderFormControl = (field: ControllerRenderProps<FieldValues, string>) => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            rows={3}
            className={`${isBorder ? 'border border-black' : 'border-none'} bg-customgreys-darkGrey p-4 ${inputClassName}`}
          />
        );
      case 'select':
        return (
          <Select
            value={String(field.value || initialValue || '')}
            defaultValue={String(field.value || initialValue || '')}
            onValueChange={(value: any) => {
              // Convert back to number if the original value was a number
              const numValue = Number(value);
              field.onChange(isNaN(numValue) ? value : numValue);
            }}
          >
            <SelectTrigger
              className={`w-full ${isBorder ? 'border border-black' : 'border-none'} bg-customgreys-primarybg p-4 ${inputClassName}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="w-full bg-white border-customgreys-dirtyGrey shadow max-h-64 overflow-y-auto">
              {options?.map((option) => (
                <SelectItem
                  key={String(option.value)}
                  value={String(option.value)}
                  className={`cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multi-select':
        return (
          <StringMultiSelect
            value={field.value || ''}
            onChange={field.onChange}
            options={options || []}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            stringFormat={stringFormat}
            hideClearAllButton
            hidePlaceholderWhenSelected
          />
        );
      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
              disabled={disabled}
              className={`text-customgreys-dirtyGrey ${inputClassName}`}
            />
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}
            </FormLabel>
          </div>
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={placeholder}
            {...field}
            className={`${isBorder ? 'border border-black' : 'border-none'} bg-customgreys-darkGrey p-4 ${inputClassName}`}
            disabled={disabled}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            placeholder={placeholder}
            value={toDateInputValue(field.value ?? initialValue)}
            onChange={(e) => {
              const inputValue = e.target.value;
              const tsMs = fromDateInputValueToTimestamp(inputValue);
              // Preserve the original unit: seconds if original looked like seconds, else ms
              if (tsMs === '') {
                field.onChange('');
                return;
              }
              const original = field.value ?? initialValue;
              const shouldUseSeconds = isSecondsTimestamp(original);
              field.onChange(shouldUseSeconds ? Math.floor((tsMs as number) / 1000) : tsMs);
            }}
            className={`${isBorder ? 'border border-black' : 'border-none'} bg-customgreys-darkGrey p-4 ${inputClassName}`}
            disabled={disabled}
          />
        );
      case 'multi-input':
        return (
          <MultiInputField
            name={name || ''}
            control={control}
            placeholder={placeholder}
            inputClassName={inputClassName}
          />
        );
      default:
        return (
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            className={`${isBorder ? 'border border-black' : 'border-none'} bg-customgreys-primarybg p-4 ${inputClassName}`}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name || ''}
      defaultValue={initialValue}
      rules={rules}
      render={({ field }) => (
        <FormItem
          className={`${type !== 'switch' && 'rounded-md'} relative ${className} ${
            inlineLabel ? 'flex items-center gap-3' : ''
          }`}
        >
          {type !== 'switch' && (
            <FormLabel
              className={`text-customgreys-dirtyGrey text-sm ${labelClassName} ${
                inlineLabel ? 'mb-0 w-20 flex-shrink-0' : ''
              }`}
            >
              {label}
            </FormLabel>
          )}

          <div className="flex-1">
            <FormControl>
              {renderFormControl({
                ...field,
                value: field.value ?? initialValue ?? '',
              })}
            </FormControl>
            <FormMessage className="text-red-400" />
          </div>

          {!disabled && isIcon && type !== 'file' && type !== 'multi-input' && !inlineLabel && (
            <Edit className="size-4 text-customgreys-dirtyGrey" />
          )}
        </FormItem>
      )}
    />
  );
};
interface MultiInputFieldProps {
  name: string;
  control: any;
  placeholder?: string;
  inputClassName?: string;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  name,
  control,
  placeholder,
  inputClassName,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <FormField
            control={control}
            name={`${name}.${index}`}
            render={({ field }) => (
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className={`flex-1 border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
                />
              </FormControl>
            )}
          />
          <Button
            type="button"
            onClick={() => remove(index)}
            variant="ghost"
            size="icon"
            className="text-customgreys-dirtyGrey"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append('')}
        variant="outline"
        size="sm"
        className="mt-2 text-customgreys-dirtyGrey"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};
