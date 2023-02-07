import React, { useCallback, useMemo } from "react";
import { ModalBody, ModalFooter } from "@strapi/design-system/ModalLayout";
import { Button } from "@strapi/design-system/Button";
import { GenericInput } from "@strapi/helper-plugin";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import {
  NavikronosContentTypeRoute,
  NavikronosEmptyRoute,
  NavikronosEntryRoute,
  NavikronosListingRoute,
  NavikronosRoute,
  NavikronosStaticRoute,
} from "../../../shared/types";
import { useConfigDefined } from "../utils/useConfig";
import { useNavigationDataDefined } from "../utils/NavigationDataProvider";
import {
  getMetadatas,
  prepareContentTypesOptions,
  prepareEntryRouteContentTypesOptions,
  prepareEntryRouteEntriesOptions,
  prepareStaticRouteIdsOptions,
  typeOptions,
} from "../utils/editAddFormHelpers";

type EditAddFormProps = {
  initialValues: Partial<NavikronosRoute>;
  onSubmit: (values: Partial<NavikronosRoute>) => void;
};

const EditAddForm = ({ initialValues, onSubmit }: EditAddFormProps) => {
  const fixBeforeSubmit = (values: Partial<NavikronosRoute>) => {
    console.log(values);
    onSubmit(values);
  };

  const {
    handleChange,
    setFieldValue,
    values,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik<Partial<NavikronosRoute>>({
    initialValues,
    onSubmit: fixBeforeSubmit,
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

  const entryRouteEntriesOptions = useMemo(
    () =>
      prepareEntryRouteEntriesOptions(
        config,
        values as NavikronosRoute,
        locale
      ),
    [config, values]
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
      intlLabel: getMetadatas(fieldName),
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
                  onChange={(e) => {
                    setFieldValue("contentTypeUid", e.target.value);
                    setFieldValue("entryId", null);
                  }}
                />
                <GenericInput
                  {...defaultProps("entryId")}
                  options={entryRouteEntriesOptions}
                  type="select"
                />
                <GenericInput
                  type="checkbox"
                  value={values.overrideTitle != null}
                  name="overrideTitleCheckbox"
                  intlLabel={getMetadatas("Override title")}
                  onChange={(e) => {
                    setFieldValue(
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
                  intlLabel={getMetadatas("Override path")}
                  onChange={(e) => {
                    setFieldValue(
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
