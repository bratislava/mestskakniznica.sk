import { EventTagEntity } from '@bratislava/strapi-sdk-city-library'
import { Fragment } from 'react'

interface TagsDisplayProps {
  tags?: EventTagEntity[]
  category: string
  tagsCount: number
}

const TagsDisplay = ({ tags = [], category, tagsCount }: TagsDisplayProps) => {
  const lower = Math.min(tagsCount, tags?.length)
  const slicedTags = tags?.slice(0, lower)

  return (
    <div className="flex gap-x-3 truncate text-sm">
      {category && <div className="shrink-0">{category}</div>}
      {tags?.length > 0 && (
        <>
          <div>•</div>
          <div className="truncate">
            {slicedTags?.map(({ attributes, id }, index) => (
              <Fragment key={id}>
                {attributes?.title}
                {tags.length > 1 && index < lower - 1 ? ',\u00A0' : ''}
              </Fragment>
            ))}
            {slicedTags?.length < tags.length && (
              <>
                &nbsp;
                {`+ ${(tags.length - slicedTags.length).toString()}`}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default TagsDisplay
