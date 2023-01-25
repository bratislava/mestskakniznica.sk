import React, { useMemo } from "react";
import type {
  SingleRouteChild,
  SingleRouteChildren,
} from "../../../../server/types";
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

type NavigationTreeChildProps = { child: SingleRouteChild };

const Children = styled.div`
  margin-left: 20px;
`;

const NavigationTreeChild = ({ child }: NavigationTreeChildProps) => {
  const { data: config } = useData();

  const isSingle = child.type === "single";
  const isMultiple = child.type === "multiple";
  const hasChildren =
    isSingle && child?.children?.length && child.children.length > 0;
  const canAddChildren = isSingle;

  const badge = useMemo(() => {
    if (child.type === "multiple") {
      return { title: "Entities", color: "primary500" };
    }

    switch (child.content.type) {
      case "static":
        return { title: "Static", color: "success500" };
      case "listing":
        return { title: "Listing", color: "danger500" };
      case "empty":
        return { title: "Empty", color: "warning500" };
      case "entity":
        return { title: "Entity", color: "secondary500" };
    }
  }, [child]);

  const url = useMemo(() => {
    if (child.type === "multiple") {
      return null;
    }
    switch (child.content.type) {
      case "static":
      case "listing":
      case "empty":
        return child.content.path;
      case "entity": {
        const x = config.specificContentTypesEntries[child.content.entityType];
        const y = x[child.content.id]?.slug;
        return y ?? child.content.overridePath;
      }
    }
  }, [child]);

  const title = useMemo(() => {
    if (child.type === "multiple") {
      const info = config.contentTypeInfos[child.entityType];
      if (!info) {
        return null;
      }
      return info.displayName;
    }
    switch (child.content.type) {
      case "static":
      case "listing":
      case "empty":
        return child.content.title;
      case "entity": {
        const x = config.specificContentTypesEntries[child.content.entityType];
        const y = x[child.content.id]?.title;
        return y ?? child.content.overrideTitle;
      }
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
              {url && (
                <Typography
                  variant="omega"
                  fontWeight="bold"
                  textColor="neutral500"
                >
                  /{url}
                </Typography>
              )}
            </Flex>
            <Flex alignItems="center">
              <IconButton
                onClick={() => {}}
                label="Restore"
                icon={<Pencil />}
              />
              <IconButton onClick={() => {}} label="Remove" icon={<Trash />} />
            </Flex>
          </Stack>
          {/*<ItemCardHeader*/}
          {/*  title={title}*/}
          {/*  path={isExternal ? externalPath : absolutePath}*/}
          {/*  icon={isExternal ? Earth : isWrapper ? Cog : LinkIcon}*/}
          {/*  onItemRemove={() => onItemRemove(item)}*/}
          {/*  onItemEdit={() => onItemEdit({*/}
          {/*    ...item,*/}
          {/*    isMenuAllowedLevel,*/}
          {/*    isParentAttachedToMenu,*/}
          {/*  }, levelPath, isParentAttachedToMenu)}*/}
          {/*  onItemRestore={() => onItemRestore(item)}*/}
          {/*  dragRef={refs.dragRef}*/}
          {/*  removed={removed}*/}
          {/*/>*/}
        </CardBody>
        {/*<Divider />*/}
      </Card>
      {hasChildren && (
        <Children>
          {child.children!.map((innerChild) => (
            <NavigationTreeChild child={innerChild} />
          ))}
        </Children>
      )}
      {canAddChildren && (
        <TextButton
          // disabled={removed}
          startIcon={<Plus />}
          // onClick={onNewItemClick}
        >
          <Typography variant="pi" fontWeight="bold" textColor={"primary600"}>
            Add child
          </Typography>
        </TextButton>
      )}
    </>
  );
};

export default NavigationTreeChild;
