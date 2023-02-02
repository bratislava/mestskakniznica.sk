import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, CardBody } from "@strapi/design-system/Card";
import { Stack } from "@strapi/design-system/Stack";
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
  const config = useConfigDefined();
  const { removeRoute } = useNavigationDataDefined();

  const canHaveChildren = child.type !== "contentType";
  // const hasChildren =
  //   canHaveChildren && child?.children?.length && child.children.length > 0;

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
        const entries = config.entryRouteEntries[child.contentTypeUid];
        if (!entries) {
          return null;
        }
        const pathInner = entries.find(
          (entry) => entry.id === child.entryId
        )?.path;
        return child.overridePath ?? pathInner;
    }
  }, [child]);

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
        const entries = config.entryRouteEntries[child.contentTypeUid];
        if (!entries) {
          return null;
        }
        const titleInner = entries.find(
          (entry) => entry.id === child.entryId
        )?.title;
        return child.overrideTitle ?? titleInner;
    }
  }, [child]);

  return (
    <>
      <Card
        style={{
          width: "728px",
          zIndex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardBody>
          <Stack horizontal spacing={1}>
            <Flex alignItems="center">
              <Badge
                size="S"
                backgroundColor={badge.color}
                textColor="neutral0"
              >
                {badge.title}
              </Badge>
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
            <Flex alignItems="center">
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
          </Stack>
        </CardBody>
        {/*<Divider />*/}
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
            // disabled={removed}
            startIcon={<Plus />}
            onClick={() => {
              openAddModal(locationIndexes);
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
