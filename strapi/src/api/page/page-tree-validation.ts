import type { Core } from '@strapi/strapi'
import { errors } from '@strapi/utils'

const { ApplicationError } = errors

/**
 * Keeps the page tree (parentPage + slug) valid, because page URLs are built from it:
 * - slug is lowercase-kebab-case and unique within a locale (a `uid` field would be unique across all locales),
 * - a page's parent is in the same locale and is not the page itself or one of its descendants,
 * - the tree has at most MAX_LEVELS levels.
 *
 * Every rule is checked only when the field changes, so existing pages with legacy values can still be edited.
 * Messages are in Slovak, they are shown to editors in the admin.
 *
 * Strapi 5 stores the draft and the published version of a document as two rows sharing one `documentId`, so pages are
 * identified by `documentId` + `locale` and the tree is read from draft rows (every document has one). This runs as
 * Document Service middleware on `create` and `update` only: publishing copies the draft (already validated) and must
 * not be checked against it.
 */

const PAGE_UID = 'api::page.page'
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
// Number of levels `PageEntityChildPages` in next/services/graphql/queries/Pages.graphql fetches, keep them in sync.
// Deeper pages are missing from the navigation and their URLs return 404.
const MAX_LEVELS = 5
// Far deeper than the real tree, only guards against an endless loop on already broken data.
const MAX_DEPTH = 50

type PageRow = {
  id: number
  documentId: string
  title: string
  locale: string
  slug: string | null
  parentPage?: { documentId: string } | null
}

type RelationTarget = string | number | { id?: unknown; documentId?: unknown }

/** Resolves a relation target (documentId, row id, `{ documentId }` or `{ id }`) to a documentId. */
const toDocumentId = async (strapi: Core.Strapi, value: unknown): Promise<string | null> => {
  if (value && typeof value === 'object') {
    const target = value as { id?: unknown; documentId?: unknown }
    if (typeof target.documentId === 'string') return target.documentId

    return toDocumentId(strapi, target.id)
  }
  // A row id (number or numeric string), as the db layer and older clients send it.
  if (typeof value === 'number' || (typeof value === 'string' && /^\d+$/.test(value))) {
    const row = (await strapi.db
      .query(PAGE_UID)
      .findOne({ select: ['documentId'], where: { id: Number(value) } })) as Pick<PageRow, 'documentId'> | null

    return row?.documentId ?? null
  }
  if (typeof value === 'string' && value !== '') return value

  return null
}

const toDocumentIds = async (strapi: Core.Strapi, values: RelationTarget[]) =>
  (await Promise.all(values.map((value) => toDocumentId(strapi, value)))).filter(
    (documentId): documentId is string => documentId !== null,
  )

/**
 * DocumentIds a relation is being set to. Accepts a target, an array of targets, `{ connect, disconnect }` and
 * `{ set }`. Returns `undefined` when the payload doesn't change the relation and `[]` when it is being cleared.
 */
const getConnectedDocumentIds = async (strapi: Core.Strapi, value: unknown): Promise<string[] | undefined> => {
  if (value === undefined) return undefined
  if (value === null) return []
  if (Array.isArray(value)) return toDocumentIds(strapi, value as RelationTarget[])
  if (typeof value === 'object' && 'set' in value && Array.isArray(value.set)) {
    return toDocumentIds(strapi, value.set as RelationTarget[])
  }
  if (typeof value === 'object' && ('connect' in value || 'disconnect' in value)) {
    const connect = 'connect' in value && Array.isArray(value.connect) ? value.connect : []
    const disconnect = 'disconnect' in value && Array.isArray(value.disconnect) ? value.disconnect : []
    if (connect.length > 0) return toDocumentIds(strapi, connect as RelationTarget[])

    return disconnect.length > 0 ? [] : undefined
  }
  const documentId = await toDocumentId(strapi, value)

  return documentId === null ? undefined : [documentId]
}

/** The draft row of a page in a locale. */
const findPage = (strapi: Core.Strapi, documentId: string, locale: string) =>
  strapi.db.query(PAGE_UID).findOne({
    select: ['id', 'documentId', 'title', 'locale', 'slug'],
    where: { documentId, locale, publishedAt: null },
    populate: { parentPage: { select: ['documentId'] } },
  }) as Promise<PageRow | null>

const validateSlug = async (strapi: Core.Strapi, slug: unknown, locale: string, documentId?: string) => {
  if (typeof slug !== 'string' || !SLUG_REGEX.test(slug)) {
    throw new ApplicationError(
      `Slug ${JSON.stringify(slug)} môže obsahovať iba malé písmená bez diakritiky, číslice a pomlčky, napr. "kniharska-dielna".`,
    )
  }

  // The page's own draft and published rows share its documentId, they are not duplicates.
  const duplicate = (await strapi.db.query(PAGE_UID).findOne({
    select: ['documentId', 'title'],
    where: { slug, locale, ...(documentId === undefined ? {} : { documentId: { $ne: documentId } }) },
  })) as Pick<PageRow, 'documentId' | 'title'> | null
  if (duplicate) {
    throw new ApplicationError(
      `Slug "${slug}" už v tomto jazyku používa stránka "${duplicate.title}" (documentId ${duplicate.documentId}).`,
    )
  }
}

/** Levels of a page's subtree, the page included. Drafts count too, they would be too deep once published. */
const getSubtreeLevels = async (strapi: Core.Strapi, documentId: string, locale: string) => {
  let levels = 1
  let documentIds = [documentId]
  while (levels < MAX_DEPTH) {
    const children = (await strapi.db.query(PAGE_UID).findMany({
      select: ['documentId'],
      where: { locale, publishedAt: null, parentPage: { documentId: { $in: documentIds } } },
    })) as Pick<PageRow, 'documentId'>[]
    if (children.length === 0) break

    levels += 1
    documentIds = children.map((child) => child.documentId)
  }

  return levels
}

/** `child.documentId` is undefined for a page that is just being created, it has no descendants yet. */
const validateParent = async (
  strapi: Core.Strapi,
  child: { documentId?: string; locale: string },
  parentDocumentId: string,
) => {
  const parent = await findPage(strapi, parentDocumentId, child.locale)
  if (!parent) {
    throw new ApplicationError('Nadradená stránka musí byť v rovnakom jazyku ako podstránka.')
  }

  // Walk up from the new parent: reaching the child means it would become its own ancestor. Counts the parent's level
  // on the way, a top-level page is on level 1.
  let current: PageRow | null = parent
  let parentLevel = 0
  while (current && parentLevel < MAX_DEPTH) {
    if (current.documentId === child.documentId) {
      throw new ApplicationError(
        `Stránka "${parent.title}" nemôže byť nadradenou stránkou, pretože je to táto stránka alebo jej podstránka.`,
      )
    }
    parentLevel += 1
    current = current.parentPage ? await findPage(strapi, current.parentPage.documentId, child.locale) : null
  }

  // The child's whole subtree moves with it.
  const subtreeLevels =
    child.documentId === undefined ? 1 : await getSubtreeLevels(strapi, child.documentId, child.locale)
  const deepestLevel = parentLevel + subtreeLevels
  if (deepestLevel > MAX_LEVELS) {
    throw new ApplicationError(
      `Stránka "${parent.title}" nemôže byť nadradenou stránkou, pretože stránky môžu byť vnorené najviac do ${MAX_LEVELS}. úrovne a ${subtreeLevels > 1 ? 'najhlbšia podstránka' : 'podstránka'} by bola na ${deepestLevel}. úrovni.`,
    )
  }
}

/** Connecting children from the parent's side means this page becomes their parent. */
const validateChildren = async (
  strapi: Core.Strapi,
  childDocumentIds: string[] | undefined,
  parentDocumentId: string,
  locale: string,
) => {
  for (const childDocumentId of childDocumentIds ?? []) {
    const child = await findPage(strapi, childDocumentId, locale)
    if (child) await validateParent(strapi, child, parentDocumentId)
  }
}

type PageParams = { documentId?: string; locale?: string; data?: Record<string, unknown> }

export const registerPageTreeValidation = (strapi: Core.Strapi) => {
  strapi.documents.use(async (context, next) => {
    if (context.uid !== PAGE_UID || (context.action !== 'create' && context.action !== 'update')) {
      return next()
    }

    const params = context.params as PageParams
    const data = params.data ?? {}
    const locale =
      params.locale ?? ((await strapi.plugin('i18n').service('locales').getDefaultLocale()) as string)

    // `update` with a locale the document doesn't have yet creates that locale, so the page may not exist.
    const page =
      context.action === 'update' && params.documentId ? await findPage(strapi, params.documentId, locale) : null
    const documentId = params.documentId ?? undefined

    if (page) {
      if (data.slug !== undefined && data.slug !== page.slug) {
        await validateSlug(strapi, data.slug, locale, documentId)
      }
    } else {
      await validateSlug(strapi, data.slug, locale, documentId)
    }

    const [parentDocumentId] = (await getConnectedDocumentIds(strapi, data.parentPage)) ?? []
    if (parentDocumentId !== undefined) {
      await validateParent(strapi, { documentId: page?.documentId ?? documentId, locale }, parentDocumentId)
    }

    if (documentId) {
      await validateChildren(strapi, await getConnectedDocumentIds(strapi, data.childPages), documentId, locale)
    }

    return next()
  })
}
