import * as React from 'react'

import { cn } from '../../lib/utils'

function Textarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'min-h-32 w-full rounded-md border border-emerald-950/12 bg-white/75 px-4 py-3 text-sm leading-6 text-emerald-950 outline-none transition placeholder:text-emerald-950/38 focus:border-emerald-900 focus:ring-2 focus:ring-emerald-900/12',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
