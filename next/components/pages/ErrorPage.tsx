import Image from 'next/image'
import { ReactNode } from 'react'

import book_reader from '@/assets/images/book-reader.png'
import { SectionContainer } from '@/components/ui'
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
          <Image
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
