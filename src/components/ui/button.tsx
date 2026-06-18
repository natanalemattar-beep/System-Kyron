
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const mobileTouch = "min-h-[44px] min-w-[44px]"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        modern: "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90 border border-primary/20 hover:scale-[1.02] active:scale-[0.98]",
        modernSecondary: "bg-secondary text-secondary-foreground shadow-glow-secondary hover:bg-secondary/90 border border-secondary/20 hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: `${mobileTouch} h-12 px-5 md:px-6 py-3 text-sm md:text-base font-bold rounded-xl`,
        sm: `${mobileTouch} h-10 rounded-xl px-3 md:px-4 text-[11px] md:text-xs font-bold`,
        lg: `${mobileTouch} h-14 rounded-2xl px-6 md:px-10 text-base md:text-lg font-black tracking-tight`,
        xl: `${mobileTouch} h-16 rounded-2xl md:rounded-3xl px-8 md:px-12 text-lg md:text-xl font-black tracking-tighter`,
        icon: `${mobileTouch} h-12 w-12 rounded-xl`,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
