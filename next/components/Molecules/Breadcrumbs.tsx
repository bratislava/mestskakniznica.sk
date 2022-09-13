import ArrowLeft from '@assets/images/arrow-left.svg'
import ChevronDown from '@assets/images/chevron-down.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import ChevronUp from '@assets/images/chevron-up.svg'
import Home from '@assets/images/home.svg'
import cx from 'classnames'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Fragment, useState } from 'react'

export interface BreadcrumbsProps {
  crumbs: { title: string; url: string | null }[]
}

// TODO consolidate with Breadcrumbs in ui directory, find out if those are ever used

function DesktopBreadCrumbs({ crumbs }: BreadcrumbsProps) {
  const { t } = useTranslation('common')
  return (
    <>
      {crumbs.map((crumb, i) => {
        const last = i === crumbs.length - 1
        const first = i === 0

        return (
          <Fragment key={i}>
            {crumb.url ? (
              <Link href={crumb.url} passHref>
                <a className="flex-shrink" href={crumb.url}>
                  {first ? (
                    <>
                      <Home className="cursor-pointer" />
                      <span className="sr-only">{t('homepage')}</span>
                    </>
                  ) : (
                    <span
                      style={{
                        textUnderlineOffset: 1,
                      }}
                      className={cx('cursor-pointer truncate text-xs', {
                        underline: !last,
                      })}
                    >
                      {crumb.title}
                    </span>
                  )}
                </a>
              </Link>
            ) : (
              <span>{crumb.title}</span>
            )}
            {!last && (
              <span className="px-4">
                <ChevronRight />
              </span>
            )}
          </Fragment>
        )
      })}
    </>
  )
}

// Mobile version
function MobileBreadcrumbs({ crumbs }: BreadcrumbsProps) {
  const [isOpen, setOpen] = useState(false)
  const { t } = useTranslation('common')

  const primaryBreadcrumbs: { title: string; url: string | null }[] = []
  const secondaryBreadcrumbs: { title: string; url: string | null }[] = []

  // homepage
  primaryBreadcrumbs.push({ title: '', url: '/' })
  secondaryBreadcrumbs.push({ title: t('homepage'), url: '/' })

  // homepage > link1 > link2
  if (crumbs.length > 2) {
    primaryBreadcrumbs.push({ title: '...', url: '' })
    crumbs.slice(1, -1).map((crumb) => secondaryBreadcrumbs.push(crumb))
  }

  // homepage > link1
  if (crumbs.length > 1) {
    primaryBreadcrumbs.push(crumbs[crumbs.length - 1])
  }

  return (
    <div className={cx('w-full overflow-hidden lg:hidden')}>
      <button
        onClick={() => setOpen((prevState) => !prevState)}
        className={cx(
          'flex w-full cursor-pointer items-center justify-between overflow-x-auto py-4'
        )}
      >
        <div className="flex w-fit flex-shrink flex-row items-center">
          <DesktopBreadCrumbs crumbs={primaryBreadcrumbs} />
        </div>
        <div className="ml-4">{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
      </button>

      <div
        className={cx('transform transition-all duration-200 ease-linear', {
          'h-0': !isOpen,
          'mt-3 h-full': isOpen,
        })}
      >
        <div className="flex flex-col space-y-3">
          {secondaryBreadcrumbs.map((crumb) => (
            <Link href={crumb.url || ''} passHref key={crumb.title}>
              <a>
                <div className="flex items-center space-x-4" key={crumb.title}>
                  <ArrowLeft />
                  <span>{crumb.title}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <>
      <div className="hidden flex-row items-center py-[18px] lg:flex">
        <DesktopBreadCrumbs crumbs={crumbs} />
      </div>
      <MobileBreadcrumbs crumbs={crumbs} />
    </>
  )
}

export default Breadcrumbs
