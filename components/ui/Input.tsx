import { cn } from '@/util/cn'
import { cva } from 'class-variance-authority'
import React from 'react'

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
    variant?: 'default',
    type?: HTMLInputElement['type']
    placeholder?: string
    value?: HTMLInputElement['value']
}



const Input = ({ className, variant, ...props }: InputProps) => {
    return (
        <input className={cn(inputVariants({ variant }), className)} {...props}></input>
    )
}

const inputVariants = cva(
    "border-neutral-700 border bg-tertitary text-sm rounded-lg p-2.5 placeholder-neutral-400 text-white",
    {
        variants: {
            variant: {
                default: "",
            },
        },
        defaultVariants: {
            variant: "default",
        }
    }
)

export { Input }