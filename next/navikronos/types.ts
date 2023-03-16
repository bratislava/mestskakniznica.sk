export type NavikronosConfig<
  StaticRoutesIds extends string = string,
  EntryRoutesAliases extends string = string,
  ContentTypeRoutesAliases extends string = string,
  EntryRoutesStrapiTypenames extends string = string,
  ContentTypeRouteInner extends { strapiTypename: string; pathAttribute: string } = {
    strapiTypename: string
    pathAttribute: string
  }
> = {
  strapiUrl: string
  cacheTtl: number
  rewritePrefix: string
  staticRoutes: Record<StaticRoutesIds, { rewrite: string }>
  entryRoutes: Record<
    string,
    {
      alias: EntryRoutesAliases
      strapiTypename: EntryRoutesStrapiTypenames
      rewrite: (id: number) => string
    }
  >
  contentTypeRoutes: Record<
    string,
    {
      alias: ContentTypeRoutesAliases
      rewrite: (slug: string) => string
    } & ContentTypeRouteInner
  >
}
