import { useTranslation } from 'next-i18next'
import Link from 'next/link'

interface AccouncementProps {
  title: string
  slug: string
}

function AnnouncementCard({ title, slug }: AccouncementProps) {
  const { t } = useTranslation('common')
  return (
    <Link key={slug} href={slug} passHref>
      <a href={slug}>
        <div className="relative h-full w-full">
          <div className="relative m-auto h-full cursor-pointer bg-promo-orange">
            <div>
              <div className="text-black m-auto justify-end pt-[18px] pl-5 pr-[25px] text-lg line-clamp-3 hover:underline">
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

export default AnnouncementCard
