type MultipleRoute = {
  type: "multiple";
  entityType: string;
};

type SingleRouteChildren = (SingleRoute | MultipleRoute)[];

type SingleRoute = {
  type: "single";
  children?: SingleRouteChildren;
  content: SingleRouteContent;
};

type SingleRouteEmptyContent = {
  type: "empty";
  title: string;
  path: string;
};

type SingleRouteListingContent = {
  type: "listing";
  title: string;
  path: string;
};

type SingleRouteEntityContent = {
  type: "entity";
  entityType: string;
  id: string;
  overrideTitle?: string;
  overridePath?: string;
};

type SingleRouteStaticContent = {
  type: "static";
  title: string;
  path: string;
};

type SingleRouteContent =
  | SingleRouteEmptyContent
  | SingleRouteListingContent
  | SingleRouteStaticContent
  | SingleRouteEntityContent;

type Navigation = SingleRouteChildren;

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
