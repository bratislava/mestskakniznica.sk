export default {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/config",
      handler: "admin.getConfig",
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
  ],
};
