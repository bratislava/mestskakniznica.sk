import Breadcrumbs from '@modules/breadcrumbs/Breadcrumbs'
import { useNavikronos } from '@utils/navikronos'

const PageBreadcrumbs = () => {
  const { getBreadcrumbs } = useNavikronos()
  const breadcrumbs = getBreadcrumbs()

  return <Breadcrumbs crumbs={breadcrumbs} />
}

export default PageBreadcrumbs
