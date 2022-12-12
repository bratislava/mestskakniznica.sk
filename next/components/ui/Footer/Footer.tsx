import FbLogo from '@assets/images/fb-logo.svg'
import IgLogo from '@assets/images/ig-logo.svg'
import YtLogo from '@assets/images/yt-logo.svg'
import { ComponentFooterFooterColumn, Maybe } from '@bratislava/strapi-sdk-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { Accordion } from '../Accordion/Accordion'
import { Link } from '../Link/Link'

export interface IFooterColumn {
  id: string
  title: string
  footerLink: {
    id: string
    title: string
    otherSite: string
    redirectTo: {
      id: string
      title: string
      slug: string
    }
  }[]
}

export interface FooterProps {
  className?: string
  facebookUrl: string
  instagramUrl: string
  youtubeUrl: string
  siteMap?: { title: string; href: string }
  footerColumns: Maybe<ComponentFooterFooterColumn>[]
  gdpr: { title: string; href: string }
  VOP: { title: string; href: string }
  copyrightText?: string
}

const FooterSection = ({ col, i }: { col: ComponentFooterFooterColumn; i: number }) => {
  return (
    <div
      key={col?.title}
      className={cx('pt-6 pb-40', {
        'border-l border-border-dark pl-8': i !== 0,
      })}
    >
      <h6 className="cursor-default text-default" aria-label={col?.title || 'Title'}>
        {col?.title}
      </h6>
      <div className="mt-6 flex flex-col gap-y-3">
        {col?.footerLink?.map((link) =>
          link?.otherSite && link.otherSite !== '' ? (
            <a
              href={link.otherSite}
              className="text-base text-text-body hover:underline"
              key={link.id}
            >
              {link.title}
            </a>
          ) : (
            <Link
              key={link?.id}
              variant="plain"
              uppercase={false}
              href={link?.redirectTo?.data?.attributes?.slug || ''}
              className="text-base text-text-body hover:underline"
            >
              {link?.title}
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export const Footer = ({
  className,
  siteMap,
  gdpr,
  VOP,
  facebookUrl,
  instagramUrl,
  youtubeUrl,
  footerColumns,
  copyrightText,
}: FooterProps) => {
  const { t } = useTranslation('common')
  const [openFooter, setOpenFooter] = useState('')

  const listenAccordionState = (id: string, state: boolean) => {
    setOpenFooter(state ? id : '')
  }

  return (
    <div className={className}>
      <div className="border-y border-border-dark lg:container">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center justify-center">
            <a href={facebookUrl} target="_blank" rel="noreferrer">
              <FbLogo className="cursor-pointer lg:p-0" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
          <div className="flex items-center justify-center border-x border-border-dark py-5 lg:py-6">
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              <IgLogo className="cursor-pointer lg:p-0" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <a href={youtubeUrl} target="_blank" rel="noreferrer">
              <YtLogo className="cursor-pointer lg:p-0" />
              <span className="sr-only">Youtube</span>
            </a>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="lg:hidden">
        {footerColumns?.map(
          (col, i) =>
            col && (
              <Accordion
                type="divider"
                size="small"
                label={col?.title || ''}
                id={col?.title || ''}
                stateListener={listenAccordionState}
                defaultState={openFooter === col?.title}
                content={
                  <div className="flex flex-col gap-y-2">
                    {col?.footerLink?.map((item) => (
                      <Link
                        key={item?.title}
                        uppercase={false}
                        variant="plain"
                        href={item?.redirectTo?.data?.attributes?.slug || ''}
                      >
                        {item?.title}
                      </Link>
                    ))}
                  </div>
                }
                key={i}
              />
            )
        )}
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-4 border-b border-border-dark lg:container lg:grid">
        {footerColumns?.map((col, i) => col && <FooterSection col={col} i={i} key={i} />)}
      </div>

      <div className="flex flex-col pb-4 text-xs text-text-body lg:container lg:flex-row lg:items-center lg:justify-between lg:p-6 lg:pb-0">
        <p className="py-4 lg:py-0">
          &copy; {copyrightText || `${new Date().getFullYear()} ${t('pageTitle')}`}
        </p>
        <div className="flex flex-col gap-x-8 lg:flex-row lg:items-center">
          {siteMap && (
            <>
              <Link variant="plain" uppercase={false} href={siteMap.href}>
                {siteMap.title}
              </Link>{' '}
              v4.0.1
            </>
          )}
          <Link variant="plain" uppercase={false} href={VOP.href}>
            {VOP.title}
          </Link>
          <Link variant="plain" uppercase={false} href={gdpr.href}>
            {gdpr.title}
          </Link>
        </div>
      </div>
    </div>
  )
}
