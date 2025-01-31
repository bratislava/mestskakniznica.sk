import book_reader from '@assets/images/book-reader.png'
import { SectionContainer } from '@bratislava/ui-city-library'
import { ReactNode } from 'react'

import Breadcrumbs from '@/modules/breadcrumbs/Breadcrumbs'

interface IProps {
  code: number
  children?: ReactNode
}

const ErrorPage = ({ code, children }: IProps) => {
  return (
    <SectionContainer>
      <div className="border-border-dark">
        <Breadcrumbs crumbs={[{ title: `${code}`, path: `/${String(code)}` }]} />
        <div className="flex grid-cols-2 flex-col items-center py-12 md:grid">
          <div>{children}</div>
          <img
            src={book_reader.src}
            alt="book_readers"
            height={book_reader.height}
            width={book_reader.width}
          />
        </div>
      </div>
    </SectionContainer>
  )
}

export default ErrorPage
