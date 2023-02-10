import React from "react";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";

import { Main } from "@strapi/design-system/Main";
import { ContentLayout, HeaderLayout } from "@strapi/design-system/Layout";
import { useHasConfig } from "../utils/useConfig";
import NavigationTree from "../components/NavigationTree";
import {
  NavigationDataProvider,
  useHasNavigationData,
} from "../utils/NavigationDataProvider";
import EditAddModal from "../components/EditAddModal";
import { EditAddModalProvider } from "../utils/EditAddModalProvider";
import HomepageActions from "../components/HomepageActions";

const Homepage = () => {
  const hasNavigationData = useHasNavigationData();
  const hasConfig = useHasConfig();

  const hasData = hasNavigationData && hasConfig;

  return (
    <>
      <Main>
        <HeaderLayout
          primaryAction={hasData && <HomepageActions />}
          title={"Navikronos"}
        />
        <ContentLayout>
          {hasData ? (
            <EditAddModalProvider>
              <EditAddModal />

              <NavigationTree />
            </EditAddModalProvider>
          ) : (
            <LoadingIndicatorPage />
          )}
        </ContentLayout>
      </Main>
    </>
  );
};

export default () => (
  <NavigationDataProvider>
    <Homepage />
  </NavigationDataProvider>
);
