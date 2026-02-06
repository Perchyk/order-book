import type { ReactNode } from 'react'

type Props = {
  label: ReactNode
  children: ReactNode
  position?: 'top' | 'right'
  show?: boolean
}

export const Tooltip = ({
  label,
  children,
  position = 'top',
  show,
}: Props) => {
  const positionClasses =
    position === 'right'
      ? 'left-full top-1/2 -translate-y-1/2 ml-2'
      : 'bottom-full left-1/2 -translate-x-1/2 mb-2'

  const showClass =
    show !== undefined
      ? show
        ? 'opacity-100'
        : 'opacity-0'
      : 'opacity-0 group-hover:opacity-100'

  return (
    <div className="relative group w-fit">
      {children}

      <div
        className={`
          pointer-events-none
          absolute ${positionClasses}
          whitespace-nowrap
          rounded bg-neutral-700 px-2 py-1 text-xs text-white
          ${showClass}
          transition-opacity
        `}
      >
        {label}
      </div>
    </div>
  )
}
