# Navigation migration: Navikronos → page.parentPage

Scripts for moving the page tree from the Navikronos plugin to the page `parentPage` / `childPages` relation
(issue #616). They are run by hand. All of them only read from the database, except the SQL migration.

Run them from `strapi/`. The Node scripts connect with the same `DATABASE_*` variables as `config/database.ts`:

```sh
node --env-file=.env.local scripts/navigation-migration/<script>.mjs
```

Output is written to `out/` (gitignored, it contains data from the database).

| Script | Phase | What it does |
| --- | --- | --- |
| `audit.mjs` | 0 | Reports what the migration or the content team has to deal with: draft pages in the tree, pages outside the tree, duplicate or invalid `newSlug`s, nodes without a page, missing translations. |
| `build-inventory.mjs` | 0 | Writes every public URL of both locales (`out/urls-inventory.tsv`) and every redirect from `next/next.config.ts` (`out/redirects.tsv`), and lists redirects that already end at a non-existing URL. |
| `check-urls.mjs` | 0, 2 | Requests the inventory and records status codes and redirect locations. `--compare` compares two runs. |
| `../../database/manual-migrations/navikronos-to-parent-page.sql` | 1 | Copies the Navikronos tree into `pages_parent_page_links`. A full re-sync, safe to run repeatedly. |
| `verify-parent-pages.mjs` | 1 | Checks that `parentPage` + `newSlug` give every page the same parent, sibling order and path as Navikronos and the legacy `slug`. Exit code 1 on any difference. |

## Phase 0: before changing anything

1. Restore a production dump locally and take a snapshot, so rehearsals can be reset:
   `docker exec mestskakniznicask-postgres-1 pg_dump -U strapi -Fc city-library > before.dump`
2. `audit.mjs`. Agree with the content team on what to do with the pages outside the tree and on the pages for the two
   empty Navikronos nodes (`dokumenty`, `zverejnovanie` / `documents`, `disclosure`). Do the cleanup in production.
3. `build-inventory.mjs` on a fresh dump.
4. Baseline on production. Keep it light, detail pages are rendered on request:
   ```sh
   node scripts/navigation-migration/check-urls.mjs --base https://www.mestskakniznica.sk --name prod-before --sample 30
   ```

## Phase 1: parentPage next to Navikronos

1. Deploy Strapi with the `parentPage` relation, the `Navigation` single type and the page lifecycle.
2. Run the SQL migration against the database, then verify:
   ```sh
   psql ... -v ON_ERROR_STOP=1 -f database/manual-migrations/navikronos-to-parent-page.sql
   node --env-file=<env> scripts/navigation-migration/verify-parent-pages.mjs
   ```
3. Fill the `Navigation` single type in the admin, for both locales.
4. Until the frontend switches, Navikronos stays the source of truth. Don't edit the page tree in the meantime, or
   re-run the SQL migration and the verification right before the switch.

## Phase 2: after the frontend switch

Run `check-urls.mjs` against the new build with the same options and `--compare out/check-prod-before.tsv`.
