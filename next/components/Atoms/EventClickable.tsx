import Button from '@modules/common/Button'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { ReactNode, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'

interface ClickableProps {
  text: string
  svgIcon: ReactNode
  actionLink: string | (() => void)
  classA: string
  classDiv: string
  copyText?: boolean
}

const Clickable = ({ text, svgIcon, actionLink, classA, classDiv, copyText }: ClickableProps) => {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation('common')

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
        <a href={actionLink} target="_blank" rel="noreferrer" className={cx(classA)}>
          {svgIcon}
          &nbsp; {text}
        </a>
      </div>
    )
  return (
    <div className={cx(classDiv)}>
      {copyText && copied ? (
        <a data-for="main" data-delay-hide="3000" data-tip={t('linkCopied')} data-iscapture="true">
          <Button variant="unstyled" onPress={() => actionLink()}>
            <div className={cx(classA)}>
              {svgIcon}
              &nbsp; {text}
            </div>
          </Button>
          <ReactTooltip id="main" place="top" type="dark" effect="solid" multiline />
        </a>
      ) : (
        <Button
          variant="unstyled"
          onPress={() => {
            actionLink()
            setCopied(true)
          }}
        >
          <div className={cx(classA)}>
            {svgIcon}
            &nbsp; {text}
          </div>
        </Button>
      )}
    </div>
  )
}

export default Clickable
