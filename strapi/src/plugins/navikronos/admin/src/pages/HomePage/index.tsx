/*
 *
 * HomePage
 *
 */

import React from "react";
import pluginId from "../../pluginId";
import {
  fetchContentTypeEntries,
  fetchNavigation,
  fetchNavikronosConfig,
} from "../../utils/api";
import { LoadingIndicatorPage, useNotification } from "@strapi/helper-plugin";

import { Main } from "@strapi/design-system/Main";
import { Flex } from "@strapi/design-system/Flex";
import { ContentLayout } from "@strapi/design-system/Layout";
import { Typography } from "@strapi/design-system/Typography";
import { Box } from "@strapi/design-system/Box";
import { HeaderLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import { Icon } from "@strapi/design-system/Icon";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Button } from "@strapi/design-system/Button";
import { Select, Option } from "@strapi/design-system/Select";
import { useData } from "../../utils/useData";
import NavigationTree from "../../components/NavigationTree/NavigationTree";
import {
  NavigationDataProvider,
  useNavigationData,
} from "../../utils/NavigationDataProvider";
import AddEditModal from "../../components/AddEditModal";

const HomePage = () => {
  const { data: dataConfig, isLoading } = useData();
  const { data } = useNavigationData();
  console.log("nav", data);

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
          {isLoading && <LoadingIndicatorPage />}
          {!isLoading && data && <NavigationTree />}
        </ContentLayout>
      </Main>
      <AddEditModal />
    </>
  );
};

export default () => (
  <NavigationDataProvider>
    <HomePage />
  </NavigationDataProvider>
);
