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

export function ExternalLinks({ className, title, sections }: ExternalLinksProps) {
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx(className, '')}>
      {title && <h3 className="text-md2 text-gray-universal-100">{title}</h3>}

      {sections && (
        <div className="flex flex-col space-y-8 mt-6">
          {sections?.map((section, index) => (
            <div key={index}>
              {section.description && <FlatText content={section.description} />}

              {section.links && (
                <div className="flex flex-col space-y-3 mt-4">
                  {section?.links.map((link) => (
                    <UILink
                      key={link.title}
                      className="flex justify-between items-center border border-gray-universal-100 p-4 text-gray-universal-100 text-sm"
                      href={link.url ?? '#'}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.title}
                      <Open />
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
