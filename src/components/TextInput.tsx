'use client'

import { Control, useController } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { ComponentProps, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import clsx from "clsx";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  label?: string;
  control: Control<any>;
  type?: string;
  className?: string;
  count?: number;
}
const TextInput = ({
  type = "text",
  name,
  label,
  control,
  className,
  count,
  ...inputProps
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    fieldState: { error, isTouched },
    field,

  } = useController({ control, name, defaultValue: inputProps.defaultValue || '' });
  const value =
  type === "number" ? parseFloat(field.value || "0") : field.value;

const isFilled =
  type === "number"
    ? !isNaN(value) && value > 0
    : field.value?.trim() !== "";



  if (type === "password") {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="flex relative border border-gray-100">
                <Input
                  {...inputProps}
                  {...field}
                  type={showPassword ? "text" : type}
                  className={clsx(
                    `${
                      isFilled && !error
                        ? "ring-success-500"
                        : error
                        ? "bg-error-50 ring-error-500"
                        : ""
                    }`,
                    className
                  )}
                />
                <span
                  className="absolute right-3 cursor-pointer  top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
            </FormControl>
            <FormMessage className="text-error-500" />
          </FormItem>
        )}
      />
    );
  }


  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex relative">
              <Input
                {...inputProps}
                {...field}
                type={type}
                onChange={(e) => {
                  const value = type === 'number'? +e.target.value: e.target.value;
                  field.onChange(value)
                }}
                className={clsx(
                  `${
                    isFilled && !error
                      ? "ring-success-500"
                      : error
                      ? "bg-error-50 ring-error-500"
                      : ""
                  }`,
                  className
                )}
              />
              {isFilled && !error && !count && type !== 'number' && (
                <span className="absolute right-3 cursor-pointer  top-1/2 -translate-y-1/2">
                  <FaCheckCircle className="text-success-500" />
                </span>
              )}

              {
                !error && count && (
                  <span className="absolute right-3 cursor-pointer  top-1/2 -translate-y-1/2"> {0} / {count} </span>
                )
              }
            </div>
          </FormControl>
          <FormMessage className="text-error-500" />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
