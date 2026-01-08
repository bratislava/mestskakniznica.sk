import { useTranslation } from 'next-i18next'
import { ReactNode, useState } from 'react'
import { DialogTrigger } from 'react-aria-components'

import { FacebookIcon, InstagramIcon, LinkedinIcon } from '@/assets/icons'
import { Input } from '@/components/ui'
import CopyToClipboardButton from '@/modules/common/CopyToClipboardButton'
import Dialog from '@/modules/common/ModalDialog/Dialog'
import Modal from '@/modules/common/ModalDialog/Modal'
import SocialMediaButton from '@/modules/common/ShareBlock/SocialMediaButton'

type ShareModalProps = {
  triggerButton: ReactNode
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19537-24027&m=dev
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/modals/share/ShareModal.tsx
 */

const ShareModal = ({ triggerButton }: ShareModalProps) => {
  const { t } = useTranslation()

  const [inputValue, setInputValue] = useState(
    // inspired by https://stackoverflow.com/a/65200178
    typeof window === 'undefined' ? '' : window.location.href,
  )

  return (
    <DialogTrigger>
      {triggerButton}
      <Modal modalClassname="grow lg:max-w-[50rem] lg:h-auto m-0 max-lg:self-end max-lg:rounded-b-none h-fit">
        <Dialog title={t('ShareModal.share')}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h6 className="text-h6">{t('ShareModal.shareOnSocialMedia')}</h6>
              <div className="flex items-stretch gap-3 *:w-full max-lg:flex-col">
                <SocialMediaButton
                  startIcon={<FacebookIcon />}
                  getSocialLink={(url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`}
                >
                  {t('ShareModal.facebook')}
                </SocialMediaButton>
                <SocialMediaButton
                  startIcon={<InstagramIcon />}
                  getSocialLink={() => 'https://www.instagram.com/mestska_kniznica_bratislava/'}
                >
                  {t('ShareModal.instagram')}
                </SocialMediaButton>
                <SocialMediaButton
                  getSocialLink={(url) =>
                    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
                  }
                  startIcon={<LinkedinIcon />}
                >
                  {t('ShareModal.linkedIn')}
                </SocialMediaButton>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="grow"
                inputClassName="grow"
                labelContent={t('ShareModal.copyLink')}
                disabled
              />
              <CopyToClipboardButton
                copyText={inputValue}
                className="max-lg:w-full max-lg:grow"
                aria-label={t('ShareModal.CopyToClipBoardButton.ariaLabel')}
              >
                {t('ShareModal.CopyToClipBoardButton.buttonText')}
              </CopyToClipboardButton>
            </div>
          </div>
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default ShareModal
