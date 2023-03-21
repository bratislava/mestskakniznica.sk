export type NavikronosConfig = {
  strapiUrl: string
  cacheTtl: number
  rewritePrefix: string
  staticRoutes: Record<string, { rewrite: string }>
  entryRoutes: Record<
    string,
    {
      alias: string
      strapiTypename: string
      rewrite: (id: number) => string
    }
  >
  contentTypeRoutes: Record<
    string,
    {
      alias: string
      rewrite: (slug: string) => string
      strapiTypename: string
      pathAttribute: string
    }
  >
}
