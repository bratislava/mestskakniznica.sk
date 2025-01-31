import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'
import { useNavikronos } from '@/utils/navikronos'

const PageBreadcrumbs = () => {
  const { breadcrumbs } = useNavikronos()

  return <Breadcrumbs crumbs={breadcrumbs} />
}

export default PageBreadcrumbs
