import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'

import FbLogo from '@/assets/images/fb-logo.svg'
import IgLogo from '@/assets/images/ig-logo.svg'
import YtLogo from '@/assets/images/yt-logo.svg'
import Accordion from '@/modules/common/Accordion'
import MLink from '@/modules/common/MLink'
import { ComponentFooterFooterColumnFragment, Maybe } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

export interface FooterProps {
  className?: string
  facebookUrl: string
  instagramUrl: string
  youtubeUrl: string
  siteMap?: { title: string; href: string }
  footerColumns: Maybe<ComponentFooterFooterColumnFragment>[]
  gdpr: { title: string; href: string }
  VOP: { title: string; href: string }
  copyrightText?: string
}

const FooterLinks = ({
  footerLink,
}: {
  footerLink: ComponentFooterFooterColumnFragment['footerLink']
}) => {
  const { getPathForStrapiEntity } = useNavikronos()

  return (
    <>
      {footerLink?.filter(isDefined).map((link) => (
        <MLink
          key={link.id}
          href={link.otherSite || getPathForStrapiEntity(link.redirectTo?.data) || '#'}
          variant="basic"
          className="text-base text-foreground-body"
        >
          {link.title}
        </MLink>
      ))}
    </>
  )
}

const FooterSection = ({ col, i }: { col: ComponentFooterFooterColumnFragment; i: number }) => {
  return (
    <div
      key={col?.title}
      className={cx('pt-6 pb-12', {
        'border-l border-border-dark pl-8': i !== 0,
      })}
    >
      <h6 className="cursor-default text-h5" aria-label={col?.title || 'Title'}>
        {col?.title}
      </h6>
      <div className="mt-6 flex flex-col gap-y-3">
        <FooterLinks footerLink={col?.footerLink} />
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
  const { t } = useTranslation()

  return (
    <div className={className}>
      <div className="border-y border-border-dark lg:container">
        <div className="grid h-[60px] grid-cols-3 items-center lg:h-[80px]">
          <MLink
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            // Using `ring-inset` because offset doesn't look appealing in this context
            className="flex h-full items-center justify-center ring-inset ring-offset-0"
          >
            <FbLogo className="cursor-pointer lg:p-0" />
            <span className="sr-only">Facebook</span>
          </MLink>
          <MLink
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-full items-center justify-center border-x border-border-dark ring-inset ring-offset-0"
          >
            <IgLogo className="cursor-pointer lg:p-0" />
            <span className="sr-only">Instagram</span>
          </MLink>
          <MLink
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-full items-center justify-center ring-inset ring-offset-0"
          >
            <YtLogo className="cursor-pointer lg:p-0" />
            <span className="sr-only">Youtube</span>
          </MLink>
        </div>
      </div>
      {/* Mobile */}
      <div className="lg:hidden">
        {footerColumns?.filter(isDefined).map((col) => (
          <Accordion key={col?.id} title={col?.title} type="divider-small">
            <div className="flex flex-col gap-y-2">
              <FooterLinks footerLink={col?.footerLink} />
            </div>
          </Accordion>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-4 border-b border-border-dark lg:container lg:grid">
        {footerColumns?.map((col, i) => col && <FooterSection col={col} i={i} key={col.id} />)}
      </div>

      <div className="flex flex-col py-4 text-sm text-foreground-body lg:container lg:flex-row lg:items-center lg:justify-between lg:p-6">
        <p className="py-4 lg:py-0">
          &copy; {copyrightText || `${new Date().getFullYear()} ${t('pageTitle')}`}
        </p>
        <div className="flex flex-col gap-x-8 lg:flex-row lg:items-center">
          {siteMap && (
            <>
              <MLink href={siteMap.href}>{siteMap.title}</MLink> v4.0.1
            </>
          )}
          <MLink variant="basic" href={VOP.href}>
            {VOP.title}
          </MLink>
          <MLink variant="basic" href={gdpr.href}>
            {gdpr.title}
          </MLink>
        </div>
      </div>
    </div>
  )
}
