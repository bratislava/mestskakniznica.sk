-- Copies the Navikronos page tree into the page `parentPage` relation (pages_parent_page_links), for every locale.
--
-- Run manually against the Strapi Postgres database AFTER Strapi was deployed with the page `parentPage` relation
-- (Strapi creates pages_parent_page_links on boot). It is not in database/migrations because Strapi runs those before
-- creating new tables.
--
-- Navikronos stays the source of truth until the frontend switches to parentPage, so this is a full re-sync: it
-- replaces all parentPage links with the ones from "navikronos-storage". Re-run it right before the switch to pick up
-- navigation changes made in the meantime. Check the result with scripts/navigation-migration/verify-parent-pages.mjs.
--
-- It reads the raw storage, not the public /navikronos endpoint, so draft pages keep their place in the tree.
-- page_order is the position among siblings, i.e. the order in which childPages are returned.

BEGIN;

CREATE TEMPORARY TABLE navikronos_page_nodes ON COMMIT DROP AS
WITH RECURSIVE node AS (
  SELECT l.key AS locale, route.value AS route, route.ordinality AS position, NULL::jsonb AS parent_route
  FROM "navikronos-storage" storage
  CROSS JOIN LATERAL jsonb_each(storage.data) AS l
  CROSS JOIN LATERAL jsonb_array_elements(
    CASE WHEN jsonb_typeof(l.value) = 'array' THEN l.value ELSE '[]'::jsonb END
  ) WITH ORDINALITY AS route
  UNION ALL
  SELECT node.locale, child.value, child.ordinality, node.route
  FROM node
  CROSS JOIN LATERAL jsonb_array_elements(node.route -> 'children') WITH ORDINALITY AS child
  WHERE node.route ->> 'type' <> 'contentType' AND jsonb_typeof(node.route -> 'children') = 'array'
)
SELECT locale,
       (route ->> 'entryId')::integer AS page_id,
       (parent_route ->> 'entryId')::integer AS parent_page_id,
       parent_route ->> 'type' AS parent_type,
       position
FROM node
WHERE route ->> 'type' = 'entry';

DO $$
DECLARE
  problems text;
BEGIN
  SELECT string_agg(format('page %s is placed %s times', page_id, placements), ', ') INTO problems
  FROM (SELECT page_id, count(*) AS placements FROM navikronos_page_nodes GROUP BY page_id HAVING count(*) > 1) x;
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navikronos tree: %', problems;
  END IF;

  SELECT string_agg(format('page %s does not exist in locale %s', node.page_id, node.locale), ', ') INTO problems
  FROM navikronos_page_nodes node
  LEFT JOIN pages ON pages.id = node.page_id AND pages.locale = node.locale
  WHERE pages.id IS NULL;
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navikronos tree: %', problems;
  END IF;

  -- A page under an empty or static node would lose that node's URL segment, so its URL would change.
  SELECT string_agg(format('page %s is under a %s node', page_id, parent_type), ', ') INTO problems
  FROM navikronos_page_nodes
  WHERE parent_type IS NOT NULL AND parent_type <> 'entry';
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navikronos tree: %', problems;
  END IF;
END $$;

DELETE FROM pages_parent_page_links;

INSERT INTO pages_parent_page_links (page_id, inv_page_id, page_order)
SELECT page_id, parent_page_id, position
FROM navikronos_page_nodes
WHERE parent_page_id IS NOT NULL;

SELECT locale, count(*) AS pages_in_tree, count(parent_page_id) AS pages_with_parent
FROM navikronos_page_nodes
GROUP BY locale
ORDER BY locale;

COMMIT;
