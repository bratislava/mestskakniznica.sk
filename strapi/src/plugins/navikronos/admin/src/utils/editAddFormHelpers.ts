import { AdminGetConfigResponse, NavikronosRoute } from "../../../shared/types";
import pick from "lodash/pick";

export type SelectOption = {
  value: string | number;
  label: string;
};

export const fieldLabels: Record<string, string> = {
  type: "Type",
  id: "Static route id",
  contentTypeUid: "Content type",
  entryId: "Entry",
  overrideTitle: "Override title",
  overridePath: "Override path",
  title: "Title",
  path: "Path",
};

export const typeOptions: SelectOption[] = [
  ["entry", "Entry"],
  ["contentType", "Content type"],
  ["listing", "Listing"],
  ["empty", "Empty"],
  ["static", "Static"],
].map(([value, label]) => ({ value, label }));

export const prepareContentTypesOptions = (
  config: AdminGetConfigResponse,
): SelectOption[] => {
  return Object.entries(config.contentTypeInfos).map(
    ([uid, { displayName }]) => ({
      value: uid,
      label: displayName,
    }),
  );
};

export const prepareStaticRouteIdsOptions = (
  config: AdminGetConfigResponse,
): SelectOption[] => {
  return config.staticRouteIds.map((id) => ({
    value: id,
    label: id,
  }));
};

export const prepareEntryRouteContentTypesOptions = (
  config: AdminGetConfigResponse,
  locale: string,
): SelectOption[] => {
  const localeEntries = config.entryRouteEntries[locale];
  if (!localeEntries) {
    return [];
  }

  return Object.keys(localeEntries).map((uid) => {
    const displayName = config.contentTypeInfos[uid]?.displayName ?? uid;
    return {
      value: uid,
      label: displayName,
    };
  });
};

export const prepareEntryRouteEntriesOptions = (
  config: AdminGetConfigResponse,
  values: NavikronosRoute,
  locale: string,
): SelectOption[] => {
  if (values.type !== "entry" || !values.contentTypeUid) {
    return [];
  }
  const localeEntries = config.entryRouteEntries[locale];
  if (!localeEntries) {
    return [];
  }
  const entries = localeEntries[values.contentTypeUid];

  return (entries ?? []).map(({ id, title }) => ({
    value: id,
    label: title,
  }));
};

// https://stackoverflow.com/a/67730037
type FindByType<TWhere, T extends NavikronosRoute["type"]> = TWhere extends {
  type: infer InferredT;
}
  ? InferredT extends T
    ? TWhere & { type: T }
    : never
  : never;

// The type checks whether the keys are valid keys for certain type.
const pickTypeMap: {
  [Type in NavikronosRoute["type"]]: (keyof FindByType<
    NavikronosRoute,
    Type
  >)[];
} = {
  entry: ["type", "contentTypeUid", "entryId", "overrideTitle", "overridePath"],
  contentType: ["type", "contentTypeUid"],
  listing: ["type", "title", "path", "children"],
  empty: ["type", "title", "path", "children"],
  static: ["type", "title", "path", "id", "children"],
};

/**
 * When changing a type in form it doesn't remove keys from other types. They are deleted here,
 * before the submission.
 * @param values
 */
export const fixBeforeSubmit = (values: NavikronosRoute) => {
  let picked = pick(values, pickTypeMap[values.type]);
  if ("entryId" in picked && typeof picked.entryId === "string") {
    picked = {
      ...picked,
      entryId: Number(picked.entryId),
    };
  }

  return picked as NavikronosRoute;
};
