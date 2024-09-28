"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, useController } from "react-hook-form";

type SelectItemsType = Array<{ label: string; value: string }>;

interface SelectOptionProp {
  selectItems: SelectItemsType;
  className?: string;
  placeholder?: string;
  control: Control<any>;
  name: string;
  label?: string;
}

const SelectOption = ({
  name,
  control,
  selectItems,
  className,
  placeholder,
  label,
}: SelectOptionProp) => {
  const { field, fieldState: {error} } = useController({ control, name });
  console.log(error)

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
          <FormItem className="space-y-1.5">
            {label && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className={`w-full rounded-sm ${className}`}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <FormMessage className="text-error-400" />
              <SelectContent>
                {selectItems.map((item) => (
                  <SelectItem value={item.value} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
      )}
    />
  );
};

export default SelectOption;
