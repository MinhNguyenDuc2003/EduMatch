import React from 'react';
import { ControllerRenderProps, FieldValues, useFormContext, useFieldArray } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/cus/form';
import { Input } from '@/lib/cus/input';
import { Button } from '@/lib/cus/button';
import { Textarea } from '@/lib/cus/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/cus/select';
import { Switch } from '@/lib/cus/switch';
import { Edit, X, Plus } from 'lucide-react';

interface FormFieldProps {
  name?: string;
  label: React.ReactNode;
  type?:
    | 'text'
    | 'email'
    | 'textarea'
    | 'number'
    | 'select'
    | 'switch'
    | 'password'
    | 'file'
    | 'multi-input';
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
}) => {
  const { control } = useFormContext();

  const renderFormControl = (field: ControllerRenderProps<FieldValues, string>) => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={placeholder}
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
            onValueChange={(value) => {
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
            <SelectContent className="w-full bg-white border-customgreys-dirtyGrey shadow">
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
      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
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
