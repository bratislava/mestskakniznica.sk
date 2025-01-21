/* Inspired by https://github.com/bratislava/marianum/blob/master/next/components/atoms/Button.tsx */
import MLink from '@modules/common/MLink'
import { LinkButtonProps } from '@react-types/button'
import cx from 'classnames'
import { forwardRef, ReactNode, Ref, RefObject } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'
import { twMerge } from 'tailwind-merge'

type ButtonBase = {
  startIcon?: ReactNode
  endIcon?: ReactNode
  shape?: 'default' | 'circle'
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'plain-primary'
    | 'plain-secondary'
    | 'plain-white'
    | 'carousel'
    | 'unstyled'
  noPadding?: boolean
  mobileFullWidth?: boolean
  className?: string
  disabled?: boolean
}

/*
 *  This part makes the component return `HTMLAnchorElement` ref when `href` if provided and `HTMLButtonElement` when it's not.
 *  https://github.com/typescript-cheatsheets/react/issues/167#issuecomment-751347673
 */
export type ButtonProps = Omit<AriaButtonProps<'button'>, keyof LinkButtonProps | 'isDisabled'> &
  ButtonBase & {
    ref?: Ref<HTMLButtonElement>
    href?: undefined
  }
export type AnchorProps = Omit<AriaButtonProps<'a'>, 'isDisabled'> &
  ButtonBase & {
    ref?: Ref<HTMLAnchorElement>
    href: string
  }

export type PolymorphicProps = ButtonProps | AnchorProps

type PolymorphicButton = {
  (props: AnchorProps): JSX.Element
  (props: ButtonProps): JSX.Element
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicProps>(
  (
    {
      children,
      startIcon,
      endIcon,
      className,
      shape = 'default',
      variant = 'primary',
      noPadding = false,
      mobileFullWidth,
      disabled,
      ...rest
    },
    ref
  ) => {
    const { buttonProps } = useButton(
      {
        ...rest,
        elementType: rest.href ? 'a' : 'button',
        isDisabled: disabled,
      },
      ref as RefObject<HTMLAnchorElement | HTMLButtonElement>
    )

    const baseStyle = 'appearance-none outline-none transition focus-visible:ring ring-offset-2'

    const style =
      variant === 'unstyled'
        ? twMerge(baseStyle, className)
        : twMerge(
            cx(
              baseStyle,
              'inline-flex items-center justify-center gap-x-3 text-center text-sm uppercase tracking-wider',
              {
                'w-full lg:w-auto': mobileFullWidth,
                'px-5 py-[9px]': !noPadding,

                // text colors
                'text-white': variant === 'primary' || variant === 'plain-white',
                'text-foreground-dark':
                  variant === 'secondary' || variant === 'plain-primary' || variant === 'tertiary',
                'text-button-gray': variant === 'plain-secondary',

                // bg and border
                'border border-border-dark bg-button-dark hover:bg-button-hover':
                  variant === 'primary',
                'border border-border-dark hover:border-button-hover hover:text-button-hover':
                  variant === 'secondary',
                'border border-border-light hover:text-button-hover': variant === 'tertiary',
                'border border-border-dark bg-button-white': variant === 'carousel',

                // hover bg and border
                'hover:bg-button-hover': variant === 'primary',
                'hover:border-button-hover': variant === 'secondary',

                // hover-text
                'hover:text-button-hover':
                  variant === 'tertiary' ||
                  variant === 'plain-secondary' ||
                  variant === 'plain-primary' ||
                  variant === 'secondary',
                'hover:text-white hover:text-opacity-80': variant === 'plain-white',
                'hover:text-opacity-80': variant === 'carousel',

                // shape
                'rounded-full': shape === 'circle',
              }
            ),
            className
          )

    if (rest.href) {
      /* react-aria adds role="button" which we don't want to use for <a>s */
      const buttonPropsFixed = { ...buttonProps, role: undefined }
      return (
        <MLink
          ref={ref as RefObject<HTMLAnchorElement>}
          href={rest.href}
          variant="unstyled"
          className={style}
          {...buttonPropsFixed}
        >
          {startIcon}
          {children}
          {endIcon}
        </MLink>
      )
    }

    return (
      <button
        type="button"
        ref={ref as RefObject<HTMLButtonElement>}
        className={style}
        {...buttonProps}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    )
  }
) as PolymorphicButton

export default Button
