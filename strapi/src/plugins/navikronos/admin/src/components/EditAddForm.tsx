import React, { useCallback, useEffect, useMemo } from "react";
import { ModalBody, ModalFooter } from "@strapi/design-system/ModalLayout";
import { Button } from "@strapi/design-system/Button";
import { GenericInput } from "@strapi/helper-plugin";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import {
  AdminGetConfigResponse,
  NavikronosContentTypeRoute,
  NavikronosEmptyRoute,
  NavikronosEntryRoute,
  NavikronosListingRoute,
  NavikronosRoute,
  NavikronosStaticRoute,
} from "../../../shared/types";
import { useConfigDefined } from "../utils/useConfig";
import { useNavigationDataDefined } from "../utils/NavigationDataProvider";

const getMetadatas = (label: string) => ({
  intlLabel: {
    id: "fakeId",
    defaultMessage: label,
  },
});

const typeOptions = [
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

const prepareContentTypesOptions = (config: AdminGetConfigResponse) => {
  return Object.entries(config.contentTypeInfos).map(
    ([uid, { displayName }]) => ({
      key: uid,
      metadatas: getMetadatas(displayName),
      value: uid,
      label: displayName,
    })
  );
};

const prepareStaticRouteIdsOptions = (config: AdminGetConfigResponse) => {
  return config.staticRouteIds.map((id) => ({
    key: id,
    metadatas: getMetadatas(id),
    value: id,
    label: id,
  }));
};

const prepareEntryRouteContentTypesOptions = (
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

const prepareEntryRouteEntriesOptions = (
  config: AdminGetConfigResponse,
  values: NavikronosRoute,
  locale: string
) => {
  if (values.type !== "entry" || !values.contentTypeUid) {
    return undefined;
  }
  const entries = config.entryRouteEntries[locale][values.contentTypeUid];

  return entries.map(({ id, title }) => {
    return {
      key: id,
      metadatas: getMetadatas(title),
      value: id,
      label: title,
    };
  });
};

type EditAddFormProps = {
  initialValues: Partial<NavikronosRoute>;
  onSubmit: (values: Partial<NavikronosRoute>) => void;
};

const EditAddForm = ({ initialValues, onSubmit }: EditAddFormProps) => {
  const {
    handleChange,
    setFieldValue,
    values,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik<Partial<NavikronosRoute>>({
    initialValues,
    onSubmit,
    // validationSchema: formDefinition.schemaFactory(usedCustomFieldNames),
    // validateOnChange: false,
  });

  const { config } = useConfigDefined();
  const { locale } = useNavigationDataDefined();

  const contentTypeOptions = useMemo(
    () => prepareContentTypesOptions(config),
    [config]
  );

  const staticRouteIdsOptions = useMemo(
    () => prepareStaticRouteIdsOptions(config),
    [config]
  );

  const entryContentTypesOptions = useMemo(
    () => prepareEntryRouteContentTypesOptions(config, locale),
    [config, locale]
  );

  const entryRouteEntries = useMemo(
    () =>
      prepareEntryRouteEntriesOptions(
        config,
        values as NavikronosRoute,
        locale
      ),
    [config, values]
  );

  useEffect(() => {
    setFieldValue("entryId", undefined);
  }, [(values as NavikronosEntryRoute).contentTypeUid]);
  console.log(
    contentTypeOptions,
    staticRouteIdsOptions,
    entryContentTypesOptions
  );

  const defaultProps = useCallback(
    (
      fieldName:
        | keyof NavikronosContentTypeRoute
        | keyof NavikronosEmptyRoute
        | keyof NavikronosEntryRoute
        | keyof NavikronosStaticRoute
        | keyof NavikronosListingRoute
    ) => ({
      intlLabel: "",
      onChange: handleChange,
      name: fieldName,
      value: values[fieldName],
      error: errors[fieldName],
    }),
    [values, errors, handleChange]
  );

  return (
    <form>
      <ModalBody>
        <Grid gap={5}>
          <GridItem key="type" col={12}>
            <GenericInput
              {...defaultProps("type")}
              options={typeOptions}
              type="select"
            />

            {values.type === "static" && (
              <GenericInput
                {...defaultProps("id")}
                options={staticRouteIdsOptions}
                type="select"
              />
            )}

            {values.type === "contentType" && (
              <GenericInput
                {...defaultProps("contentTypeUid")}
                options={contentTypeOptions}
                type="select"
              />
            )}

            {values.type === "entry" && (
              <>
                <GenericInput
                  {...defaultProps("contentTypeUid")}
                  options={entryContentTypesOptions}
                  type="select"
                />
                <GenericInput
                  {...defaultProps("entryId")}
                  options={entryRouteEntries}
                  type="select"
                />
                <GenericInput
                  type="checkbox"
                  value={values.overrideTitle != null}
                  name="overrideTitleCheckbox"
                  intlLabel=""
                  onChange={(e) => {
                    console.log(e);
                    return setFieldValue(
                      "overrideTitle",
                      e.target.value ? "" : undefined
                    );
                  }}
                />
                {values.overrideTitle != null && (
                  <GenericInput
                    {...defaultProps("overrideTitle")}
                    type="text"
                  />
                )}
                <GenericInput
                  type="checkbox"
                  value={values.overridePath != null}
                  name="overridePathCheckbox"
                  intlLabel=""
                  onChange={(e) => {
                    console.log(e);
                    return setFieldValue(
                      "overridePath",
                      e.target.value ? "" : undefined
                    );
                  }}
                />
                {values.overridePath != null && (
                  <GenericInput {...defaultProps("overridePath")} type="text" />
                )}
              </>
            )}

            {(values.type === "empty" ||
              values.type === "static" ||
              values.type === "listing") && (
              <>
                <GenericInput {...defaultProps("title")} type="text" />
                <GenericInput {...defaultProps("path")} type="text" />
              </>
            )}
          </GridItem>
        </Grid>
      </ModalBody>
      <ModalFooter
        endActions={
          <Button
            onClick={handleSubmit}
            disabled={!isEmpty(errors) || isSubmitting}
          >
            Save
          </Button>
        }
      />
    </form>
  );
};

export default EditAddForm;
