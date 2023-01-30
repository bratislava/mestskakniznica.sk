import React, { useCallback, useMemo } from "react";
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
} from "../../../server/types";
import { useConfig, useConfigDefined } from "../utils/useConfig";

const typeOptions = [
  ["entry", "Entry"],
  ["contentType", "Content type"],
  ["listing", "Listing"],
  ["empty", "Empty"],
  ["static", "Static"],
].map(([value, label]) => ({
  key: value,
  metadatas: {
    intlLabel: {
      id: "fakeId",
      defaultMessage: label,
    },
  },
  value,
  label,
}));

const prepareContentTypesOptions = (config: AdminGetConfigResponse) => {
  return Object.entries(config.contentTypeInfos).map(
    ([uid, { displayName }]) => ({
      key: uid,
      metadatas: {
        intlLabel: {
          id: "fakeId",
          defaultMessage: displayName,
        },
      },
      uid,
      label: displayName,
    })
  );
};

type EditAddFormProps = {
  initialValues: NavikronosRoute;
  onSubmit: (values: NavikronosRoute) => void;
};

const EditAddForm = ({ initialValues, onSubmit }: EditAddFormProps) => {
  const {
    handleChange,
    setFieldValue,
    values,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik<NavikronosRoute>({
    initialValues,
    onSubmit,
    // validationSchema: formDefinition.schemaFactory(usedCustomFieldNames),
    // validateOnChange: false,
  });

  const config = useConfigDefined();
  const contentTypeOptions = useMemo(
    () => prepareContentTypesOptions(config),
    [config]
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
            {/*<Select*/}
            {/*  id="select1"*/}
            {/*  label="Choose your meal"*/}
            {/*  required*/}
            {/*  placeholder="Your example"*/}
            {/*  hint="Description line"*/}
            {/*  clearLabel="Clear the meal"*/}
            {/*  selectButtonTitle="Carret Down Button"*/}
            {/*  {...defaultProps("type")}*/}
            {/*>*/}
            {/*  <Option value="entry">Entry</Option>*/}
            {/*  <Option value="static">Static</Option>*/}
            {/*  <Option value="content_type">Content type</Option>*/}
            {/*  <Option value="listing">Listing</Option>*/}
            {/*  <Option value="empty">Empty</Option>*/}
            {/*</Select>*/}

            <GenericInput
              {...defaultProps("type")}
              options={typeOptions}
              type="select"
              // disabled={isEditForm}
            />

            {values.type === "contentType" && (
              <GenericInput
                {...defaultProps("contentTypeUid")}
                options={contentTypeOptions}
                type="select"
                // disabled={isEditForm}
              />
            )}

            {values.type === "entry" && (
              <>
                <GenericInput
                  {...defaultProps("overrideTitle")}
                  type="checkbox"
                  // disabled={isEditForm}
                />
                <GenericInput
                  {...defaultProps("contentTypeUid")}
                  options={contentTypeOptions}
                  type="select"
                  // disabled={isEditForm}
                />
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

            {/*<GenericInput*/}
            {/*  {...defaultProps("name")}*/}
            {/*  autoFocused={true}*/}
            {/*  type="text"*/}
            {/*  disabled={isEditForm}*/}
            {/*/>*/}

            {/*<GenericInput*/}
            {/*  {...defaultProps("type")}*/}
            {/*  autoFocused={true}*/}
            {/*  // placeholder={getTrad(`${tradPrefix}name.placeholder`)}*/}
            {/*  // description={getTrad(`${tradPrefix}name.description`)}*/}
            {/*  type="text"*/}
            {/*  // disabled={isEditForm}*/}
            {/*/>*/}
          </GridItem>
          <GridItem key="label" col={12}>
            {/*<GenericInput*/}
            {/*  //              /!*{...defaultProps("label")}*!/*/}
            {/*  // placeholder={getTrad(`${tradPrefix}label.placeholder`)}*/}
            {/*  // description={getTrad(`${tradPrefix}label.description`)}*/}
            {/*  type="text"*/}
            {/*/>*/}
          </GridItem>
          <GridItem key="type" col={12}>
            {/*<GenericInput*/}
            {/*  {...defaultProps("type")}*/}
            {/*  // options={typeSelectOptions}*/}
            {/*  type="select"*/}
            {/*  // disabled={isEditForm}*/}
            {/*/>*/}
          </GridItem>
          {/*{values.type === "select" && (*/}
          {/*  <>*/}
          {/*    <GridItem key="multi" col={12}>*/}
          {/*      <GenericInput {...defaultProps("multi")} type="bool" />*/}
          {/*    </GridItem>*/}
          {/*    <GridItem key="options" col={12}>*/}
          {/*      <TextArrayInput*/}
          {/*        {...defaultProps("options")}*/}
          {/*        onChange={(v) => setFieldValue("options", v)}*/}
          {/*        label={getMessage(`${tradPrefix}options.label`)}*/}
          {/*        initialValue={values.options}*/}
          {/*      />*/}
          {/*    </GridItem>*/}
          {/*  </>*/}
          {/*)}*/}
          <GridItem key="required" col={12}>
            {/*<GenericInput*/}
            {/*  {...defaultProps("required")}*/}
            {/*  type="bool"*/}
            {/*  description={getTrad(`${tradPrefix}required.description`)}*/}
            {/*/>*/}
          </GridItem>
        </Grid>
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={() => {}} variant="tertiary">
            {/*{getMessage("popup.item.form.button.cancel")}*/}
          </Button>
        }
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
