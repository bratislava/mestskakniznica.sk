import React from "react";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";

import { Main } from "@strapi/design-system/Main";
import { ContentLayout, HeaderLayout } from "@strapi/design-system/Layout";
import { Box } from "@strapi/design-system/Box";
import { Stack } from "@strapi/design-system/Stack";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Button } from "@strapi/design-system/Button";
import { Select } from "@strapi/design-system/Select";
import { useConfig } from "../../utils/useConfig";
import NavigationTree from "../../components/NavigationTree/NavigationTree";
import {
  NavigationDataProvider,
  useNavigationData,
} from "../../utils/NavigationDataProvider";
import EditAddModal from "../../components/EditAddModal";
import { EditAddModalProvider } from "../../utils/EditAddModalProvider";

const HomePage = () => {
  const { isLoading: configIsLoading } = useConfig();
  const { isLoading: navigationDataIsLoading } = useNavigationData();

  const isLoading = navigationDataIsLoading || configIsLoading;

  return (
    <>
      <Main>
        <HeaderLayout
          primaryAction={
            <Stack horizontal size={2}>
              <Box width="27vw" marginRight="8px">
                <Grid gap={4}>
                  {/*{!hasLocalizations ? <GridItem col={2} /> : null}*/}
                  <GridItem col={3}>
                    <Button
                      // onClick={openNavigationManagerModal}
                      startIcon={null}
                      type="button"
                      variant="secondary"
                      fullWidth
                      size="S"
                    >
                      asdad
                    </Button>
                  </GridItem>
                  <GridItem col={4}>
                    <Select
                      type="select"
                      placeholder="Change navigation"
                      name="navigationSelect"
                      // onChange={handleChangeSelection}
                      // value={passedActiveNavigation?.id}
                      size="S"
                      style={null}
                    >
                      {/*{availableNavigations.map(({ id, name }) => (*/}
                      {/*  <Option key={id} value={id}>*/}
                      {/*    {name}*/}
                      {/*  </Option>*/}
                      {/*))}*/}
                    </Select>
                  </GridItem>
                  {/*{hasLocalizations ? (*/}
                  {/*  <GridItem col={2}>*/}
                  {/*    <Select*/}
                  {/*      type="select"*/}
                  {/*      placeholder={formatMessage(*/}
                  {/*        getTrad(*/}
                  {/*          "pages.main.header.localization.select.placeholder"*/}
                  {/*        )*/}
                  {/*      )}*/}
                  {/*      name="navigationLocalizationSelect"*/}
                  {/*      onChange={handleLocalizationSelection}*/}
                  {/*      value={activeNavigation?.id}*/}
                  {/*      size="S"*/}
                  {/*    >*/}
                  {/*      {allLocaleVersions.map(({ id, localeCode }) => (*/}
                  {/*        <Option key={id} value={id}>*/}
                  {/*          {localeCode}*/}
                  {/*        </Option>*/}
                  {/*      ))}*/}
                  {/*    </Select>*/}
                  {/*  </GridItem>*/}
                  {/*) : null}*/}
                  <GridItem col={3}>
                    <Button
                      // onClick={handleSave}
                      // startIcon={submitIcon}
                      // disabled={structureHasErrors || !structureHasChanged}
                      type="submit"
                      fullWidth
                      size="S"
                    >
                      {/*{formatMessage(getTrad("submit.cta.save"))}*/}
                    </Button>
                  </GridItem>
                </Grid>
              </Box>
              {/* <MoreButton
              id="more"
              label="More"
              icon={<More />}
            /> */}
              {/*{navigationManagerModal}*/}
            </Stack>
          }
          title={"Navikronos"}
        />
        <ContentLayout>
          {isLoading ? (
            <LoadingIndicatorPage />
          ) : (
            <EditAddModalProvider>
              <EditAddModal />

              <NavigationTree />
            </EditAddModalProvider>
          )}
        </ContentLayout>
      </Main>
    </>
  );
};

export default () => (
  <NavigationDataProvider>
    <HomePage />
  </NavigationDataProvider>
);
