import { useNavikronos } from '@utils/navikronos'

import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'

const PageBreadcrumbs = () => {
  const { breadcrumbs } = useNavikronos()

  return <Breadcrumbs crumbs={breadcrumbs} />
}

export default PageBreadcrumbs
