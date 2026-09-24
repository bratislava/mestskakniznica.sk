import { Main } from '@strapi/design-system'
import { Layouts } from '@strapi/strapi/admin'

import { useHasConfig } from '../utils/useConfig'
import NavigationTree from '../components/NavigationTree'
import { NavigationDataProvider, useHasNavigationData } from '../utils/NavigationDataProvider'
import EditAddModal from '../components/EditAddModal'
import { EditAddModalProvider } from '../utils/EditAddModalProvider'
import HomepageActions from '../components/HomepageActions'
import { Page } from '@strapi/strapi/admin'

const Homepage = () => {
  const hasNavigationData = useHasNavigationData()
  const hasConfig = useHasConfig()

  const hasData = hasNavigationData && hasConfig

  return (
    <>
      <Main>
        <Layouts.Header primaryAction={hasData && <HomepageActions />} title={'Navikronos'} />

        <Layouts.Content>
          {hasData ? (
            <EditAddModalProvider>
              <EditAddModal />

              <NavigationTree />
            </EditAddModalProvider>
          ) : (
            <Page.Loading />
          )}
        </Layouts.Content>
      </Main>
    </>
  )
}

export default () => (
  <NavigationDataProvider>
    <Homepage />
  </NavigationDataProvider>
)
