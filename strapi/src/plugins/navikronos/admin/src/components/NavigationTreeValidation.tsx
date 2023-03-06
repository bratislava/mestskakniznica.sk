import React, { useMemo } from "react";
import { useNavigationDataDefined } from "../utils/NavigationDataProvider";
import { useConfigDefined } from "../utils/useConfig";
import {
  validateNavigation,
  NavigationTreeError,
} from "../utils/validateNavigation";
import { Status } from "@strapi/design-system";
import { Flex } from "@strapi/design-system";

const Error = ({ error }: { error: NavigationTreeError }) => {
  const { config } = useConfigDefined();
  const getContentTypeDisplayName = (uid: string) =>
    config.contentTypeInfos[uid]?.displayName ?? uid;
  const { locale } = useNavigationDataDefined();
  const getEntryDisplayName = (uid: string, id: number) =>
    config.entryRouteEntries[locale]?.[uid]?.find((route) => route.id === id)
      ?.title ?? id;

  switch (error.type) {
    case "nonexistentStaticRoute":
      return (
        <>{`Static route's id "${error.id}" is not in allowed list of static routes. (contact developer)`}</>
      );
    case "nonexistentContentTypeRoute":
      return (
        <>{`Content type route's type "${getContentTypeDisplayName(
          error.uid
        )}" is not in allowed list of content types for content type routes. (contact developer)`}</>
      );
    case "nonexistentEntryRouteContentType":
      return (
        <>{`Entry route's type "${getContentTypeDisplayName(
          error.uid
        )}" is not in allowed list of content types for entry routes. (contact developer)`}</>
      );
    case "nonexistentEntryRouteEntry":
      return (
        <>{`Entry route's of content type "${getContentTypeDisplayName(
          error.uid
        )}" with id "${error.id}" doesn't exist or is not published.`}</>
      );
    case "nonSingularContentTypeRoute":
      return (
        <>{`Content type route's type "${getContentTypeDisplayName(
          error.uid
        )}" route must be the only child of its parent route. Remove other routes on the same level.`}</>
      );
    case "duplicateContentTypeRoute":
      return (
        <>{`Multiple occurrences of the content type route with type "${getContentTypeDisplayName(
          error.uid
        )}" have been detected in the navigation. Remove the duplicates.`}</>
      );
    case "duplicateStaticRoute":
      return (
        <>{`Multiple occurrences of the static type route with id "${getContentTypeDisplayName(
          error.id
        )}" have been detected in the navigation. Remove the duplicates.`}</>
      );
    case "duplicateEntryRoute":
      return (
        <>{`Multiple occurrences of the entry type route of type "${getContentTypeDisplayName(
          error.uid
        )}" named "${getEntryDisplayName(
          error.uid,
          error.id
        )}" have been detected in the navigation. Remove the duplicates.`}</>
      );
  }
};

const NavigationTreeValidation = () => {
  const { navigationData, locale } = useNavigationDataDefined();
  const { config } = useConfigDefined();

  const errors = useMemo(
    () => validateNavigation(navigationData, locale, config),
    [navigationData, config, locale]
  );

  if (errors.length < 1) {
    return null;
  }

  return (
    <Status
      variant="warning"
      showBullet={false}
      style={{
        width: "1000px",
        marginBottom: "30px",
      }}
    >
      <Flex direction="column" alignItems="start" gap={5}>
        {errors.map((error) => (
          <span>
            • <Error error={error} />
          </span>
        ))}
      </Flex>
    </Status>
  );
  console.log(errors);

  return <div></div>;
};

export default NavigationTreeValidation;
