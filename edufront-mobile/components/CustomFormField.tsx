import { Edit } from "lucide-react-native";
import React, { useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

interface FormFieldProps {
  name?: string;
  label: React.ReactNode;
  type?:
    | "text"
    | "email"
    | "textarea"
    | "number"
    | "date"
    | "date-of-birth"
    | "select"
    | "switch"
    | "password"
    | "file"
    | "multi-input"
    | "multi-select";
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
  stringFormat?: "comma" | "json" | "pipe";
  editable?: boolean;
}

function isSecondsTimestamp(value: unknown): boolean {
  const isNumericString = typeof value === "string" && /^\d+$/.test(value);
  const numeric =
    typeof value === "number" || isNumericString ? Number(value) : NaN;
  return Number.isFinite(numeric) && numeric > 0 && numeric < 1e12;
}

function formatDateForDisplay(value: unknown): string {
  if (value === undefined || value === null || value === "") return "";
  const isNumericString = typeof value === "string" && /^\d+$/.test(value);
  if (typeof value === "number" || isNumericString) {
    const numeric = typeof value === "number" ? value : Number(value);
    const ms = numeric < 1e12 ? numeric * 1000 : numeric; // seconds vs ms
    try {
      const date = new Date(ms);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return "";
    }
  }
  if (typeof value === "string") {
    try {
      const date = new Date(value);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return value;
    }
  }
  return "";
}

function convertToDate(value: unknown): Date {
  if (value === undefined || value === null || value === "") return new Date();
  const isNumericString = typeof value === "string" && /^\d+$/.test(value);
  if (typeof value === "number" || isNumericString) {
    const numeric = typeof value === "number" ? value : Number(value);
    const ms = numeric < 1e12 ? numeric * 1000 : numeric; // seconds vs ms
    return new Date(ms);
  }
  if (typeof value === "string") {
    return new Date(value);
  }
  return new Date();
}

const DatePickerInput = ({
  field,
  placeholder,
  inputClassName,
  isBorder,
  initialValue,
  disabled,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder?: string;
  inputClassName?: string;
  isBorder?: boolean;
  initialValue?: string | number | boolean | string[];
  disabled?: boolean;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    if (!disabled) setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const tsMs = date.getTime();
    const original = field.value ?? initialValue;
    const shouldUseSeconds = isSecondsTimestamp(original);
    field.onChange(shouldUseSeconds ? Math.floor(tsMs / 1000) : tsMs);
    hideDatePicker();
  };

  const displayValue = formatDateForDisplay(field.value ?? initialValue);
  const selectedDate = convertToDate(field.value ?? initialValue);

  return (
    <>
      <Pressable onPress={showDatePicker}>
        <Input
          textContentType="none"
          placeholder={placeholder || "Select date"}
          value={displayValue}
          editable={false}
          pointerEvents="none"
          className={`${isBorder ? "border border-black" : "border-none"} bg-customgreys-darkGrey p-4 ${inputClassName}`}
        />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
      />
    </>
  );
};

const DateOfBirthPickerInput = ({
  field,
  placeholder,
  inputClassName,
  isBorder,
  initialValue,
  disabled,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder?: string;
  inputClassName?: string;
  isBorder?: boolean;
  initialValue?: string | number | boolean | string[];
  disabled?: boolean;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    if (!disabled) setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // Save as yyyy-mm-dd string format instead of timestamp
    const dateString = date.toISOString().slice(0, 10);
    field.onChange(dateString);
    hideDatePicker();
  };

  const displayValue = formatDateForDisplay(field.value ?? initialValue);
  const selectedDate = convertToDate(field.value ?? initialValue);

  return (
    <>
      <Pressable onPress={showDatePicker}>
        <Input
          placeholder={placeholder || "Select date of birth"}
          value={displayValue}
          editable={false}
          pointerEvents="none"
          textContentType="none"
          className={`${isBorder ? "border border-black" : "border-none"} bg-customgreys-darkGrey text-xs  p-2 ${inputClassName}`}
        />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
      />
    </>
  );
};

const CustomFormField = ({
  name,
  label,
  type = "text",
  placeholder,
  options,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  editable = true,
  isIcon = false,
  initialValue,
  inlineLabel,
  isBorder,
  stringFormat = "comma",
}: FormFieldProps) => {
  const { control } = useFormContext();

  const renderFormControl = (
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            placeholder={placeholder}
            {...field}
            onChangeText={(value) => field.onChange(value)}
            className={`${isBorder ? "border border-black" : "border-none"} bg-customgreys-darkGrey p-4 ${inputClassName}`}
          />
        );
      case "select":
        return (
          <Select
            value={{
              value: field.value || initialValue || "",
              label:
                options?.find((option) => option.value === field.value)
                  ?.label || "",
            }}
            defaultValue={{
              value: field.value || initialValue || "",
              label:
                options?.find((option) => option.value === field.value)
                  ?.label || "",
            }}
            onValueChange={(option) => {
              // Convert back to number if the original value was a number
              const numValue = Number(option?.value);
              field.onChange(isNaN(numValue) ? option?.value : numValue);
            }}
          >
            <SelectTrigger
              className={`w-full ${isBorder ? "border border-black" : "border-none"} bg-customgreys-primarybg  ${inputClassName}`}
            >
              <SelectValue placeholder={placeholder || ""} />
            </SelectTrigger>
            <SelectContent
              className=" bg-white border-customgreys-dirtyGrey shadow max-h-64 overflow-y-auto w-[200px]"
              style={{ backgroundColor: "#fff" }}
            >
              <NativeSelectScrollView>
                {options?.map((option) => (
                  <SelectItem
                    label={option.label}
                    key={String(option.value)}
                    value={String(option.value)}
                    className={`text-xs `}
                  />
                ))}
              </NativeSelectScrollView>
            </SelectContent>
          </Select>
        );
      case "switch":
        return (
          <View className="flex flex-row gap-2 items-center space-x-2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
              className={`text-customgreys-dirtyGrey ${inputClassName}`}
            />
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}
            </FormLabel>
          </View>
        );

      case "number":
        return (
          <Input
            placeholder={placeholder}
            {...field}
            editable={editable}
            onChangeText={(value) => field.onChange(Number(value))}
            className={`${isBorder ? "border border-black" : "border-none"} bg-customgreys-darkGre h-8 ${inputClassName}`}
          />
        );

      case "date":
        return (
          <DatePickerInput
            field={field}
            placeholder={placeholder}
            inputClassName={inputClassName}
            isBorder={isBorder}
            initialValue={initialValue}
            disabled={disabled}
          />
        );

      case "date-of-birth":
        return (
          <DateOfBirthPickerInput
            field={field}
            placeholder={placeholder}
            inputClassName={inputClassName}
            isBorder={isBorder}
            initialValue={initialValue}
            disabled={disabled}
          />
        );
      default:
        return (
          <Input
            // type={type}
            placeholder={placeholder}
            {...field}
            editable={editable}
            onChangeText={(value) => field.onChange(value)}
            className={`${isBorder ? "border border-black" : "border-none"} bg-customgreys-primarybg text-xs h-8 ${inputClassName}`}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name || ""}
      defaultValue={initialValue}
      render={({ field }) => (
        <FormItem
          className={`${type !== "switch" && "rounded-md"} relative ${className} ${
            inlineLabel ? "flex flex-row items-center gap-3" : ""
          }`}
        >
          {type !== "switch" && (
            <FormLabel
              className={`text-customgreys-dirtyGrey text-xs ${labelClassName} ${
                inlineLabel ? "mb-0 w-24 flex-shrink-0" : ""
              }`}
            >
              {label}
            </FormLabel>
          )}

          <View className="flex-1 ">
            <FormControl>
              {renderFormControl({
                ...field,
                value: field.value ?? initialValue ?? "",
              })}
            </FormControl>
            <FormMessage style={{ color: "#f87171" }} />
          </View>

          {!disabled &&
            isIcon &&
            type !== "file" &&
            type !== "multi-input" &&
            !inlineLabel && (
              <Edit className="size-4 text-customgreys-dirtyGrey" />
            )}
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

const styles = StyleSheet.create({});
