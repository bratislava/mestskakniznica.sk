import { errors } from '@strapi/utils'

const { ApplicationError } = errors

/**
 * Keeps the page tree (parentPage + newSlug) valid, because page URLs are built from it:
 * - newSlug is lowercase-kebab-case and unique within a locale (a `uid` field would be unique across all locales),
 * - a page's parent is in the same locale and is not the page itself or one of its descendants.
 *
 * Every rule is checked only when the field changes, so existing pages with legacy values can still be edited.
 * Messages are in Slovak, they are shown to editors in the admin.
 */

const PAGE_UID = 'api::page.page'
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
// Far deeper than the real tree, only guards against an endless loop on already broken data.
const MAX_DEPTH = 50

type Id = number
type PageRow = { id: Id; title: string; locale: string; newSlug: string | null; parentPage?: { id: Id } | null }
type LifecycleEvent = { params: { data: Record<string, unknown>; where?: { id?: unknown } } }

const toId = (value: unknown): Id | null => {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && value !== '' && !Number.isNaN(Number(value))) return Number(value)
  if (value && typeof value === 'object' && 'id' in value) return toId(value.id)

  return null
}

const toIds = (values: unknown[]) => values.map(toId).filter((id): id is Id => id !== null)

/**
 * Ids a relation is being set to. Strapi 4 accepts an id, `{ id }`, an array of those, `{ connect, disconnect }` and
 * `{ set }`. Returns `undefined` when the payload doesn't change the relation and `[]` when it is being cleared.
 */
const getConnectedIds = (value: unknown): Id[] | undefined => {
  if (value === undefined) return undefined
  if (value === null) return []
  if (Array.isArray(value)) return toIds(value)
  if (typeof value === 'object' && 'set' in value && Array.isArray(value.set)) return toIds(value.set)
  if (typeof value === 'object' && ('connect' in value || 'disconnect' in value)) {
    const connect = 'connect' in value && Array.isArray(value.connect) ? value.connect : []
    const disconnect = 'disconnect' in value && Array.isArray(value.disconnect) ? value.disconnect : []
    if (connect.length > 0) return toIds(connect)

    return disconnect.length > 0 ? [] : undefined
  }
  const id = toId(value)

  return id === null ? undefined : [id]
}

const findPage = (id: Id) =>
  strapi.db.query(PAGE_UID).findOne({
    select: ['id', 'title', 'locale', 'newSlug'],
    where: { id },
    populate: { parentPage: { select: ['id'] } },
  }) as Promise<PageRow | null>

const validateSlug = async (newSlug: unknown, locale: string, pageId?: Id) => {
  if (typeof newSlug !== 'string' || !SLUG_REGEX.test(newSlug)) {
    throw new ApplicationError(
      `Slug ${JSON.stringify(newSlug)} môže obsahovať iba malé písmená bez diakritiky, číslice a pomlčky, napr. "kniharska-dielna".`
    )
  }

  const duplicate = (await strapi.db.query(PAGE_UID).findOne({
    select: ['id', 'title'],
    where: { newSlug, locale, ...(pageId === undefined ? {} : { id: { $ne: pageId } }) },
  })) as Pick<PageRow, 'id' | 'title'> | null
  if (duplicate) {
    throw new ApplicationError(
      `Slug "${newSlug}" už v tomto jazyku používa stránka "${duplicate.title}" (id ${duplicate.id}).`
    )
  }
}

/** `child.id` is undefined for a page that is just being created, it has no descendants yet. */
const validateParent = async (child: { id?: Id; locale: string }, parentId: Id) => {
  const parent = await findPage(parentId)
  if (!parent) return

  if (parent.locale !== child.locale) {
    throw new ApplicationError(`Nadradená stránka "${parent.title}" musí byť v rovnakom jazyku ako podstránka.`)
  }

  // Walk up from the new parent: reaching the child means it would become its own ancestor.
  let current: PageRow | null = parent
  for (let depth = 0; current && depth < MAX_DEPTH; depth += 1) {
    if (current.id === child.id) {
      throw new ApplicationError(
        `Stránka "${parent.title}" nemôže byť nadradenou stránkou, pretože je to táto stránka alebo jej podstránka.`
      )
    }
    current = current.parentPage ? await findPage(current.parentPage.id) : null
  }
}

/** Connecting children from the parent's side means this page becomes their parent. */
const validateChildren = async (childIds: Id[] | undefined, parentId: Id) => {
  for (const childId of childIds ?? []) {
    const child = await findPage(childId)
    if (child) await validateParent(child, parentId)
  }
}

export default {
  async beforeCreate(event: LifecycleEvent) {
    const { data } = event.params
    const locale =
      typeof data.locale === 'string'
        ? data.locale
        : ((await strapi.plugin('i18n').service('locales').getDefaultLocale()) as string)

    await validateSlug(data.newSlug, locale)

    const [parentId] = getConnectedIds(data.parentPage) ?? []
    if (parentId !== undefined) {
      await validateParent({ locale }, parentId)
    }
  },

  async beforeUpdate(event: LifecycleEvent) {
    const { data, where } = event.params
    const pageId = toId(where?.id)
    const page = pageId === null ? null : await findPage(pageId)
    if (!page) return

    if (data.newSlug !== undefined && data.newSlug !== page.newSlug) {
      await validateSlug(data.newSlug, page.locale, page.id)
    }

    const [parentId] = getConnectedIds(data.parentPage) ?? []
    if (parentId !== undefined) {
      await validateParent(page, parentId)
    }

    await validateChildren(getConnectedIds(data.childPages), page.id)
  },
}
