import cx from 'classnames'
import NextLink from 'next/link'

export interface LinkButtonProps
  extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement> {
  href: string
  icon?: React.ReactNode
  iconClassName?: string
  iconPosition?: 'left' | 'center'
  shape?: 'default' | 'circle'
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'plain-primary'
    | 'plain-secondary'
    | 'plain-white'
}

export const LinkButton = (
  {
    href,
    children,
    className,
    icon,
    iconClassName,
    iconPosition = 'left',
    shape = 'default',
    variant = 'primary',
    ...props
  }: LinkButtonProps) => {
  return (
    <NextLink href={href} passHref>
      <a
        href={href}
        className={cx('base-button', className, {
          'space-x-3': !!icon,

          // text colors
          'text-white': variant === 'primary' || variant === 'plain-white',
          'text-foreground-heading':
            variant === 'secondary' || variant === 'plain-primary' || variant === 'tertiary',
          'text-button-gray': variant === 'plain-secondary',

          // bg and border
          'border border-border-dark bg-dark hover:bg-button-hover': variant === 'primary',
          'border border-border-dark hover:border-button-hover hover:text-button-hover':
            variant === 'secondary',
          'border border-border-light hover:text-button-hover': variant === 'tertiary',

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

          // shape
          'rounded-full': shape === 'circle',
        })}
        {...props}
      >
        {iconPosition === 'left' && icon}
        <span className={cx(iconClassName)}>
          {iconPosition === 'center' && icon}
          {children}
        </span>
      </a>
    </NextLink>
  )
}
