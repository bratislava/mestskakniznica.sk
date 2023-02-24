import { Stack } from '@components/styleguide/Stack'
import { Wrapper } from '@components/styleguide/Wrapper'
import BookCard from '@modules/cards-and-rows/BookCard'
import React from 'react'

const StyleguideCards = () => {
  return (
    <Wrapper title="Cards" direction="column">
      <Stack>
        <BookCard book={{ title: 'Book without cover', url: '' }} />
        <BookCard
          book={{
            title: 'Book with cover',
            url: '',
            coverUrl: 'https://coverlinker.biblib.net/?k=ZW5jXzk3ODgwMjAwMjA2MDQtTA==&h=ZW5jXy1M',
          }}
        />
        <BookCard book={{ title: 'Book with very very very very long name', url: '' }} />
      </Stack>
    </Wrapper>
  )
}

export default StyleguideCards
