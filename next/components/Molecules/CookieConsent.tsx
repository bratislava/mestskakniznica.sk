import ChevronDown from '@assets/images/chevron-down.svg'
import ChevronUp from '@assets/images/chevron-up.svg'
import Close from '@assets/images/hamburger-close.svg'
import cx from 'classnames'
import Link from 'next/link'
import React from 'react'
import Consent, { Cookies } from 'react-cookie-consent'
import * as ReactGA from 'react-ga'
import { useTranslation } from 'react-i18next'
import Modal from 'react-modal'

const CUSTOM_STYLES = {
  content: {
    zIndex: '100',
    background: 'white',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
}

function CookieConsent() {
  const { t } = useTranslation(['common'])
  const [showModal, setShowModal] = React.useState(false)
  const [isConsentSubmitted, setConsent] = React.useState(false)
  const [securityCookies] = React.useState<boolean>(true)
  const [performanceCookies, setPerformanceCookies] = React.useState<boolean>(true)
  const [advertisingCookies, setAdvertisingCookies] = React.useState<boolean>(true)
  const [openPanel, setPanel] = React.useState<string>(t('cookie_consent_security_essential_titile'))
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID ?? '')
  const closeModal = () => {
    setShowModal(false)
  }

  const saveSettings = () => {
    Cookies.set('city-library-gdpr', {
      security_cookies: securityCookies,
      performance_cookies: performanceCookies,
      advertising_and_targeting_cookies: advertisingCookies,
    })
    ReactGA.set({
      security_cookies: securityCookies,
      performance_cookies: performanceCookies,
      advertising_and_targeting_cookies: advertisingCookies,
    })
    setShowModal(false)
    setConsent(true)
  }
  const acceptAllCookies = () => {
    Cookies.set('city-library-gdpr', {
      security_cookies: true,
      performance_cookies: true,
      advertising_and_targeting_cookies: true,
    })
    ReactGA.set({
      security_cookies: true,
      performance_cookies: true,
      advertising_and_targeting_cookies: true,
    })
    setShowModal(false)
    setConsent(true)
  }
  const declineCookies = () => {
    setPerformanceCookies(false)
    setAdvertisingCookies(false)
    Cookies.set('city-library-gdpr', {
      security_cookies: true,
      performance_cookies: false,
      advertising_and_targeting_cookies: false,
    })
    ReactGA.set({
      security_cookies: true,
      performance_cookies: false,
      advertising_and_targeting_cookies: false,
    })
    setTimeout(() => {
      setShowModal(false)
      setConsent(true)
    }, 300)
  }
  return (
    <div>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={CUSTOM_STYLES}
        ariaHideApp={false}
        className="w-10/12 md:w-7/12 mx-auto min-h-fit fixed"
      >
        <div>
          <div className="flex w-full justify-between items-center mb-[10px] px-5 md:p-5 border-b">
            <div>{t('cookie_consent_modal_title')}</div>
            <Link href="javascript:void(0)">
              <a
                className="cursor-pointer p-1 m-3 md:m-0 md:p-2 rounded-md border-2 border-gray-900"
                onClick={closeModal}
              >
                <Close />
              </a>
            </Link>
          </div>
          <div className="p-5">
            <div className="h-full max-h-[400px] overflow-y-scroll">
              <div>
                <div className="font-medium mb-2">{t('cookie_consent_modal_content_title')}</div>
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: t('cookie_consent_modal_conent_body'),
                  }}
                />
              </div>
              <Panel
                title={t('cookie_consent_security_essential_titile')}
                content={<>{t('cookie_consent_security_essential_content')}</>}
                value={securityCookies}
                onValueChange={() => null}
                isOpen={openPanel === t('cookie_consent_security_essential_titile')}
                setPanel={setPanel}
              />
              <Panel
                title={t('cookie_consent_performance_title')}
                content={<>{t('cookie_consent_performance_content')}</>}
                value={performanceCookies}
                onValueChange={(val) => setPerformanceCookies(val)}
                isOpen={openPanel === t('cookie_consent_performance_title')}
                setPanel={setPanel}
              />
              <Panel
                title={t('cookie_consent_advertising_targeting_title')}
                content={<>{t('cookie_consent_advertising_targeting_content')}</>}
                value={advertisingCookies}
                onValueChange={(val) => setAdvertisingCookies(val)}
                isOpen={openPanel === t('cookie_consent_advertising_targeting_title')}
                setPanel={setPanel}
              />
            </div>
            <div className="mt-5 flex gap-1 justify-between flex-col md:flex-row">
              <button className="px-3 py-1 text-sm rounded-sm bg-gray-900 text-white" onClick={saveSettings}>
                {t('cookie_consent_save_settings')}
              </button>
              <div className="flex gap-1 flex-col md:flex-row">
                <button
                  className="min-w-[140px] md:mr-1 py-1 text-sm rounded-sm bg-gray-900 text-white"
                  onClick={declineCookies}
                >
                  {t('cookie_consent_rejectall')}
                </button>
                <button
                  className="min-w-[140px] py-1 text-sm rounded-sm bg-gray-900 text-white"
                  onClick={acceptAllCookies}
                >
                  {t('cookie_consent_acceptall')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Consent
        onAccept={() => {
          acceptAllCookies()
        }}
        buttonText={t('cookie_consent_acceptall')}
        ariaAcceptLabel={t('cookie_consent_accept_aria_label')}
        enableDeclineButton
        declineButtonText={t('cookie_consent_rejectall')}
        ariaDeclineLabel={t('cookie_consent_reject_aria_label')}
        declineButtonClasses="text-sm"
        flipButtons
        declineButtonStyle={{
          background: 'black',
          minWidth: '120px',
        }}
        buttonClasses="bg-gray-200 text-sm"
        buttonStyle={{
          background: 'black',
          color: 'white',
          minWidth: '120px',
        }}
        containerClasses="bg-white"
        style={{
          zIndex: '1',
          display: !showModal && !isConsentSubmitted ? 'flex' : 'none',
          alignItems: 'center',
          background: 'white',
          color: 'black',
          padding: '10px',
        }}
        expires={365}
        cookieName="city-library-gdpr"
      >
        <div className="text-sm" tabIndex={1}>
          {t('cookie_consent_body')}{' '}
          <Link href="javascript:void(0)">
            <a className="text-red-600 underline cursor-pointer" onClick={() => setShowModal(true)} tabIndex={2}>
              {t('cookie_consent_setting')}
            </a>
          </Link>
        </div>
      </Consent>
    </div>
  )
}

interface SwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
}

function Switch({ value, onValueChange, disabled }: SwitchProps) {
  const { t } = useTranslation(['common'])
  return (
    <button
      disabled={disabled}
      className={cx('w-25 h-6 flex items-center border border-gray-900 rounded-full mx-3 px-0.5', {
        'justify-end bg-red-600': value,
        'bg-gray-400': !value,
        'cursor-not-allowed border-gray-100 bg-gray-300': disabled,
      })}
      onClick={(e) => {
        e.stopPropagation()
        onValueChange(!value)
      }}
    >
      {value && (
        <span className="w-full pl-[5px] text-center text-[10px] font-bold">{t('cookie_consent_switch_accept')}</span>
      )}
      <div
        onClick={(e) => {
          if (disabled) e.stopPropagation()
        }}
        className={cx('w-3.5 h-3.5 bg-white rounded-full shadow-md')}
        aria-hidden="true"
      />
      {!value && (
        <span className="w-full pr-[5px] text-center text-[10px] font-bold">{t('cookie_consent_switch_decline')}</span>
      )}
    </button>
  )
}
interface PanelProps {
  title: string
  content: React.ReactNode
  value: boolean
  onValueChange: (value: boolean) => void
  isOpen: boolean
  setPanel: (value: string) => void
}

function Panel({ title, content, value, onValueChange, isOpen, setPanel }: PanelProps) {
  const { t } = useTranslation(['common'])
  return (
    <>
      <div className="mt-2 flex justify-between items-center bg-gray-200 px-2 py-3">
        <button className="flex items-center gap-2" onClick={() => setPanel(isOpen ? '' : title)}>
          <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
          {title}
        </button>
        <Switch
          disabled={title === t('cookie_consent_security_essential_titile')}
          value={value}
          onValueChange={(val) => onValueChange(val)}
        />
      </div>
      <div
        className={cx('text-base text-gray-universal-70 transform transition-all duration-200 ease-linear', {
          'h-0 hidden': !isOpen,
          'h-full mt-1 pb-8': isOpen,
        })}
      >
        {content}
      </div>
    </>
  )
}

export default CookieConsent
