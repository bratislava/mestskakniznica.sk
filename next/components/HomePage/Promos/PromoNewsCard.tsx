import MLink from '@modules/common/MLink'
import ShowMoreButton from '@modules/common/ShowMoreButton'
import { useTranslation } from 'next-i18next'

interface IPromoNewsCard {
  title: string
  slug: string
}

const PromoNewsCard = ({ title, slug }: IPromoNewsCard) => {
  const { t } = useTranslation('common')
  return (
    <div className="group relative h-full w-full bg-promo-peach">
      <div className="pt-[18px] pl-5 pr-[25px] text-h2 text-foreground-heading line-clamp-5">
        <MLink href={slug} variant="basic" className="after:absolute after:inset-0 after:z-[1]">
          {title}
        </MLink>
      </div>

      <div className="absolute bottom-4 left-5">
        <ShowMoreButton uppercase />
      </div>
    </div>
  )
}

export default PromoNewsCard
