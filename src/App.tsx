import { useState } from 'react'

import AppleDesign from './AppleDesign'
import AtelierDesign from './AtelierDesign'
import ClassicDesign from './ClassicDesign'
import { DesignToggle, type DesignKey } from './DesignToggle'
import { TooltipProvider } from './components/ui/tooltip'
import { useBlendStudio } from './tea-data'

const STORAGE_KEY = 'tea-design'

function loadDesign(): DesignKey {
  if (typeof window === 'undefined') return 'classic'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'atelier' || saved === 'apple' ? saved : 'classic'
}

function App() {
  const [design, setDesign] = useState<DesignKey>(loadDesign)
  const studio = useBlendStudio()

  function handleChange(next: DesignKey) {
    setDesign(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <TooltipProvider>
      {design === 'classic' ? (
        <ClassicDesign studio={studio} />
      ) : design === 'atelier' ? (
        <AtelierDesign studio={studio} />
      ) : (
        <AppleDesign studio={studio} />
      )}
      <DesignToggle design={design} onChange={handleChange} />
    </TooltipProvider>
  )
}

export default App
