import { CloseCircleIcon, SearchIcon } from '@assets/icons'
import { SearchBar, Select } from '@bratislava/ui-city-library'
import Button from '@modules/common/Button'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { KeyboardEventHandler, useState } from 'react'
import { useFocusWithin } from 'react-aria'
import { useIsClient } from 'usehooks-ts'

import { useSearch } from '../../../hooks/useSearch'
import { useNavikronos } from '@utils/navikronos'

const opacBaseUrl = 'https://opac.mestskakniznica.sk/opac'

type HeaderSearchBoxProps = {
  isOpen: boolean
  setOpen: (open: boolean) => void
}
const HeaderSearchBox = ({ isOpen, setOpen }: HeaderSearchBoxProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()

  const SEARCH_OPTIONS: { key: 'on_page' | 'in_catalogue'; title: string }[] = [
    { key: 'on_page', title: t('searchOnPage') },
    { key: 'in_catalogue', title: t('searchInCatalogue') },
  ]

  const { focusWithinProps } = useFocusWithin({
    onBlurWithin: () => setOpen(false),
  })

  const {
    // we use just input, because we don't actually perform any search here
    // add searchValue if e.g. suggestions are needed
    input,
    setInput,
  } = useSearch({ syncWithUrlQuery: false })

  const isClient = useIsClient()
  const [searchOptions, setSearchOptions] = useState(SEARCH_OPTIONS[0].key)

  const handleSearch = () => {
    if (searchOptions === 'in_catalogue' && isClient) {
      if (input === '') {
        window.open(opacBaseUrl, '_blank')
      } else {
        window.open(`${opacBaseUrl}?fn=searchform&extSrchTitle=${input}`, '_blank')
      }
    }
    // TODO replace by proper url
    // input is here on purpose, because searchValue is debounced
    router.push(`${getPathForEntity({ type: 'static', id: 'search' })}?query=${input}`)
  }

  const handleClear = () => {
    setInput('')
  }

  // TODO: proper keyboard events handling
  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      handleClear()
    }
  }

  return (
    <div
      {...focusWithinProps}
      className={cx('relative flex w-full transition-all duration-500 lg:absolute lg:right-0', {
        'lg:w-full': isOpen,
        'lg:w-[440px]': !isOpen,
      })}
    >
      <Select
        options={SEARCH_OPTIONS}
        value={searchOptions}
        onChange={(s) => setSearchOptions(s.key)}
        selectClassName="rounded-l-full border-dark w-[140px] border-r-0"
      />
      <SearchBar
        iconLeft={<SearchIcon onClick={handleSearch} className="cursor-pointer" />}
        iconRight={
          input.length > 0 && (
            <Button
              onPress={handleClear}
              aria-label={t('aria.clearSearch')}
              variant="unstyled"
              className="flex items-center"
            >
              <CloseCircleIcon />
            </Button>
          )
        }
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSearch}
        onKeyUp={handleKeyUp}
        isOpen={isOpen}
        value={input}
        onFocus={() => setOpen(true)}
        className={cx('w-full')}
        inputClassName={cx('grow-1 w-full rounded-r-full border-border-dark', { 'pr-36': isOpen })}
        placeholder={
          searchOptions === 'in_catalogue'
            ? t('searchBookPlaceholder')
            : t('searchOnPagePlaceholder')
        }
        aria-label={
          searchOptions === 'in_catalogue' ? t('aria.searchBook') : t('aria.searchOnPage')
        }
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Button
              onPress={handleSearch}
              aria-label={
                searchOptions === 'in_catalogue' ? t('aria.searchBook') : t('aria.searchOnPage')
              }
              className={cx('absolute right-0 h-[42px] rounded-full px-4')}
            >
              {t('search')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeaderSearchBox
