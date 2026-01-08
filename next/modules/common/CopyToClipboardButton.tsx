import { useCopyToClipboard } from 'usehooks-ts'

import { CopyIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'

type Props = {
  copyText: string
  children: React.ReactNode
  ariaLabel?: string
  className?: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19537-24027&m=dev
 */

const CopyToClipboardButton = ({ copyText, ariaLabel, children, className }: Props) => {
  const [, copy] = useCopyToClipboard()

  return (
    <Button
      variant="secondary"
      startIcon={<CopyIcon />}
      aria-label={ariaLabel}
      onPress={() => copy(copyText)}
      className={className}
    >
      {children}
    </Button>
  )
}

export default CopyToClipboardButton
