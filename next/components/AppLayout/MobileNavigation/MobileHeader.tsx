import Burger from '@assets/images/Burger.svg'
import { MenuEntity } from '@bratislava/strapi-sdk-city-library'
import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import SearchBox from '../Navigation/SearchBox'
import SkipNavigation from '../SkipNavigation'
import { MobileNavigation } from './MobileNavigation'

interface HeaderProps {
  menus: MenuEntity[]
}

const TITLE_CLASSES =
  'flex h-[30px] min-w-fit items-center border-r border-border-dark px-[7px] py-[2px]'

const MobilHeader = ({ menus }: HeaderProps) => {
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')

  // close mobile header on route change
  useEffect(() => {
    router.events.on('routeChangeStart', () => setOpen(false))
    return () => router.events.off('routeChangeStart', () => setOpen(false))
  }, [router])

  return (
    <>
      <div className="m-auto">
        <div className="border-border-dark flex justify-between border-b">
          <Link href="/" passHref>
            <>
              <a className="relative hidden w-full grid-cols-10 items-center pr-8 uppercase lg:grid">
                {t('pageTitle')
                  .split(' ')
                  .map((word) => (
                    <span
                      key={word}
                      className={cx(TITLE_CLASSES, {
                        'col-span-1': word.length <= 4,
                        'col-span-5': word.length > 4,
                      })}
                    >
                      {word}
                    </span>
                  ))}
                <div className="border-border-dark absolute top-1/2 -z-10 w-full border-b" />
              </a>
              <Link href="/" passHref>
                <a className="flex w-full flex-col justify-center">
                  <div className="relative flex w-full flex-wrap items-center pr-8 uppercase lg:hidden">
                    {t('pageTitle')
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => (
                        <span key={word} className={cx(TITLE_CLASSES)}>
                          {word}
                        </span>
                      ))}
                    <div className="border-border-dark absolute bottom-0 -z-10 w-full border-b" />
                  </div>
                  <div className="relative flex w-full flex-wrap items-center pr-8 uppercase lg:hidden">
                    {t('pageTitle')
                      .split(' ')
                      .slice(2)
                      .map((word) => (
                        <span key={word} className={cx(TITLE_CLASSES)}>
                          {word}
                        </span>
                      ))}
                  </div>
                </a>
              </Link>
            </>
          </Link>

          <SkipNavigation />

          <div className="border-border-dark border-l">
            <Burger onClick={() => setOpen(true)} className="m-4 cursor-pointer" />
            {isOpen && <MobileNavigation menus={menus} onClose={() => setOpen(false)} />}
          </div>
        </div>
      </div>

      <div className="border-border-dark m-auto border-b">
        <div className="flex">
          <div className="w-[320px] py-2 px-[5px]">
            <SearchBox text={t('searchBook')} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MobilHeader
