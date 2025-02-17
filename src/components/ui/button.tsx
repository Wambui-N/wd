import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group overflow-hidden relative",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonBaseProps = {
  asChild?: boolean;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
};

interface ButtonAsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
  href?: undefined;
}

interface ButtonAsAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, ButtonBaseProps {
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonAsButtonProps>(
  function ButtonAsButton({ className, variant, size, asChild = false, title, icon, ...props }, ref) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <span className="relative inline-flex overflow-hidden">
          <span className="block transition-transform duration-500 group-hover:-translate-y-full">
            {title}
          </span>
          <span className="absolute top-full transition-transform duration-500 group-hover:translate-y-0">
            {title}
          </span>
          {icon && <span className="ml-2">{icon}</span>}
        </span>
      </Comp>
    );
  }
) as unknown as React.ComponentType<ButtonProps>;

(Button as any).displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };