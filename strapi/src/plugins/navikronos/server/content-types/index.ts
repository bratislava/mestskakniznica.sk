export default {
  "navikronos-storage": {
    schema: {
      kind: "singleType",
      collectionName: "navikronos-storage",
      info: {
        singularName: "navikronos-storage",
        pluralName: "navikronos-storages",
        displayName: "Navikronos Storage",
      },
      options: {
        draftAndPublish: false,
        comment: "",
      },
      attributes: {
        data: {
          type: "json",
        },
      },
    },
  },
};
