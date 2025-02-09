import RichText from '@/modules/formatting/RichText'
import cn from '@/utils/cn'

export interface FlatTextProps {
  className?: string
  content?: string
}

export const FlatText = ({ className, content }: FlatTextProps) => {
  return (
    <div className={cn(className, 'space-y-10')}>
      <RichText content={content ?? ''} />
    </div>
  )
}

export default FlatText
