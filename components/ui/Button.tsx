import { cn } from '@/util/cn'
import { cva } from 'class-variance-authority'
import React from 'react'
import Spinner from './Spinner'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}



const Button = ({ className, variant, isLoading, children, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} disabled={isLoading}>
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

const buttonVariants = cva(
  "text-sm py-2.5 px-4 rounded-lg transition-all duration-100",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-primary-950 hover:bg-primary-600 hover:text-white font-bold",
        secondary: "bg-transparent text-white hover:border-neutral-400 hover:bg-secondary font-bold border border-neutral-700",
      },
    },
    defaultVariants: {
      variant: "secondary",
    }
  }
)

export { Button }