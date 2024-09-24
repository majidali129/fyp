import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { Control, useController } from "react-hook-form";

interface InputProps extends ComponentProps<'input'> {
  icon: ReactNode | string;
  name: string;
  label?: string;
  control: Control<any>;
  className?: string;
  type?: string;
}
const SocielInput = ({
  icon,
  name,
  label,
  control,
  className,
  type='text',
  ...inputProps
}: InputProps) => {
  const {
    fieldState: { error, isTouched },
    field,
  } = useController({ control, name });


  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem className="space-y-1">
          {label && <FormLabel htmlFor="website">{label}</FormLabel>}
          <div className="grid grid-cols-[35px_2px_auto] place-items-center outline outline-1 outline-gray-100 hover:outline-primary-200 focus-within:!outline-primary-500 bg-white">
            {icon&& icon}
            <Separator
              orientation="vertical"
              className="w-0.5 bg-gray-100 h-2/3"
            />
            <FormControl>
              <Input
              {...field}
                id="website"
                type={type}
                {...inputProps}
                className={clsx(`focus:bg-transparent ring-0 rounded-none`, className)}
              />
            </FormControl>
          </div>
            {/* {error && <FormMessage className="text-error-400">{error.message}</FormMessage>} */}
             <FormMessage className="text-error-400" />
        </FormItem>
      )}
    />
  );
};

export default SocielInput;
