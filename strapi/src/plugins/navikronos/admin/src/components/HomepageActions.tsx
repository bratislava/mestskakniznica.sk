import { Box, Button, Flex, Grid, SingleSelect, SingleSelectOption } from '@strapi/design-system'
import { useConfigDefined } from '../utils/useConfig'
import { useNavigationDataDefined } from '../utils/NavigationDataProvider'

const HomepageActions = () => {
  const { config } = useConfigDefined()
  const { saveNavigation, isSaving, locale, setLocale } = useNavigationDataDefined()

  const hasLocalizations = config.i18n.enabled

  const handleLocalizationSelection = (locale: string | number) => {
    setLocale(String(locale))
  }

  return (
    <Flex direction="row" gap={2}>
      <Box width="27vw" marginRight="8px">
        <Grid.Root gap={4}>
          {hasLocalizations ? (
            <Grid.Item col={6}>
              <SingleSelect
                name="navigationLocalizationSelect"
                onChange={handleLocalizationSelection}
                value={locale}
                size="S"
              >
                {config.i18n?.locales?.map(({ code, name }) => (
                  <SingleSelectOption key={code} value={code}>
                    {name}
                  </SingleSelectOption>
                ))}
              </SingleSelect>
            </Grid.Item>
          ) : null}
          <Grid.Item col={3}>
            <Button onClick={saveNavigation} disabled={isSaving} type="submit" fullWidth size="S">
              Save
            </Button>
          </Grid.Item>
        </Grid.Root>
      </Box>
    </Flex>
  )
}

export default HomepageActions
