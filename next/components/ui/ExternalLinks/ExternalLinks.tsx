import Open from '@assets/images/open-in-new.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import FlatText from '../FlatText/FlatText'

export type TExternalLinksSection = {
  description?: string
  links?: { title?: string; url?: string }[]
}

export interface ExternalLinksProps {
  className?: string
  title?: string
  sections?: TExternalLinksSection[]
}

export const ExternalLinks = ({ className, title, sections }: ExternalLinksProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx(className)}>
      {title && <h3 className="text-h3.5">{title}</h3>}

      {sections && (
        <div className="mt-6 flex flex-col space-y-8">
          {sections?.map((section, index) => (
            <div key={index}>
              {section.description && <FlatText content={section.description}/>}

              {section.links && (
                <div className="mt-4 flex flex-col space-y-3">
                  {section?.links.map((link) => (
                    <UILink
                      key={link.title}
                      className="flex items-center justify-between border border-border-dark p-4 text-base text-foreground-heading"
                      href={link.url ?? '#'}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.title}
                      <Open/>
                    </UILink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
