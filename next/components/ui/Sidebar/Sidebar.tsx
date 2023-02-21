import { ArrowLeftIcon } from '@assets/icons'
import ChevronRight from '@assets/images/chevron-right.svg'
import Button from '@modules/common/Button'
import MLink from '@modules/common/MLink'
import { useNavikronos } from '@utils/navikronos'
import cx from 'classnames'

export interface SidebarProps {
  className?: string
  title: string
  id: string | null
  categories: ICategory[]
  activeCategory: number
}

export interface ICategory {
  title: string
  id: string | null
}

export const Sidebar = ({ className, title, id, categories, activeCategory }: SidebarProps) => {
  const { getPathForEntity } = useNavikronos()

  return (
    <div className={className}>
      {/* TODO create component for this button or update Button variants */}
      <Button
        href={getPathForEntity({ type: 'page', id }) ?? '#'}
        variant="unstyled"
        startIcon={<ArrowLeftIcon />}
        className="inline-flex items-center gap-x-4 text-base uppercase"
      >
        {title}
      </Button>
      <div className={cx('flex flex-col')}>
        {categories.map((category, i) => {
          const isActive = activeCategory === i
          return (
            <MLink
              key={category.title}
              href={getPathForEntity({ type: 'page', id: category.id }) ?? '#'}
              variant="basic"
              className={cx('transform border-b py-3 transition-all duration-200 ease-linear', {
                'border-border-light text-foreground-body': !isActive,
                'flex items-center gap-x-5.5 border-border-dark pl-1.5 text-foreground-dark':
                  isActive,
              })}
            >
              {isActive && <ChevronRight />}
              {category.title}
            </MLink>
          )
        })}
      </div>
    </div>
  )
}
