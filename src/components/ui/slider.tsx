import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '../../lib/utils'

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-emerald-950/10">
        <SliderPrimitive.Range className="absolute h-full bg-amber-500" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-5 rounded-full border-2 border-white bg-emerald-950 shadow-[0_8px_18px_rgba(30,48,38,.22)] outline-none ring-offset-white transition focus-visible:ring-2 focus-visible:ring-emerald-900 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
}

export { Slider }
