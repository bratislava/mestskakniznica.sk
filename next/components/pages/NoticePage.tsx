import { Assets, PageTitle, SectionContainer } from '@/components/ui'
import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'
import RichText from '@/modules/formatting/RichText'
import { NoticeEntityFragment } from '@/services/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import { isDefined } from '@/utils/isDefined'

export interface NoticePageProps {
  notice: NoticeEntityFragment
}

const NoticePage = ({ notice }: NoticePageProps) => {
  const { breadcrumbs } = useNavigation()

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle title={notice?.title ?? ''} />
        <div className="my-6">
          <RichText content={notice?.body ?? ''} />
        </div>
      </SectionContainer>
      <SectionContainer>
        <Assets
          assets={[
            ...(notice?.assets?.assets ?? []),
            ...(notice?.assets?.disclosures ?? []),
          ].filter(isDefined)}
        />
      </SectionContainer>
    </>
  )
}

export default NoticePage
