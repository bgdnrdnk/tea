import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-[var(--step--1)] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-emerald-950 text-ivory shadow-[0_18px_45px_rgba(22,53,39,.2)] hover:bg-emerald-900 focus-visible:ring-emerald-900',
        secondary:
          'border border-emerald-950/15 bg-white/70 text-emerald-950 hover:bg-white focus-visible:ring-emerald-900',
        amber:
          'bg-amber-500 text-emerald-950 shadow-[0_18px_45px_rgba(191,122,33,.24)] hover:bg-amber-400 focus-visible:ring-amber-500',
        ghost:
          'bg-transparent text-emerald-950 hover:bg-emerald-950/5 focus-visible:ring-emerald-900',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-13 px-7 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
