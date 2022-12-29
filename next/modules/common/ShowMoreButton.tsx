import { ChevronRightIcon } from '@assets/icons'
import Button from '@modules/common/Button'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { ComponentProps } from 'react'

type ShowMoreButtonProps = ComponentProps<typeof Button> & {
  label?: string
  uppercase?: boolean
}

/**
 * Show more button should be used just as decoration, not as a link.
 * The link should be provided elsewhere, e.g. on the title of parent component.
 *
 * @param label
 * @param uppercase
 * @param children
 * @param variant
 * @param rest
 * @constructor
 */
const ShowMoreButton = ({ label, uppercase, children, variant, ...rest }: ShowMoreButtonProps) => {
  const { t } = useTranslation('common')

  return (
    <Button
      endIcon={<ChevronRightIcon />}
      variant={variant ?? 'unstyled'}
      disabled
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
