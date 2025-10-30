import { Edit } from "lucide-react-native";
import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { StyleSheet, View } from "react-native";
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
}

function toDateInputValue(value: unknown): string {
  if (value === undefined || value === null || value === "") return "";
  const isNumericString = typeof value === "string" && /^\d+$/.test(value);
  if (typeof value === "number" || isNumericString) {
    const numeric = typeof value === "number" ? value : Number(value);
    const ms = numeric < 1e12 ? numeric * 1000 : numeric; // seconds vs ms
    try {
      return new Date(ms).toISOString().slice(0, 10);
    } catch {
      return "";
    }
  }
  if (typeof value === "string") {
    // If already yyyy-mm-dd, pass through; else try to parse
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed))
      return new Date(parsed).toISOString().slice(0, 10);
  }
  return "";
}

function fromDateInputValueToTimestamp(value: string): number | "" {
  if (!value) return "";
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? "" : parsed;
}

function isSecondsTimestamp(value: unknown): boolean {
  const isNumericString = typeof value === "string" && /^\d+$/.test(value);
  const numeric =
    typeof value === "number" || isNumericString ? Number(value) : NaN;
  return Number.isFinite(numeric) && numeric > 0 && numeric < 1e12;
}

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
            keyboardType="numeric"
            placeholder={placeholder}
            {...field}
            value={String(field.value ?? initialValue ?? "")}
            onChangeText={(value) => field.onChange(Number(value))}
            className={`${isBorder ? "border border-black" : "border-none"} bg-customgreys-darkGre h-8 ${inputClassName}`}
          />
        );

      case "date":
        return (
          <Input
            textContentType="dateTime"
            placeholder={placeholder}
            value={toDateInputValue(field.value ?? initialValue)}
            onChangeText={(inputValue) => {
              const tsMs = fromDateInputValueToTimestamp(inputValue);
              // Preserve the original unit: seconds if original looked like seconds, else ms
              if (tsMs === "") {
                field.onChange("");
                return;
              }
              const original = field.value ?? initialValue;
              const shouldUseSeconds = isSecondsTimestamp(original);
              field.onChange(
                shouldUseSeconds ? Math.floor((tsMs as number) / 1000) : tsMs
              );
            }}
            className={`${isBorder ? "border border-black" : "border-none"} bg-customgreys-darkGrey p-4 ${inputClassName}`}
          />
        );
      default:
        return (
          <Input
            // type={type}
            placeholder={placeholder}
            {...field}
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
