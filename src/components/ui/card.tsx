'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "border-b shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        brutalism: "bg-yellow-300 dark:bg-yellow-600 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
        glassmorphism: "bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20",
        gradient: "bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-600 dark:to-indigo-800 text-white",
        neon: "bg-black dark:bg-gray-900 border-2 border-neon-pink shadow-[0_0_10px_2px_rgba(255,16,240,0.7)] text-white",
        minimal: "bg-transparent border border-gray-200 dark:border-gray-700 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardContext = React.createContext<VariantProps<typeof cardVariants>>({ variant: "default" })

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <CardContext.Provider value={{ variant }}>
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    </CardContext.Provider>
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", 
        variant === 'neon' && "text-neon-blue",
        variant === 'brutalism' && "border-b-2 border-black dark:border-white",
        className
      )}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(CardContext)
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        variant === 'neon' && "text-neon-pink",
        variant === 'brutalism' && "uppercase",
        className
      )}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(CardContext)
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm",
        variant === 'default' && "text-muted-foreground",
        variant === 'neon' && "text-neon-green",
        variant === 'brutalism' && "font-bold",
        className
      )}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        variant === 'brutalism' && "border-t-2 border-black dark:border-white",
        className
      )}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

