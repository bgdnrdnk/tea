export type DesignKey = 'classic' | 'atelier' | 'apple'

/** Each design carries its own accent: Custom = amber, Starbucks = green,
 *  Apple = blue. `on` is the label color used when the segment is active. */
const options: {
  key: DesignKey
  label: string
  color: string
  on: string
}[] = [
  { key: 'classic', label: 'Custom', color: '#d89b35', on: '#1a3629' },
  { key: 'atelier', label: 'Starbucks', color: '#1a3629', on: '#fffaf0' },
  { key: 'apple', label: 'Apple', color: '#0066cc', on: '#ffffff' },
]

/**
 * Floating switch that flips the page between the three designs.
 * Each segment carries its design's accent colour.
 */
export function DesignToggle({
  design,
  onChange,
}: {
  design: DesignKey
  onChange: (next: DesignKey) => void
}) {
  return (
    <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 px-3">
      <div
        role="group"
        aria-label="Переключатель дизайна"
        className="flex items-center gap-2 rounded-full border border-[#1a3629]/12 bg-[#fffaf0]/95 p-1.5 pl-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.08),_0_18px_44px_rgba(26,54,41,0.22)] backdrop-blur-lg"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#1a3629]/55">
          Дизайн
        </span>
        <div className="flex rounded-full bg-[#1a3629]/8 p-1">
          {options.map((option) => {
            const active = option.key === design
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(option.key)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-all duration-200 ${
                  active ? 'shadow-sm' : 'hover:bg-black/[0.04]'
                }`}
                style={
                  active
                    ? { backgroundColor: option.color, color: option.on }
                    : { color: option.color }
                }
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
