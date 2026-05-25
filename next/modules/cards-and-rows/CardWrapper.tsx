import { HTMLAttributes, ReactNode } from 'react'

import cn from '@/utils/cn'

type CardWrapperProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

/**
 * Handles focus styles to achieve a consistent look of focus rings across the app
 */
const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return (
    <div
      className={cn(
        // When the card is focused, hide all its descendants’ focus rings (= focus rings of any links within the card) except the card’s focus ring
        // This needs revisiting when we need more focusable elements in a card
        'wrapper-focus-ring',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default CardWrapper
