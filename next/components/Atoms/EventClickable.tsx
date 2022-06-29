import cx from 'classnames'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import ReactTooltip from 'react-tooltip'

interface ClickableProps {
  text: string
  svgIcon: ReactNode
  actionLink: string | (() => void)
  classA: string
  classDiv: string
  copyText?: boolean
}

function Clickable({ text, svgIcon, actionLink, classA, classDiv, copyText }: ClickableProps) {
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
          <button onClick={() => actionLink()}>
            <div className={cx(classA)}>
              {svgIcon}
              &nbsp; {text}
            </div>
          </button>
          <ReactTooltip id="main" place="top" type="dark" effect="solid" multiline />
        </a>
      ) : (
        <button
          onClick={() => {
            actionLink()
            setCopied(true)
          }}
        >
          <div className={cx(classA)}>
            {svgIcon}
            &nbsp; {text}
          </div>
        </button>
      )}
    </div>
  )
}

export default Clickable
