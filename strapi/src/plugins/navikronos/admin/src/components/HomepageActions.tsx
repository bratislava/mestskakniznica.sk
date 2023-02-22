import React from "react";

import {
  Box,
  Button,
  Grid,
  GridItem,
  Option,
  Select,
  Stack,
} from "@strapi/design-system";
import { useConfigDefined } from "../utils/useConfig";
import { useNavigationDataDefined } from "../utils/NavigationDataProvider";

const HomepageActions = () => {
  const { config } = useConfigDefined();
  const { saveNavigation, isSaving, locale, setLocale } =
    useNavigationDataDefined();

  const hasLocalizations = config.i18n.enabled;

  const handleLocalizationSelection = (locale: string) => {
    setLocale(locale);
  };

  return (
    <Stack horizontal size={2}>
      <Box width="27vw" marginRight="8px">
        <Grid gap={4}>
          {hasLocalizations ? (
            <GridItem col={6}>
              <Select
                type="select"
                name="navigationLocalizationSelect"
                onChange={handleLocalizationSelection}
                value={locale}
                size="S"
              >
                {config.i18n?.locales?.map(({ code, name }) => (
                  <Option key={code} value={code}>
                    {name}
                  </Option>
                ))}
              </Select>
            </GridItem>
          ) : null}
          <GridItem col={3}>
            <Button
              onClick={saveNavigation}
              disabled={isSaving}
              type="submit"
              fullWidth
              size="S"
            >
              Save
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </Stack>
  );
};

export default HomepageActions;
