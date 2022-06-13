import NextLink from 'next/link';
import cx from 'classnames';

export interface LinkButtonProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  iconPosition?: 'left' | 'center';
  shape?: 'default' | 'circle';
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'plain-primary'
    | 'plain-secondary'
    | 'plain-white';
}

export const LinkButton = ({
  href,
  children,
  className,
  icon,
  iconClassName,
  iconPosition = 'left',
  shape = 'default',
  variant = 'primary',
  ...props
}: LinkButtonProps) => (
  <NextLink href={href} passHref>
    <a
      href={href}
      className={cx('base-button', className, {
        'space-x-3': !!icon,

        // text colors
        'text-white': variant === 'primary' || variant === 'plain-white',
        'text-gray-universal-100':
          variant === 'secondary' ||
          variant === 'plain-primary' ||
          variant === 'tertiary',
        'text-gray-universal-60': variant === 'plain-secondary',

        // bg and border
        'bg-gray-universal-100 hover:bg-gray-universal-80 border border-gray-universal-100':
          variant === 'primary',
        'border border-gray-universal-100 hover:border-gray-universal-80 hover:text-gray-universal-80':
          variant === 'secondary',
        'border border-gray-universal-200 hover:text-gray-universal-80':
          variant === 'tertiary',

        // hover bg and border
        'hover:bg-gray-universal-80': variant === 'primary',
        'hover:border-gray-universal-80': variant === 'secondary',

        // hover-text
        'hover:text-gray-universal-80':
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
);
