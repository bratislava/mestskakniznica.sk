// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EventTags } from '@bratislava/strapi-sdk-city-library';

interface TagsDisplayProps {
  tags?: Array<EventTags | null>;
  category: string;
  tagsCount: number;
}

const TagsDisplay = ({ tags = [], category, tagsCount }: TagsDisplayProps) => {
  const lower = Math.min(tagsCount, tags?.length);
  const slicedTags = tags?.slice(0, lower);

  return (
    <div className="flex flex-wrap">
      <div>
        <span>{category}</span>
        {tags?.length > 0 && <span>{'\u00A0\u2022\u00A0'}</span>}
      </div>
      {slicedTags?.map((tag, index) => (
        <div className="" key={tag?.id}>
          {tag?.title}
          {tags.length > 1 && index < lower - 1 ? ',\u00A0' : ''}
        </div>
      ))}
      {slicedTags?.length < tags.length && (
        <div>
          &nbsp;
          {' + ' + (tags.length - slicedTags.length).toString()}
        </div>
      )}
    </div>
  );
};

export default TagsDisplay;
