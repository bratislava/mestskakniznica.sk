import cn from '@/utils/cn'

type StackProps = {
  bg?: 'white' | 'dark'
  width?: 'desktop' | 'mobile' | 'full' | null
  direction?: 'column' | 'row'
  children: React.ReactNode
}

/**
 * Based on Marianum: https://github.com/bratislava/marianum/blob/762d10222bd33352b77a44d902620181b07107c1/next/pages/styleguide/index.tsx
 */

export const Stack = ({ direction = 'row', children }: StackProps) => {
  const classNameStyles = cn(
    'flex flex-wrap gap-1 rounded-lg border border-dashed border-border-dark p-4 xs:p-3',
    {
      'flex-col items-center gap-y-2': direction === 'column',
      'items-end gap-x-2': direction === 'row',
    },
  )

  return <div className={classNameStyles}>{children}</div>
}
