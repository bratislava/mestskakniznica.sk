// @ts-nocheck
import React from "react";
import type {
  SingleRouteChild,
  SingleRouteChildren,
} from "../../../../server/types";
import styled from "styled-components";
import { Card, CardBody } from "@strapi/design-system/Card";

type NavigationTreeChildProps = { child: SingleRouteChild };

const Children = styled.div`
  margin-left: 20px;
`;

const NavigationTreeChild = ({ child }: NavigationTreeChildProps) => {
  const isSingle = child.type === "single";
  const hasChildren = isSingle && child.children?.length > 0;

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
        {child.type}
      </Card>
      {hasChildren && (
        <Children>
          {child.children!.map((innerChild) => (
            <NavigationTreeChild child={innerChild} />
          ))}
        </Children>
      )}
    </>
  );
};

export default NavigationTreeChild;
