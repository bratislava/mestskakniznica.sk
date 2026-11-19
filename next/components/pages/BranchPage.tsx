import BranchDetails from '@/components/Molecules/BranchDetails/BranchDetails'
import { SectionContainer } from '@/components/ui'
import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'
import { BranchEntityFragment } from '@/services/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'

export interface PageProps {
  branch: BranchEntityFragment
}

const BranchPage = ({ branch }: PageProps) => {
  const { breadcrumbs } = useNavigation()

  return (
    <>
      <SectionContainer>
        <Breadcrumbs crumbs={breadcrumbs} />
      </SectionContainer>
      <SectionContainer>
        <BranchDetails branch={branch} />
      </SectionContainer>
    </>
  )
}

export default BranchPage
