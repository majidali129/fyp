import { Control, useController } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import { ComponentProps } from "react";

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
  const {
    formState: { errors }
  } = useController({ control, name });
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...inputProps} {...field} type={type} />
          </FormControl>
          <FormMessage className="text-error-500" />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
