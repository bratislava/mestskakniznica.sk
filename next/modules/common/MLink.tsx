import cx from 'classnames'
import NextLink from 'next/link'
import { ComponentProps, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'as' | 'passHref'> & {
  children: ReactNode
  // TODO add more variants
  variant?: 'unstyled' | 'basic'
  className?: string
}

const MLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
      children,
      variant = 'unstyled',
      className,
      ...rest
    },
    ref
  ) => {
    const styles = twMerge(
      cx({
        'underline hover:text-foreground-dark': variant === 'basic',
      }),
      className
    )
    return (
      <NextLink
        href={href ?? ''}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        passHref
      >
        <a className={styles} ref={ref} {...rest}>
          {children}
        </a>
      </NextLink>
    )
  }
)

export default MLink
