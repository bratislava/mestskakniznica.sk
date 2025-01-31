import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { KeyboardEventHandler, useId, useState } from 'react'
import { useFocusWithin } from 'react-aria'

import { CloseCircleIcon, SearchIcon } from '@/assets/icons'
import SearchBar from '@/components/AppLayout/Navigation/SearchBar'
import { Select } from '@/components/ui'
import Button from '@/modules/common/Button'
import { useNavikronos } from '@/utils/navikronos'

const opacBaseUrl = 'https://opac.mestskakniznica.sk/opac'

type HeaderSearchBoxProps = {
  isOpen: boolean
  setOpen: (open: boolean) => void
}
const HeaderSearchBox = ({ isOpen, setOpen }: HeaderSearchBoxProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()
  const searchFieldId = useId()

  const SEARCH_OPTIONS: { key: 'on_page' | 'in_catalogue'; title: string }[] = [
    { key: 'on_page', title: t('searchBox.options.searchOnPage') },
    { key: 'in_catalogue', title: t('searchBox.options.searchInCatalogue') },
  ]

  const { focusWithinProps } = useFocusWithin({
    onBlurWithin: () => setOpen(false),
  })

  const [input, setInput] = useState('')

  const [searchOptions, setSearchOptions] = useState(SEARCH_OPTIONS[0].key)

  const handleSearch = () => {
    if (searchOptions === 'in_catalogue') {
      if (input === '') {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        window.open(opacBaseUrl, '_blank')
      } else {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        window.open(`${opacBaseUrl}?fn=searchform&extSrchTitle=${input}`, '_blank')
      }
      setOpen(false)
    }
    if (searchOptions === 'on_page') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({
        pathname: getPathForEntity({ type: 'static', id: 'search' }),
        query: { query: input },
      })
    }
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
        selectClassName="rounded-l-full border-dark w-[134px] border-r-0"
      />
      <SearchBar
        id={searchFieldId}
        iconLeft={<SearchIcon className="-ml-2 hidden md:block" />}
        iconRight={
          input.length > 0 && (
            <Button
              onPress={handleClear}
              aria-label={t('searchBox.aria.clearSearch')}
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
        inputClassName={cx('grow-1 w-full rounded-r-full border-border-dark pl-4 md:pl-10', {
          'pr-24 md:pr-36': isOpen,
        })}
        placeholder={
          searchOptions === 'in_catalogue'
            ? t('searchBox.searchBookPlaceholder')
            : t('searchBox.searchOnPagePlaceholder')
        }
        aria-label={
          searchOptions === 'in_catalogue'
            ? t('searchBox.aria.searchBook')
            : t('searchBox.aria.searchOnPage')
        }
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Button
              onPress={handleSearch}
              aria-label={
                searchOptions === 'in_catalogue'
                  ? t('searchBox.aria.searchBook')
                  : t('searchBox.aria.searchOnPage')
              }
              className={cx('absolute right-0 h-[42px] rounded-full px-4')}
            >
              <span className="hidden md:inline">{t('searchBox.search')}</span>
              <span className="md:hidden">
                <SearchIcon />
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeaderSearchBox
