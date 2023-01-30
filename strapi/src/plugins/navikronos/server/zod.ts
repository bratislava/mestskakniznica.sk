import { z } from "zod";

export const navikronosContentTypeRouteSchema = z.object({
  type: z.literal("contentType"),
  contentTypeUid: z.string(),
});

export const navikronosEmptyStaticListingRouteSchema = z.object({
  type: z.union([
    z.literal("empty"),
    z.literal("static"),
    z.literal("listing"),
  ]),
  title: z.string(),
  path: z.string(),
  children: z.array(z.lazy(() => navikronosRouteSchema)).optional(),
});

export const navikronosEntryRouteSchema = z.object({
  type: z.literal("entry"),
  contentTypeUid: z.string(),
  entryId: z.number(),
  overrideTitle: z.string().optional(),
  overridePath: z.string().optional(),
  children: z.array(z.lazy(() => navikronosRouteSchema)).optional(),
});

export const navikronosRouteSchema = z.union([
  navikronosContentTypeRouteSchema,
  navikronosEmptyStaticListingRouteSchema,
  navikronosEntryRouteSchema,
]);

export const navikronosRoutesSchema = z.array(navikronosRouteSchema);

const navikronosNavigationSchema = navikronosRoutesSchema;

export const navikronosLocaleNavigationsSchema = z.record(
  z.array(navikronosRouteSchema)
);
