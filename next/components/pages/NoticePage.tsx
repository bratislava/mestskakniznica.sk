import { Assets, PageTitle, SectionContainer } from '@/components/ui'
import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'
import RichText from '@/modules/formatting/RichText'
import { NoticeEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

export interface NoticePageProps {
  notice: NoticeEntityFragment
}

const NoticePage = ({ notice }: NoticePageProps) => {
  const { breadcrumbs } = useNavikronos()

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
