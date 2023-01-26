import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, CardBody } from "@strapi/design-system/Card";
import { Stack } from "@strapi/design-system/Stack";
import { Badge } from "@strapi/design-system/Badge";
import { Typography } from "@strapi/design-system/Typography";
import { useData } from "../../utils/useData";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import { Pencil, Trash, Refresh, Plus } from "@strapi/icons";
import { TextButton } from "@strapi/design-system/TextButton";
import { useNavigationData } from "../../utils/NavigationDataProvider";
import addEditModal from "../AddEditModal";
import { useEditAddModal } from "../../utils/EditAddModalProvider";
import { NavikronosRoute, NavikronosRoutes } from "../../../../server/types";

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
  const { openEditModal, openAddModal } = useEditAddModal();
  const { data: config } = useData();
  const { removeRoute } = useNavigationData();

  const canHaveChildren = child.type !== "contentType";
  const hasChildren =
    canHaveChildren && child?.children?.length && child.children.length > 0;

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
        const x = config.specificContentTypesEntries[child.contentTypeUid];
        if (!x) {
          return null;
        }
        const y = x[child.entryId]?.slug;
        return y ?? child.overridePath;
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
        const x = config.specificContentTypesEntries[child.contentTypeUid];
        if (!x) {
          return;
        }
        const y = x[child.entryId]?.title;
        return y ?? child.overrideTitle;
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
      {hasChildren && (
        <Children>
          {child.children!.map((innerChild, index) => (
            <NavigationTreeChild
              key={index}
              child={innerChild}
              locationIndexes={[...locationIndexes, index]}
            />
          ))}
        </Children>
      )}
      {canHaveChildren && (
        <TextButton
          // disabled={removed}
          startIcon={<Plus />}
          // onClick={onNewItemClick}
        >
          <Typography
            variant="pi"
            fontWeight="bold"
            textColor={"primary600"}
            onClick={() => {
              openAddModal(locationIndexes);
            }}
          >
            Add child
          </Typography>
        </TextButton>
      )}
    </>
  );
};

export default NavigationTreeChild;
