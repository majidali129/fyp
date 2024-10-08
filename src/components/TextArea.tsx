import { Control, useController } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { ComponentProps } from "react";
import clsx from "clsx";

interface TextAreaProps extends ComponentProps<"textarea"> {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
}
const TextArea = ({
  control,
  name,
  label,
  className,
  ...props
}: TextAreaProps) => {
  const { field } = useController({ control, name });
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <>
            <Textarea
              {...props}
              className={clsx(`resize-none border-gray-100`, className)}
              {...field}
              />
            <FormMessage className="text-error-400" />
              </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TextArea;
