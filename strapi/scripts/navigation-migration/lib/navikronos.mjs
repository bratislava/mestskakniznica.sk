/** `Object.groupBy` replacement, it needs Node 21 and the project supports Node 20. */
export const groupBy = (items, getKey) => {
  const groups = {}
  items.forEach((item) => {
    const key = getKey(item)
    groups[key] = [...(groups[key] ?? []), item]
  })

  return groups
}

/** sk is the default locale, so its URLs have no prefix (next/next-i18next.config.js). */
export const LOCALE_PREFIX = { sk: '', en: '/en' }

/** 'api::blog-post.blog-post' -> 'blog-post' */
export const getContentTypeAlias = (contentTypeUid) => contentTypeUid.split('::')[1].split('.')[0]

const getSegment = (route, page) => {
  if (route.type === 'entry') {
    return route.overridePath || page?.newSlug || `<missing page #${route.entryId}>`
  }
  if (route.type === 'contentType') {
    return ':slug'
  }

  return route.path
}

/**
 * Flattens one locale of the raw Navikronos storage into a list of nodes (depth-first, in tree order).
 * Paths are built the same way as in next/navikronos: every ancestor's segment joined with "/", including empty and
 * static nodes. They don't contain the locale prefix.
 */
export const flattenNavikronos = (routes, pages) => {
  const nodes = []

  const visit = (children, parent) => {
    ;(children ?? []).forEach((route, index) => {
      const page = route.type === 'entry' ? pages.get(route.entryId) : undefined
      const segment = getSegment(route, page)
      const node = {
        route,
        type: route.type,
        parent,
        index,
        page,
        segment,
        path: `${parent?.path ?? ''}/${segment}`,
        // Navikronos drops draft pages from the live site together with their whole subtree.
        live: (parent?.live ?? true) && (route.type !== 'entry' || Boolean(page?.published)),
      }
      nodes.push(node)
      if (route.type !== 'contentType') {
        visit(route.children, node)
      }
    })
  }
  visit(routes, null)

  return nodes
}

export const getAncestors = (node) => {
  const ancestors = []
  for (let current = node.parent; current; current = current.parent) {
    ancestors.push(current)
  }

  return ancestors
}
