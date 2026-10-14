// Strapi 5 bundles the admin panel with Vite/Rollup as ESM, so this entry has to be a real ES
// module re-export - a CommonJS `module.exports` leaves Rollup with no `default` export to bind.
export { default } from './admin/src';
