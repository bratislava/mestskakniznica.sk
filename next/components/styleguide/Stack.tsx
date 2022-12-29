import cx from 'classnames'

// eslint-disable-next-line no-secrets/no-secrets
// Copied from https://github.com/bratislava/marianum/blob/762d10222bd33352b77a44d902620181b07107c1/next/pages/styleguide/index.tsx

type StackProps = {
  bg?: 'white' | 'dark'
  width?: 'desktop' | 'mobile' | 'full' | null
  direction?: 'column' | 'row'
  children: React.ReactNode
}

export const Stack = ({ direction = 'row', children }: StackProps) => {
  const classNameStyles = cx(
    'flex flex-wrap gap-1 rounded-lg border border-dashed border-border-dark p-4 xs:p-3',
    {
      'flex-col items-center space-y-2': direction === 'column',
      'items-end space-x-2': direction === 'row',
    }
  )

  return <div className={classNameStyles}>{children}</div>
}
