import ChevronRight from '@assets/images/chevron-right.svg'
import cx from 'classnames'
import NextLink from 'next/link'
import { ComponentProps } from 'react'

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'as' | 'passHref'> & {
  size?: 'default' | 'small' | 'large'
  variant?: 'default' | 'plain'
  hasIcon?: boolean
  uppercase?: boolean
}

export const Link = ({
  className,
  href,
  children,
  hasIcon = false,
  variant = 'default',
  size = 'default',
  uppercase = true,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={cx('base-focus-ring hover:underline', className, {
        'flex items-center gap-x-2.5 text-foreground-heading': variant === 'default',
        'text-[16px]': size === 'large',
        'text-[14px]': size === 'default',
        'text-[12px]': size === 'small',
        uppercase,
      })}
      {...props}
    >
      {children}
      {hasIcon && <ChevronRight />}
    </NextLink>
  )
}
