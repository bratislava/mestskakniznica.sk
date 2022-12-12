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

const Logo = ({ logoTitle }: { logoTitle: string }) => {
  return (
    <div className="flex text-[27px] uppercase text-text-heading">
      {logoTitle.split(' ').map((part, index) => (
        <span
          key={index}
          className={cx('border-r border-border-dark py-[7px]', {
            'pr-3': index === 0,
            'px-3': index !== 0,
          })}
        >
          {part}
        </span>
      ))}
    </div>
  )
}

const LanguageSelect = ({
                          className,
                          languages: options,
                          currentLanguage: current,
                          onLanguageChange: onChange,
                        }: LanguageSelectProps) => {
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

const HeaderTopItems = ({ openingHours, ...languageSelectProps }: { openingHours: string }) => {
  return (
    <div className="flex">
      <span className="flex h-full items-center border-l border-border-dark px-3">
        <Accessibility className="cursor-pointer"/>
      </span>
      <p className="flex h-full cursor-default items-center border-l border-border-dark px-3 text-xs">
        {openingHours}
      </p>
      <div className="flex h-full items-center border-l border-border-dark px-3">
        Prihlásenie
      </div>
      <LanguageSelect
        className="flex h-full cursor-pointer appearance-none items-center border-l border-border-dark bg-white px-3 text-xs focus:outline-none"
        {...languageSelectProps}
      />
    </div>
  )
}

const SearchBox = () => {
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
        iconLeft={<SearchIcon onClick={onSubmit} className="cursor-pointer"/>}
        iconRight={searchedTerm.length > 0 && <ClearCircle onClick={() => setSearchedTerm('')}/>}
        onChange={(e) => setSearchedTerm(e.target.value)}
        value={searchedTerm}
        inputClassName="rounded-full w-[440px]"
      />
    </form>
  )
}

export const Header = ({
                         className,
                         logoTitle,
                         menuItems,
                         openingHours,
                         ...languageSelectProps
                       }: IProps) => {
  return (
    <div className={cx(className, 'relative w-full')}>
      <div className="flex justify-between border-b border-border-dark">
        <Logo logoTitle={logoTitle}/>
        <HeaderTopItems openingHours={openingHours} {...languageSelectProps} />
      </div>
      <div className="flex items-center justify-between border-b border-border-dark">
        <div className="flex">
          {menuItems.map((item, idx) => (
            <div key={item.title} className="group">
              <div
                key={item.title}
                className={cx('w-40 cursor-pointer pb-1 pt-7', {
                  'border-l border-border-dark pl-3': idx !== 0,
                })}
              >
                {item.title}
              </div>
              {/* Panel */}
              <div
                className={cx(
                  'absolute left-0 right-0 z-20 hidden w-full border-t border-border-dark bg-white group-hover:block'
                )}
              >
                <div className="flex h-[410px] flex-col flex-wrap gap-10 py-8">
                  {item.elements.map((el) => (
                    <div key={el.title}>
                      <p className="mb-4 text-default text-text-heading">{el.title}</p>
                      <div className="flex flex-col gap-y-4">
                        {el.items.map((item, idx) => (
                          <Link
                            key={item.title}
                            uppercase={false}
                            href={item.url}
                            className="w-66 text-sm text-text-body"
                          >
                            {idx < 8 && item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-x-[13px] border-t border-border-dark py-5">
                  Zobraziť všetko
                  <ChevronRight/>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SearchBox/>
      </div>
    </div>
  )
}
