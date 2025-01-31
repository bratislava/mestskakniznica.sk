import { useTranslation } from 'next-i18next'
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  KeyboardEventHandler,
  SetStateAction,
} from 'react'

import { CloseCircleIcon, CloseIcon, SearchIcon } from '@/assets/icons'
import Button from '@/modules/common/Button'

import TextField from './TextField'

type SearchProps = {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  setSearchValue: (query: string) => void
  placeholder?: string

  onSearchPress?: (value: string) => void
  isLarge?: boolean
  className?: string
  inputClassName?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const SearchField = ({
  input,
  setInput,
  setSearchValue,
  placeholder,
  onSearchPress = () => {},
  className,
  inputClassName,
  isLarge = false,
  ...rest
}: SearchProps) => {
  const { t } = useTranslation('common')

  const handleClear = () => {
    setInput('')
  }

  // TODO: proper keyboard events handling
  const onKeyUpHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSearchPress(input)
      e.preventDefault()
    }
    if (e.key === 'Escape') {
      handleClear()
      e.preventDefault()
    }
  }

  return (
    <TextField
      id="search"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder ?? t('searchField.searchPlaceholder')}
      aria-label={t('searchField.aria.searchField')}
      onKeyUp={onKeyUpHandler}
      className={className}
      inputClassName={inputClassName}
      leftSlot={<SearchIcon />}
      isLarge={isLarge}
      rightSlot={
        input.length > 0 ? (
          <Button variant="unstyled" onPress={handleClear} className="p-2">
            {isLarge ? <CloseIcon /> : <CloseCircleIcon />}
          </Button>
        ) : null
      }
      {...rest}
    />
  )
}

export default SearchField
