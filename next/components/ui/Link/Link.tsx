import NextLink from 'next/link';
import cx from 'classnames';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right.svg';

export interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  size?: 'default' | 'small' | 'large';
  variant?: 'default' | 'plain';
  hasIcon?: boolean;
  uppercase?: boolean;
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
}: LinkProps) => (
  <NextLink href={href}>
    <a
      href={href}
      className={cx('hover:underline', className, {
        'flex items-center gap-x-2.5 text-gray-universal-100 ':
          variant === 'default',
        'text-[16px]': size === 'large',
        'text-[14px]': size === 'default',
        'text-[12px]': size === 'small',
        uppercase: uppercase,
      })}
      {...props}
    >
      {children}
      {hasIcon && <ChevronRight />}
    </a>
  </NextLink>
);
