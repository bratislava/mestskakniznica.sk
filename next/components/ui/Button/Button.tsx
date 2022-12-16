import cx from 'classnames'

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement> & {
  icon?: React.ReactNode
  iconClassName?: string
  iconPosition?: 'left' | 'center' | 'right'
  shape?: 'default' | 'circle'
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'plain-primary'
    | 'plain-secondary'
    | 'plain-white'
}

export const Button = (
  {
    children,
    className,
    icon,
    iconClassName,
    iconPosition = 'left',
    shape = 'default',
    variant = 'primary',
    ...props
  }: ButtonProps) => {
  return (
    <button
      className={cx('base-button outline-1 outline-offset-2 focus:outline', className, {
        'space-x-3': !!icon,

        // text colors
        'text-white': variant === 'primary' || variant === 'plain-white',
        'text-foreground-heading':
          variant === 'secondary' || variant === 'plain-primary' || variant === 'tertiary',
        'text-button-gray': variant === 'plain-secondary',

        // bg and border
        'border border-border-dark bg-button-dark hover:bg-button-hover': variant === 'primary',
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
      {iconPosition === 'right' && icon}
    </button>
  )
}

export default Button
