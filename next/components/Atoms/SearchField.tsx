import XCircleIcon from '@assets/images/clear-circle.svg'
import CloseIcon from '@assets/images/close.svg'
import SearchIcon from '@assets/images/search.svg'
import { useTranslation } from 'next-i18next'
import { DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction, } from 'react'

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

  onSearchPress = () => {
  },
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
      placeholder={placeholder ?? t('searchPlaceholder')}
      aria-label={t('aria.searchField')}
      onKeyUp={onKeyUpHandler}
      className={className}
      inputClassName={inputClassName}
      leftSlot={<SearchIcon/>}
      rightSlot={
        input.length > 0 ? (
          <button onClick={handleClear} type="button" className="p-2">
            {isLarge ? <CloseIcon/> : <XCircleIcon/>}
          </button>
        ) : null
      }
      {...rest}
    />
  )
}

export default SearchField
