import type { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
}

export const Tooltip = ({ label, children }: Props) => {
  return (
    <div className="relative group w-fit">
      {children}

      <div
        className="
          pointer-events-none
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          whitespace-nowrap
          rounded bg-neutral-700 px-2 py-1 text-xs text-white
          opacity-0
          group-hover:opacity-100
          transition-opacity
        "
      >
        {label}
      </div>
    </div>
  )
}
