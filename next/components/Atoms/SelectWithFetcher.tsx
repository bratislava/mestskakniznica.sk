// TODO this component was copied from Marianum project
import SelectField, { Option, SelectProps, SingleSelect } from '@components/Atoms/SelectField'
import { useMemo } from 'react'
import { Key } from 'swr'

import useSwrWithExtras from '../../hooks/useSwrWithExtras'

type SelectWithFetcherProps = {
  swrKey: Key
  fetcher: () => Promise<Option[]>
  defaultOption: Option
} & Pick<SelectProps, 'id' | 'placeholder' | 'label' | 'disabled'> &
  Pick<SingleSelect, 'onSelectionChange'>

const SelectWithFetcher = ({
  swrKey,
  defaultOption,
  fetcher,
  disabled: originalDisabled,
  onSelectionChange,
  ...rest
}: SelectWithFetcherProps) => {
  const { data, error, loading } = useSwrWithExtras(swrKey, fetcher)

  const options = useMemo(() => {
    if (data) {
      return [defaultOption, ...data]
    }
    return [defaultOption]
  }, [data, defaultOption])

  return (
    <SelectField
      options={options}
      defaultSelected={defaultOption.key}
      multiple={false}
      disabled={loading || error || originalDisabled}
      onSelectionChange={onSelectionChange}
      {...rest}
    />
  )
}

export default SelectWithFetcher
