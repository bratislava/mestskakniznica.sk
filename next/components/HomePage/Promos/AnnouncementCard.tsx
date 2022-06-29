import Link from 'next/link'
import { useTranslation } from 'next-i18next'

interface AccouncementProps {
  title: string
  slug: string
}

function AnnouncementCard({ title, slug }: AccouncementProps) {
  const { t } = useTranslation('common')
  return (
    <Link key={slug} href={slug} passHref>
      <a href={slug}>
        <div className="w-full h-full relative">
          <div className="bg-promo-orange m-auto h-full cursor-pointer relative">
            <div>
              <div className="text-black pt-[18px] pl-5 pr-[25px] justify-end text-lg m-auto hover:underline">
                {title}
              </div>
            </div>

            <div className="pl-5 bottom-4 absolute inline-flex space-x-4 hover:underline">
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
