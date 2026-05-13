import * as React from 'react'

import { cn } from '../../lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-11 w-full rounded-md border border-emerald-950/12 bg-white/75 px-4 text-sm text-emerald-950 outline-none transition placeholder:text-emerald-950/38 focus:border-emerald-900 focus:ring-2 focus:ring-emerald-900/12',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
