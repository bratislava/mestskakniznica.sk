import Link from 'next/link'
import { useTranslation } from 'next-i18next'

interface IPromoNewsCard {
  title: string
  slug: string
}

const PromoNewsCard = ({ title, slug }: IPromoNewsCard) => {
  const { t } = useTranslation('common')
  return (
    <Link key={slug} href={slug} passHref>
      <a href={slug}>
        <div className="relative h-full w-full">
          <div className="relative m-auto h-full cursor-pointer bg-promo-peach">
            <div>
              <div
                className="m-auto justify-end pt-[18px] pl-5 pr-[25px] text-h3 text-black line-clamp-3 hover:underline">
                {title}
              </div>
            </div>

            <div className="absolute bottom-4 inline-flex space-x-4 pl-5 hover:underline">
              <p>
                {t('showMore')} {'>'}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PromoNewsCard
