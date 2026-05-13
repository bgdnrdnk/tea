import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit items-center rounded-full border px-3 py-1 text-[var(--step--1)] font-semibold uppercase tracking-[.16em]',
  {
    variants: {
      variant: {
        default: 'border-emerald-950/12 bg-emerald-950 text-ivory',
        outline: 'border-emerald-950/15 bg-white/60 text-emerald-950/70',
        amber: 'border-amber-600/20 bg-amber-200/70 text-amber-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }
