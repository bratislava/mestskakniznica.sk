import Accessibility from '@assets/images/accessibility.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import ClearCircle from '@assets/images/clear-circle.svg'
import SearchIcon from '@assets/images/search.svg'
import cx from 'classnames'
import React, { FormEvent } from 'react'

import { Link } from '../Link/Link'
import { SearchBar } from '../SearchBar/SearchBar'

export interface IProps extends LanguageSelectProps {
  className?: string
  logoTitle: string
  openingHours: string
  menuItems: ISubMenuItem[]
}

export interface ISubMenuItem {
  title: string
  url: string
  elements: {
    title: string
    align: string
    items: {
      title: string
      url: string
    }[]
  }[]
}

interface LanguageSelectProps {
  className?: string
  languages?: LanguageOption[]
  currentLanguage?: string
  onLanguageChange?: (language: LanguageOption) => void
}

interface LanguageOption {
  key: string
  title: string
}

function Logo({ logoTitle }: { logoTitle: string }) {
  return <div className="flex uppercase text-gray-universal-100 text-[27px]">
    {logoTitle.split(' ').map((part, index) => (
      <span
        key={index}
        className={cx('border-r border-gray-universal-100 py-[7px]', {
          'pr-3': index === 0,
          'px-3': index !== 0,
        })}
      >
        {part}
      </span>
    ))}
  </div>
}

function LanguageSelect({
  className,
  languages: options,
  currentLanguage: current,
  onLanguageChange: onChange,
}: LanguageSelectProps) {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!onChange) return

    const selectedKey = e.target.value
    const selectedOption = options?.find((opt) => opt.key === selectedKey)
    if (selectedOption) onChange(selectedOption)
  }

  if (!options) return null

  return (
    <select className={className} value={current} onChange={handleChange}>
      {options?.map((option) => (
        <option key={option.key} value={option.key}>
          {option.title}
        </option>
      ))}
    </select>
  )
}

function HeaderTopItems({ openingHours, ...languageSelectProps }: { openingHours: string }) {
  return <div className="flex">
    <span className="px-3 border-l border-gray-universal-100 h-full flex items-center">
      <Accessibility className="cursor-pointer" />
    </span>
    <p className="text-xs border-l border-gray-universal-100 px-3 h-full flex items-center cursor-default">
      {openingHours}
    </p>
    <div className="border-l border-gray-universal-100 px-3 h-full flex items-center">
      Prihlásenie
    </div>
    <LanguageSelect
      className="appearance-none border-l border-gray-universal-100 bg-white px-3 text-xs h-full flex items-center cursor-pointer focus:outline-none"
      {...languageSelectProps}
    />
  </div>
}

function SearchBox() {
  const [searchedTerm, setSearchedTerm] = React.useState('')
  const baseUrl = 'https://opac.mestskakniznica.sk/opac'

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchedTerm === '') window.open(baseUrl, '_blank')
    else window.open(`${baseUrl}?fn=searchform&extSrchTitle=${searchedTerm}`, '_blank')
  }

  return (
    <form onSubmit={onSubmit} className="self-center">
      <SearchBar
        iconLeft={<SearchIcon onClick={onSubmit} className="cursor-pointer" />}
        iconRight={searchedTerm.length > 0 && <ClearCircle onClick={() => setSearchedTerm('')} />}
        onChange={(e) => setSearchedTerm(e.target.value)}
        value={searchedTerm}
        inputClassName="rounded-full w-[440px]"
      />
    </form>
  )
}

export function Header({ className, logoTitle, menuItems, openingHours, ...languageSelectProps }: IProps) {
  return <div className={cx(className, 'w-full relative')}>
    <div className="flex justify-between border-b border-gray-universal-100">
      <Logo logoTitle={logoTitle} />
      <HeaderTopItems openingHours={openingHours} {...languageSelectProps} />
    </div>
    <div className="flex items-center justify-between border-b border-gray-universal-100">
      <div className="flex">
        {menuItems.map((item, idx) => (
          <div key={item.title} className="group">
            <div
              key={item.title}
              className={cx('w-40 pb-1 pt-7 cursor-pointer', {
                'border-l border-gray-universal-100 pl-3': idx !== 0,
              })}
            >
              {item.title}
            </div>
            {/* Panel */}
            <div
              className={cx(
                'hidden group-hover:block absolute bg-white border-t border-gray-universal-100 left-0 right-0 z-20 w-full'
              )}
            >
              <div className="flex flex-col h-[410px] flex-wrap gap-10 py-8">
                {item.elements.map((el) => (
                  <div key={el.title}>
                    <p className="text-default text-gray-universal-100 mb-4">{el.title}</p>
                    <div className="flex flex-col gap-y-4">
                      {el.items.map((item, idx) => (
                        <Link
                          key={item.title}
                          uppercase={false}
                          href={item.url}
                          className="text-sm w-66 text-gray-universal-70"
                        >
                          {idx < 8 && item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-x-[13px] border-t border-gray-universal-100 py-5">
                Zobraziť všetko
                <ChevronRight />
              </div>
            </div>
          </div>
        ))}
      </div>
      <SearchBox />
    </div>
  </div>
}
