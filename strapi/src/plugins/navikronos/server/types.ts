type X = StaticPath | SpreadPath | SpecificPath | EmptyPath;

type StaticPath = {
  type: "static";
  key: string;
  staticPage: string;
  children?: X;
};

type SpreadPath = {
  type: "spread";
  contentType: string;
};

type SpecificPath = {
  type: "specific";
  contentType: string;
  id: "1";
  key?: string;
  children?: X[];
};

type EmptyPath = {
  key: string;
  children?: X[];
};

type Navigation = X[];

const x: Navigation = [
  {
    type: "static",
    key: "vyhladavanie",
    staticPage: "search",
  },
  {
    key: "zazite",
    children: [
      {
        type: "spread",
        contentType: "api::branch.branch",
      },
      {
        type: "specific",
        contentType: "api::page:page",
        id: "1",
      },
    ],
  },
];
