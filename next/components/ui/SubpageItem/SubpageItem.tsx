import ArrowRight from '@/assets/images/arrow-right-strong.svg'
import MLink from '@/modules/common/MLink'
import RichText from '@/modules/formatting/RichText'
import cn from '@/utils/cn'
import { useNavikronos } from '@/utils/navikronos'

export interface SubpageItemProps {
  className?: string
  title?: string
  description?: string
  url?: string | null
  id?: string | null
}

const SubpageItem = ({ className, title, description, url, id }: SubpageItemProps) => {
  const { getPathForEntity } = useNavikronos()

  return (
    <MLink className={cn(className)} href={url ?? getPathForEntity({ type: 'page', id }) ?? '#'}>
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
