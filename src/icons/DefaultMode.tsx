import type { SVGProps } from 'react'

export const DefaultMode = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" {...props}>
      <path
        d="M2.66663 2.66699L7.33329 2.66699L7.33329 7.33366L2.66663 7.33366L2.66663 2.66699Z"
        fill="var(--color-sell)"
      />
      <path
        d="M2.66663 8.66699L7.33329 8.66699L7.33329 13.3337L2.66663 13.3337L2.66663 8.66699Z"
        fill="var(--color-buy)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66663 2.66699L13.3333 2.66699L13.3333 5.33366L8.66663 5.33366L8.66663 2.66699ZM8.66663 6.66699L13.3333 6.66699L13.3333 9.33366L8.66663 9.33366L8.66663 6.66699ZM13.3333 10.667L8.66663 10.667L8.66663 13.3337L13.3333 13.3337L13.3333 10.667Z"
        fill="var(--color-icon-normal)"
      />
    </svg>
  )
}
