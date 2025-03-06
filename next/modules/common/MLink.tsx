/* Inspired by https://github.com/bratislava/marianum/blob/master/next/components/atoms/MLink.tsx */
import NextLink from 'next/link'
import { ComponentProps, forwardRef, ReactNode } from 'react'

import ChevronRight from '@/assets/images/chevron-right.svg'
import cn from '@/utils/cn'

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'as' | 'passHref'> & {
  children: ReactNode
  // TODO add more variants
  variant?: 'unstyled' | 'basic' | 'breadcrumb' | 'richtext' | 'navmenu'
  className?: string
  hasIcon?: boolean
  /**
   * Similar to this:
   * https://getbootstrap.com/docs/4.3/utilities/stretched-link/
   */
  stretched?: boolean
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
      hasIcon,
      variant = 'unstyled',
      className,
      stretched = false,
      ...rest
    },
    ref,
  ) => {
    const styles = cn(
      'base-focus-ring',
      {
        'hover:underline': variant === 'basic',
        'underline underline-offset-1 hover:text-foreground-body': variant === 'breadcrumb',
        'underline underline-offset-1 hover:text-foreground-dark': variant === 'richtext',
        'text-foreground-body hover:text-foreground-dark hover:underline hover:underline-offset-1':
          variant === 'navmenu',

        // https://github.com/tailwindlabs/tailwindcss/issues/1041#issuecomment-957425345
        'after:absolute after:inset-0': stretched,
        'flex items-center gap-x-2.5': hasIcon,
      },
      className,
    )

    return (
      <NextLink
        href={href ?? '#'}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        passHref
        className={styles}
        ref={ref}
        {...rest}
      >
        {children} {hasIcon && <ChevronRight />}
      </NextLink>
    )
  },
)

export default MLink
