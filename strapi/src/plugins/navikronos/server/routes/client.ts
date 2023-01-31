export default {
  routes: [
    {
      method: "GET",
      path: "/",
      handler: "client.getNavigation",
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
