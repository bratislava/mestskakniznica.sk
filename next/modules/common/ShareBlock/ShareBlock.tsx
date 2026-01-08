import React from 'react'

import { ShareIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'
import ShareModal from '@/modules/common/ShareBlock/ShareModal'

export type ShareBlockProps = {
  text: string
  buttonText: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19537-24022&t=QwxuvuEl3TqB3Ygm-4
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/common/ShareBlock/ShareBlock.tsx
 */

const ShareBlock = ({ text, buttonText }: ShareBlockProps) => {
  return (
    <div className="flex flex-col items-center gap-3 border border-border-dark p-4 lg:flex-row lg:gap-2.5 lg:px-8">
      <div className="grow">
        <h5 className="text-h6">{text}</h5>
      </div>
      <ShareModal
        triggerButton={
          <Button variant="secondary" startIcon={<ShareIcon />} mobileFullWidth>
            {buttonText}
          </Button>
        }
      />
    </div>
  )
}

export default ShareBlock
