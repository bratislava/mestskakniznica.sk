import ClearCircle from '@assets/images/clear-circle.svg'
import SearchIcon from '@assets/images/search.svg'
import { SearchBar } from '@bratislava/ui-city-library'
import { FormEvent, useState } from 'react'

interface SearchBoxProps {
  text: string
}

const SearchBox = ({ text }: SearchBoxProps) => {
  const [searchedTerm, setSearchedTerm] = useState('')
  const baseUrl = 'https://opac.mestskakniznica.sk/opac'

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchedTerm === '') window.open(baseUrl, '_self')
    else window.open(`${baseUrl}?fn=searchform&extSrchTitle=${searchedTerm}`, '_self')
  }

  return (
    <form onSubmit={onSubmit} className="self-center">
      <SearchBar
        iconLeft={<SearchIcon onClick={onSubmit} className="cursor-pointer" />}
        iconRight={searchedTerm.length > 0 && <ClearCircle onClick={() => setSearchedTerm('')} />}
        onChange={(e) => setSearchedTerm(e.target.value)}
        value={searchedTerm}
        inputClassName="rounded-full w-[320px] xl:w-[440px] border-border-dark"
        placeholder={text}
        aria-label={text}
      />
    </form>
  )
}

export default SearchBox
