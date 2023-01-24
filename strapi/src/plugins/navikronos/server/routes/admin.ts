export const adminRoutes = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/allData",
      handler: "admin.getAllData",
    },
    {
      method: "GET",
      path: "/navigation",
      handler: "admin.getNavigation",
    },
    {
      method: "PUT",
      path: "/navigation",
      handler: "admin.putNavigation",
    },
    {
      method: "GET",
      path: "/content-type-items/:contentType",
      handler: "admin.getContentTypeItems",
    },
    // {
    //   method: "PUT",
    //   path: "/",
    //   handler: "admin.get",
    // },
  ],
};
