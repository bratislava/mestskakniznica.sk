import ChevronRight from '@assets/images/chevron-right.svg'
import cx from 'classnames'
import NextLink from 'next/link'

export interface LinkProps
  extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement> {
  href: string
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
    <NextLink href={href}>
      <a
        href={href}
        className={cx('hover:underline', className, {
          'flex items-center gap-x-2.5 text-text-heading ': variant === 'default',
          'text-[16px]': size === 'large',
          'text-[14px]': size === 'default',
          'text-[12px]': size === 'small',
          uppercase,
        })}
        {...props}
      >
        {children}
        {hasIcon && <ChevronRight/>}
      </a>
    </NextLink>
  )
}
