import { Control, useController } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import { ComponentProps, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  label?: string;
  control: Control<any>;
  type?: string;
}
const TextInput = ({
  type = "text",
  name,
  label,
  control,
  ...inputProps
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    fieldState: { error, isTouched },
    field
  } = useController({ control, name });
  const isFilled = field.value !== "";

  if (type === "password") {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl className="border border-blue-500">
              <div className="flex relative">
                <Input
                  {...inputProps}
                  {...field}
                  type={showPassword ? "text" : type}
                  className={`${
                    isFilled && !error
                      ? "ring-success-500"
                      : error
                      ? "bg-error-50 ring-error-500"
                      : ""
                  }`}
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
            {/* <div>
              <Input
                {...inputProps}
                {...field}
                type={type}
                className={`${
                  isFilled && !error
                    ? "ring-success-500"
                    : error
                    ? "bg-error-50 ring-error-500"
                    : ""
                }`}
              />
            </div> */}
            <div className="flex relative">
              <Input
                {...inputProps}
                {...field}
                type={showPassword ? "text" : type}
                className={`${
                  isFilled && !error
                    ? "ring-success-500"
                    : error
                    ? "bg-error-50 ring-error-500"
                    : ""
                }`}
              />
              {isFilled && !error && (
                <span className="absolute right-3 cursor-pointer  top-1/2 -translate-y-1/2">
                  <FaCheckCircle className="text-success-500" />
                </span>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-error-500" />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
