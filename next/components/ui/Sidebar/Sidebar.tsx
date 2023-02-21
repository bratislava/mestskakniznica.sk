import { ArrowLeftIcon } from '@assets/icons'
import ChevronRight from '@assets/images/chevron-right.svg'
import Button from '@modules/common/Button'
import MLink from '@modules/common/MLink'
import { PageEntity } from '@services/graphql'
import { useNavikronos } from '@utils/navikronos'
import cx from 'classnames'

export interface SidebarProps {
  className?: string
  page: PageEntity
}

export const Sidebar = ({ className, page }: SidebarProps) => {
  const { siblings, currentPath, getPathForEntity } = useNavikronos()

  return (
    <div className={className}>
      {/* TODO create component for this button or update Button variants */}
      {page && (
        <Button
          href={getPathForEntity({ type: 'page', id: page.id }) ?? '#'}
          variant="unstyled"
          startIcon={<ArrowLeftIcon />}
          className="inline-flex items-center gap-x-4 text-base uppercase"
        >
          {page.attributes?.title}
        </Button>
      )}
      <div className={cx('flex flex-col')}>
        {siblings.map((child, index) => {
          const isActive = child.path === currentPath
          return (
            <MLink
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              href={child.path}
              variant="basic"
              className={cx('transform border-b py-3 transition-all duration-200 ease-linear', {
                'border-border-light text-foreground-body': !isActive,
                'flex items-center gap-x-5.5 border-border-dark pl-1.5 text-foreground-dark':
                  isActive,
              })}
            >
              {isActive && <ChevronRight />}
              {child.title}
            </MLink>
          )
        })}
      </div>
    </div>
  )
}
