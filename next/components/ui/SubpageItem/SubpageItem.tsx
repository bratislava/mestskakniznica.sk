import ArrowRight from '@/assets/images/arrow-right-strong.svg'
import MLink from '@/modules/common/MLink'
import RichText from '@/modules/formatting/RichText'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import cn from '@/utils/cn'

export interface SubpageItemProps {
  className?: string
  title?: string
  description?: string
  url?: string | null
  pageSlug?: string | null
}

const SubpageItem = ({ className, title, description, url, pageSlug }: SubpageItemProps) => {
  const { getPathForEntity } = useNavigation()

  return (
    <MLink
      className={cn(className)}
      href={url ?? getPathForEntity({ type: 'page', slug: pageSlug }) ?? '#'}
    >
      <h3 className="border-border-dark text-h4">{title}</h3>
      {description && <RichText className="mt-4" content={description} />}
      <div className="mt-6 flex items-center justify-between border border-border-dark p-4">
        <span className="text-base">{title}</span>

        {url && <ArrowRight />}
      </div>
    </MLink>
  )
}

export default SubpageItem
