import { ChevronRightIcon } from '@assets/icons'
import Button from '@modules/common/Button'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { ComponentProps } from 'react'

type ShowMoreButtonProps = ComponentProps<typeof Button> & {
  label?: string
  uppercase?: boolean
}

const ShowMoreButton = ({ label, uppercase, children, variant, ...rest }: ShowMoreButtonProps) => {
  const { t } = useTranslation('common')

  return (
    <Button
      endIcon={<ChevronRightIcon />}
      variant={variant ?? 'unstyled'}
      className={cx(
        'inline-flex items-center justify-center text-center text-base group-hover:underline',
        {
          uppercase,
        }
      )}
      {...rest}
    >
      {label ?? t('showMore')}
    </Button>
  )
}

export default ShowMoreButton
