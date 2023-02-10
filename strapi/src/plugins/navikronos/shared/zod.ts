import { z } from "zod";

// TODO: Add TS types.

// Admin navigation
export const navikronosContentTypeRouteSchema = z
  .object({
    type: z.literal("contentType"),
    contentTypeUid: z.string(),
  })
  .strict();

export const navikronosStaticRouteSchema = z
  .object({
    type: z.literal("static"),
    title: z.string(),
    path: z.string(),
    id: z.string(),
    children: z.array(z.lazy(() => navikronosRouteSchema)).optional(),
  })
  .strict();

export const navikronosEmptyListingRouteSchema = z
  .object({
    type: z.union([z.literal("empty"), z.literal("listing")]),
    title: z.string(),
    path: z.string(),
    children: z.array(z.lazy(() => navikronosRouteSchema)).optional(),
  })
  .strict();

export const navikronosEntryRouteSchema = z
  .object({
    type: z.literal("entry"),
    contentTypeUid: z.string(),
    entryId: z.number(),
    overrideTitle: z.string().optional(),
    overridePath: z.string().optional(),
    children: z.array(z.lazy(() => navikronosRouteSchema)).optional(),
  })
  .strict();

export const navikronosRouteSchema = z.union([
  navikronosContentTypeRouteSchema,
  navikronosStaticRouteSchema,
  navikronosEmptyListingRouteSchema,
  navikronosEntryRouteSchema,
]);

export const navikronosRoutesSchema = z.array(navikronosRouteSchema);

const navikronosNavigationSchema = navikronosRoutesSchema;

export const navikronosLocaleNavigationsSchema = z.record(
  z.array(navikronosRouteSchema)
);

// Config
export const navikronosConfigSchema = z
  .object({
    staticRouteIds: z.array(z.string()).optional(),
    contentTypeRoutes: z
      .array(
        z.object({
          contentTypeUid: z.string(),
        })
      )
      .optional(),
    entryRoutes: z
      .array(
        z.object({
          contentTypeUid: z.string(),
          pathAttribute: z.string(),
          titleAttribute: z.string(),
        })
      )
      .optional(),
  })
  .strict();
