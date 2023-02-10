import { AdminGetConfigResponse, NavikronosRoute } from "../../../shared/types";
import pick from "lodash/pick";

export const getMetadatas = (label: string) => ({
  intlLabel: {
    id: "fakeId",
    defaultMessage: label,
  },
});

export const typeOptions = [
  ["entry", "Entry"],
  ["contentType", "Content type"],
  ["listing", "Listing"],
  ["empty", "Empty"],
  ["static", "Static"],
].map(([value, label]) => ({
  key: value,
  metadatas: getMetadatas(label),
  value,
  label,
}));

export const prepareContentTypesOptions = (config: AdminGetConfigResponse) => {
  return Object.entries(config.contentTypeInfos).map(
    ([uid, { displayName }]) => ({
      key: uid,
      metadatas: getMetadatas(displayName),
      value: uid,
      label: displayName,
    })
  );
};

export const prepareStaticRouteIdsOptions = (
  config: AdminGetConfigResponse
) => {
  return config.staticRouteIds.map((id) => ({
    key: id,
    metadatas: getMetadatas(id),
    value: id,
    label: id,
  }));
};

export const prepareEntryRouteContentTypesOptions = (
  config: AdminGetConfigResponse,
  locale: string
) => {
  return Object.entries(config.entryRouteEntries[locale]).map(([uid]) => {
    const { displayName } = config.contentTypeInfos[uid];
    return {
      key: uid,
      metadatas: getMetadatas(displayName),
      value: uid,
      label: displayName,
    };
  });
};

export const prepareEntryRouteEntriesOptions = (
  config: AdminGetConfigResponse,
  values: NavikronosRoute,
  locale: string
) => {
  if (values.type !== "entry" || !values.contentTypeUid) {
    return undefined;
  }
  const localeEntries = config.entryRouteEntries[locale];
  if (!localeEntries) {
    return undefined;
  }
  const entries = localeEntries[values.contentTypeUid];

  return entries?.map(({ id, title }) => {
    return {
      key: id,
      metadatas: getMetadatas(title),
      value: id,
      label: title,
    };
  });
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
  return pick(values, pickTypeMap[values.type]) as NavikronosRoute;
};
