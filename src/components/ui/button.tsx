import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative overflow-hidden",
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
        icon: "h-10 w-10 p-2",
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

interface ButtonAsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {
  href?: undefined;
}

interface ButtonAsAnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonBaseProps {
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonAsButtonProps>(
  ({ className, variant, size, asChild = false, title, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className, "group")}
        {...props}
      >
        <ButtonContent title={title} icon={icon} />
      </Comp>
    );
  }
);

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonAsAnchorProps>(
  ({ className, variant, size, asChild = false, title, icon, href, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        href={href}
        className={cn(buttonVariants({ variant, size }), className, "group")}
        {...props}
      >
        <ButtonContent title={title} icon={icon} />
      </Comp>
    );
  }
);

const ButtonContent: React.FC<{ title?: string; icon?: React.ReactNode }> = ({
  title,
  icon,
}) => {
  const letters = title?.split("").map(letter => (letter === " " ? "\u00A0" : letter)) || [];

  return (
    <>
      <span className="relative inline-flex overflow-hidden">
        <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="inline-block tracking-tight transition-transform duration-300 ease-in-out group-hover:translate-y-full"
              style={{ transitionDelay: `${0.02 * i}s` }}
            >
              {letter}
            </span>
          ))}
        </span>
        <span className="absolute top-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="inline-block tracking-tight transition-transform duration-300 ease-in-out group-hover:translate-y-0"
              style={{ transitionDelay: `${0.02 * i}s` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
      {icon && <span className="ml-2">{icon}</span>}
    </>
  );
};

(Button as any).displayName = "Button";
(ButtonLink as any).displayName = "ButtonLink";

export { Button, ButtonLink, buttonVariants };
export type { ButtonProps };
