import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'
import { useNavigation } from '@/services/navigation/NavigationProvider'

const PageBreadcrumbs = () => {
  const { breadcrumbs } = useNavigation()

  return <Breadcrumbs crumbs={breadcrumbs} />
}

export default PageBreadcrumbs
