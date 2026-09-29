import React, { useCallback, useMemo } from "react";
import {
  Button,
  Checkbox,
  Field,
  Flex,
  Modal,
  SingleSelect,
  SingleSelectOption,
  TextInput,
} from "@strapi/design-system";
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
  fieldLabels,
  fixBeforeSubmit,
  prepareContentTypesOptions,
  prepareEntryRouteContentTypesOptions,
  prepareEntryRouteEntriesOptions,
  prepareStaticRouteIdsOptions,
  SelectOption,
  typeOptions,
} from "../utils/editAddFormHelpers";

type EditAddFormProps = {
  initialValues: Partial<NavikronosRoute>;
  onSubmit: (values: Partial<NavikronosRoute>) => void;
};

type FieldName =
  | keyof NavikronosContentTypeRoute
  | keyof NavikronosEmptyRoute
  | keyof NavikronosEntryRoute
  | keyof NavikronosStaticRoute
  | keyof NavikronosListingRoute;

type SelectFieldProps = {
  name: string;
  label: string;
  value?: string | number;
  error?: string;
  options?: SelectOption[];
  onChange: (value: string | number) => void;
};

const SelectField = ({
  name,
  label,
  value,
  error,
  options,
  onChange,
}: SelectFieldProps) => (
  <Field.Root name={name} error={error}>
    <Field.Label>{label}</Field.Label>
    <SingleSelect value={value ?? ""} onChange={onChange}>
      {(options ?? []).map((option) => (
        <SingleSelectOption key={option.value} value={option.value}>
          {option.label}
        </SingleSelectOption>
      ))}
    </SingleSelect>
    <Field.Error />
  </Field.Root>
);

type TextFieldProps = {
  name: string;
  label: string;
  value?: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const TextField = ({ name, label, value, error, onChange }: TextFieldProps) => (
  <Field.Root name={name} error={error}>
    <Field.Label>{label}</Field.Label>
    <TextInput name={name} value={value ?? ""} onChange={onChange} />
    <Field.Error />
  </Field.Root>
);

const EditAddForm = ({ initialValues, onSubmit }: EditAddFormProps) => {
  const fixAndSubmit = (values: Partial<NavikronosRoute>) => {
    const fixed = fixBeforeSubmit(values as NavikronosRoute);
    onSubmit(fixed);
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
    onSubmit: fixAndSubmit,
  });

  const { config } = useConfigDefined();
  const { locale } = useNavigationDataDefined();

  const contentTypeOptions = useMemo(
    () => prepareContentTypesOptions(config),
    [config],
  );

  const staticRouteIdsOptions = useMemo(
    () => prepareStaticRouteIdsOptions(config),
    [config],
  );

  const entryContentTypesOptions = useMemo(
    () => prepareEntryRouteContentTypesOptions(config, locale),
    [config, locale],
  );

  const entryRouteEntriesOptions = useMemo(
    () =>
      prepareEntryRouteEntriesOptions(
        config,
        values as NavikronosRoute,
        locale,
      ),
    [config, values, locale],
  );

  // `values` / `errors` are a union over the route types, so a field name valid for one member
  // isn't indexable on the union itself.
  const valueOf = (fieldName: FieldName) =>
    (values as Record<string, unknown>)[fieldName];
  const errorOf = (fieldName: FieldName) =>
    (errors as Record<string, string | undefined>)[fieldName];

  const selectProps = useCallback(
    (fieldName: FieldName) => ({
      name: fieldName,
      label: fieldLabels[fieldName] ?? fieldName,
      value: valueOf(fieldName) as string | number | undefined,
      error: errorOf(fieldName),
      onChange: (value: string | number) => setFieldValue(fieldName, value),
    }),
    [values, errors, setFieldValue],
  );

  const textProps = useCallback(
    (fieldName: FieldName) => ({
      name: fieldName,
      label: fieldLabels[fieldName] ?? fieldName,
      value: valueOf(fieldName) as string | undefined,
      error: errorOf(fieldName),
      onChange: handleChange,
    }),
    [values, errors, handleChange],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Body>
        <Flex direction="column" alignItems="stretch" gap={4}>
          <SelectField {...selectProps("type")} options={typeOptions} />

          {values.type === "static" && (
            <SelectField
              {...selectProps("id")}
              options={staticRouteIdsOptions}
            />
          )}

          {values.type === "contentType" && (
            <SelectField
              {...selectProps("contentTypeUid")}
              options={contentTypeOptions}
            />
          )}

          {values.type === "entry" && (
            <>
              <SelectField
                {...selectProps("contentTypeUid")}
                options={entryContentTypesOptions}
                onChange={(value) => {
                  setFieldValue("contentTypeUid", value);
                  setFieldValue("entryId", null);
                }}
              />
              <SelectField
                {...selectProps("entryId")}
                options={entryRouteEntriesOptions}
              />
              <Checkbox
                name="overrideTitleCheckbox"
                checked={values.overrideTitle != null}
                onCheckedChange={(checked) => {
                  setFieldValue("overrideTitle", checked ? "" : undefined);
                }}
              >
                {fieldLabels.overrideTitle}
              </Checkbox>
              {values.overrideTitle != null && (
                <TextField {...textProps("overrideTitle")} />
              )}
              <Checkbox
                name="overridePathCheckbox"
                checked={values.overridePath != null}
                onCheckedChange={(checked) => {
                  setFieldValue("overridePath", checked ? "" : undefined);
                }}
              >
                {fieldLabels.overridePath}
              </Checkbox>
              {values.overridePath != null && (
                <TextField {...textProps("overridePath")} />
              )}
            </>
          )}

          {(values.type === "empty" ||
            values.type === "static" ||
            values.type === "listing") && (
            <>
              <TextField {...textProps("title")} />
              <TextField {...textProps("path")} />
            </>
          )}
        </Flex>
      </Modal.Body>
      <Modal.Footer justifyContent="flex-end">
        <Button type="submit" disabled={!isEmpty(errors) || isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </form>
  );
};

export default EditAddForm;
