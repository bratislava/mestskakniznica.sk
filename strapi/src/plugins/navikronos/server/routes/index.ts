// export default [
//   {
//     method: 'GET',
//     path: '/',
//     handler: 'myController.index',
//     config: {
//       policies: [],
//     },
//   },
// ];
export default [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
      auth: false,
    },
  },
];

// import { factories } from "@strapi/strapi";
//
// export default factories.createCoreRouter(
//   "plugin::navikronos.navikronos-storage"
// );
