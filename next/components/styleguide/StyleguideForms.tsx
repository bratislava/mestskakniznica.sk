import { Key } from '@react-types/shared'
import React, { useState } from 'react'

import SelectField, { SelectItem } from '@/components/Atoms/SelectField'
import { getForm } from '@/components/Molecules/Sections'
import { Wrapper } from '@/components/styleguide/Wrapper'
import { Enum_Componentsectionsform_Type } from '@/services/graphql'

const StyleguideForms = () => {
  const selectItems = Object.values(Enum_Componentsectionsform_Type).map((value) => ({
    id: value,
    label: value,
  }))

  const [form, setForm] = useState<Key>(selectItems[0].id)

  return (
    <Wrapper title="Forms" direction="column">
      <SelectField
        items={selectItems}
        onSelectionChange={(key) => {
          if (key !== null) {
            setForm(key)
          }
        }}
        selectedKey={form}
      >
        {(item) => <SelectItem label={item.label} id={item.id} />}
      </SelectField>

      {getForm(form as string, form as string)}
    </Wrapper>
  )
}

export default StyleguideForms
