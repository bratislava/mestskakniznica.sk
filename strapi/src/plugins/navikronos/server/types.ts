export type MultipleRoute = {
  type: "multiple";
  entityType: string;
};

export type SingleRouteChild = SingleRoute | MultipleRoute;

export type SingleRouteChildren = SingleRouteChild[];

export type SingleRoute = {
  type: "single";
  children?: SingleRouteChildren;
  content: SingleRouteContent;
};

export type SingleRouteEmptyContent = {
  type: "empty";
  title: string;
  path: string;
};

export type SingleRouteListingContent = {
  type: "listing";
  title: string;
  path: string;
};

export type SingleRouteEntityContent = {
  type: "entity";
  entityType: string;
  id: string;
  overrideTitle?: string;
  overridePath?: string;
};

export type SingleRouteStaticContent = {
  type: "static";
  title: string;
  path: string;
};

export type SingleRouteContent =
  | SingleRouteEmptyContent
  | SingleRouteListingContent
  | SingleRouteStaticContent
  | SingleRouteEntityContent;

export type Navigation = SingleRouteChildren;

const x: Navigation = [
  {
    type: "single",
    content: { type: "static", title: "Vyhľadávanie", path: "vyhladavanie" },
  },
  {
    type: "single",
    content: { type: "listing", title: "Zažite", path: "zazite" },
    children: [
      {
        type: "single",
        content: {
          type: "entity",
          entityType: "page",
          id: "1",
        },
        children: [
          {
            type: "multiple",
            entityType: "event",
          },
        ],
      },
    ],
  },
];
