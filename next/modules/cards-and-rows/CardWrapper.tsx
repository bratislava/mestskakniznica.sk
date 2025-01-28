import cx from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

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
      className={twMerge(
        cx(
          // When the card is focused, hide all its descendants’ focus rings (= focus rings of any links within the card) except the card’s focus ring
          // This needs revisiting when we need more focusable elements in a card
          'outline-none ring-offset-2 transition focus-within:[&:has(:focus-visible)]:ring [&_*]:outline-none [&_*]:ring-transparent [&_a]:ring-offset-transparent',
          className
        )
      )}
    >
      {children}
    </div>
  )
}

export default CardWrapper
