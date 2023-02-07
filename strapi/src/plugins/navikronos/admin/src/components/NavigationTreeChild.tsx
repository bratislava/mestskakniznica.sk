import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, CardBody } from "@strapi/design-system/Card";
import { Badge } from "@strapi/design-system/Badge";
import { Typography } from "@strapi/design-system/Typography";
import { useConfigDefined } from "../utils/useConfig";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import { Pencil, Plus, Trash } from "@strapi/icons";
import { TextButton } from "@strapi/design-system/TextButton";
import { useNavigationDataDefined } from "../utils/NavigationDataProvider";
import { useEditAdd } from "../utils/EditAddModalProvider";
import { NavikronosRoute } from "../../../shared/types";

type NavigationTreeChildProps = {
  child: NavikronosRoute;
  locationIndexes: number[];
};

const Children = styled.div`
  margin-left: 20px;
`;

const NavigationTreeChild = ({
  child,
  locationIndexes,
}: NavigationTreeChildProps) => {
  const { openEditModal, openAddModal } = useEditAdd();
  const { config } = useConfigDefined();
  const { locale, removeRoute } = useNavigationDataDefined();

  const canHaveChildren = child.type !== "contentType";

  const badge = useMemo(() => {
    switch (child.type) {
      case "contentType":
        return { title: "Content type", color: "primary500" };
      case "static":
        return { title: "Static", color: "success500" };
      case "listing":
        return { title: "Listing", color: "danger500" };
      case "empty":
        return { title: "Empty", color: "warning500" };
      case "entry":
        return { title: "Entry", color: "secondary500" };
    }
  }, [child]);

  const path = useMemo(() => {
    switch (child.type) {
      case "contentType":
        return null;
      case "static":
      case "listing":
      case "empty":
        return child.path;
      case "entry":
        const localeEntries = config.entryRouteEntries[locale];
        if (!localeEntries) {
          return null;
        }

        const entries = localeEntries[child.contentTypeUid];
        if (!entries) {
          return null;
        }
        const pathInner = entries.find(
          (entry) => entry.id === child.entryId
        )?.path;
        return child.overridePath ?? pathInner;
    }
  }, [child, locale]);

  const title = useMemo(() => {
    switch (child.type) {
      case "contentType":
        const info = config.contentTypeInfos[child.contentTypeUid];
        if (!info) {
          return null;
        }
        return info.displayName;
      case "static":
      case "listing":
      case "empty":
        return child.title;
      case "entry":
        const localeEntries = config.entryRouteEntries[locale];
        if (!localeEntries) {
          return null;
        }

        const entries = localeEntries[child.contentTypeUid];
        if (!entries) {
          return null;
        }
        const titleInner = entries.find(
          (entry) => entry.id === child.entryId
        )?.title;
        return child.overrideTitle ?? titleInner;
    }
  }, [child, locale]);

  return (
    <>
      <Card
        style={{
          width: "728px",
          zIndex: 1,
          position: "relative",
          overflow: "hidden",
          margin: "10px 0",
        }}
      >
        <CardBody>
          <Flex
            justifyContent="space-between"
            style={{
              width: "100%",
            }}
          >
            <Flex alignItems="center" gap={1}>
              {badge && (
                <Badge
                  size="S"
                  backgroundColor={badge.color}
                  textColor="neutral0"
                >
                  {badge.title}
                </Badge>
              )}
              {title && (
                <Typography variant="omega" fontWeight="bold">
                  {title}
                </Typography>
              )}
              {path && (
                <Typography
                  variant="omega"
                  fontWeight="bold"
                  textColor="neutral500"
                >
                  /{path}
                </Typography>
              )}
            </Flex>
            <Flex alignItems="center" gap={1}>
              <IconButton
                onClick={() => {
                  openEditModal(locationIndexes);
                }}
                label="Restore"
                icon={<Pencil />}
              />
              <IconButton
                onClick={() => {
                  removeRoute(locationIndexes);
                }}
                label="Remove"
                icon={<Trash />}
              />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      {canHaveChildren && (
        <Children>
          {child.children?.map((innerChild, index) => (
            <NavigationTreeChild
              key={index}
              child={innerChild}
              locationIndexes={[...locationIndexes, index]}
            />
          ))}

          <TextButton
            startIcon={<Plus />}
            onClick={() => {
              openAddModal(locationIndexes);
            }}
            style={{
              margin: "5px 0",
            }}
          >
            <Typography variant="pi" fontWeight="bold" textColor={"primary600"}>
              Add child
            </Typography>
          </TextButton>
        </Children>
      )}
    </>
  );
};

export default NavigationTreeChild;