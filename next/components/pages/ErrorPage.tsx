import BookReader from '@assets/images/book-reader.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import Home from '@assets/images/home.svg'
import book_reader from '../../assets/images/book-reader.png'

import { SectionContainer } from '@bratislava/ui-city-library'

interface IProps {
  code: number
  children?: React.ReactNode
}

const ErrorPage = ({ code, children }: IProps) => {
  return (
    <SectionContainer>
      <div className="border-gray-700">
        <div className="flex text-sm h-[56px]">
          <a href="./" className="py-[18px]">
            <Home />{' '}
          </a>
          <div className="flex">
            <div className="pl-[18px] py-[23px]">
              <ChevronRight />
            </div>
            <div className="py-[18px] pl-3"> {code} </div>
          </div>
        </div>
        <div className="flex flex-col md:grid grid-cols-2 py-12 items-center">
          <div>{children}</div>
          <img src={book_reader.src} alt={'book_readers'} height={book_reader.height} width={book_reader.width} />
        </div>
      </div>
    </SectionContainer>
  )
}

export default ErrorPage
