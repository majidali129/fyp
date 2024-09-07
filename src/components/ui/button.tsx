import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-[#fff]  font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-[1rem] disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary-500  hover:bg-primary-700",
        destructive: "bg-error-500  hover:bg-error-500/90",
        secondary: "bg-secondary-500  hover:bg-secondary-600",
        ghost: "bg-gray-900 hover:bg-gray-800",
        outline: 'border border-gray-100 ',
        transparent: 'bg-white text-gray-900',
        secondaryPrimary:
          "bg-primary-100 text-primary-500 hover:bg-primary-200 hover:text-primary-600 ",
        secondarySecondary:
          " bg-secondary-100 text-secondary-500 hover:bg-secondary-200 hover:text-secondary-600  ",
        secondaryGhost:
          "bg-gray-50 text-gray-900 hover:bg-gray-100 hover:text-gray-800 ",
        transparentPrimary:
          "bg-transparent text-primary-500 hover:bg-primary-100 hover:text-primary-600",
        transparentSecondary:
          "bg-transparent text-secondary-500 hover:bg-secondary-100 hover:text-secondary-600",
        transparentGhost:
          "bg-gray-50 text-gray-900 hover:bg-gray-100 hover:text-gray-900",

        link: "text-primary hover:underline-offset-8 hover:underline decoration-2 decoration-primary-500"
      },
      size: {
        default: "px-4 md:px-6 py-2.5",
        sm: "py-1 rounded-md px-3 text-[.9rem]",
        lg: "py-3.5 rounded-md px-8",
        icon: "h-12 w-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
