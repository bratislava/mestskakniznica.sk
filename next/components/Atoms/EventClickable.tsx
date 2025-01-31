import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { ReactNode, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'

import Button from '@/modules/common/Button'

interface ClickableProps {
  text: string
  svgIcon: ReactNode
  actionLink: string | (() => void)
  classDiv: string
  copyText?: boolean
}

const Clickable = ({ text, svgIcon, actionLink, classDiv, copyText }: ClickableProps) => {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])
  if (typeof actionLink === 'string')
    return (
      <div className={cx(classDiv)}>
        <Button
          variant="plain-primary"
          startIcon={svgIcon}
          noPadding
          href={actionLink}
          target="_blank"
          rel="noreferrer"
        >
          {text}
        </Button>
      </div>
    )
  return (
    <div className={cx(classDiv)}>
      {copyText && copied ? (
        <a data-for="main" data-delay-hide="3000" data-tip={t('linkCopied')} data-iscapture="true">
          <Button variant="plain-primary" startIcon={svgIcon} onPress={() => actionLink()}>
            {text}
          </Button>
          <ReactTooltip id="main" place="top" type="dark" effect="solid" multiline />
        </a>
      ) : (
        <Button
          variant="plain-primary"
          startIcon={svgIcon}
          onPress={() => {
            actionLink()
            setCopied(true)
          }}
        >
          {text}
        </Button>
      )}
    </div>
  )
}

export default Clickable
