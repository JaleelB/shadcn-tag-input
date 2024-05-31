import React from 'react';
import { type Tag as TagType } from './tag-input';
import { Tag, TagProps } from './tag';
import SortableList, { SortableItem } from 'react-easy-sort';
import { cn } from '../utils';

export type TagListProps = {
  tags: TagType[];
  customTagRenderer?: (tag: TagType, isActiveTag: boolean) => React.ReactNode;
  direction?: TagProps['direction'];
  onSortEnd: (oldIndex: number, newIndex: number) => void;
  className?: string;
  includeTagsInInput?: boolean;
  activeTagIndex?: number | null;
  setActiveTagIndex?: (index: number | null) => void;
} & Omit<TagProps, 'tagObj'>;

const DropTarget: React.FC = () => {
  return <div className={cn('h-full rounded-md bg-secondary/50')} />;
};

export const TagList: React.FC<TagListProps> = ({
  tags,
  customTagRenderer,
  direction,
  draggable,
  onSortEnd,
  className,
  includeTagsInInput,
  activeTagIndex,
  setActiveTagIndex,
  ...tagListProps
}) => {
  const [draggedTagId, setDraggedTagId] = React.useState<string | null>(null);

  const handleMouseDown = (id: string) => {
    setDraggedTagId(id);
  };

  const handleMouseUp = () => {
    setDraggedTagId(null);
  };

  return (
    <>
      {!includeTagsInInput ? (
        <div
          className={cn('rounded-md w-full', className, {
            'flex flex-wrap gap-2': direction === 'row',
            'flex flex-col gap-2': direction === 'column',
          })}
        >
          {draggable ? (
            <SortableList onSortEnd={onSortEnd} className="flex flex-wrap gap-2 list" dropTarget={<DropTarget />}>
              {tags.map((tagObj, index) => (
                <SortableItem key={tagObj.id}>
                  <div
                    onMouseDown={() => handleMouseDown(tagObj.id)}
                    onMouseLeave={handleMouseUp}
                    className={cn(
                      {
                        'border border-solid border-primary rounded-md': draggedTagId === tagObj.id,
                      },
                      'transition-all duration-200 ease-in-out',
                    )}
                  >
                    {customTagRenderer ? (
                      customTagRenderer(tagObj, index === activeTagIndex)
                    ) : (
                      <Tag tagObj={tagObj} isActiveTag={index === activeTagIndex} {...tagListProps} />
                    )}
                  </div>
                </SortableItem>
              ))}
            </SortableList>
          ) : (
            tags.map((tagObj, index) =>
              customTagRenderer ? (
                customTagRenderer(tagObj, index === activeTagIndex)
              ) : (
                <Tag key={tagObj.id} tagObj={tagObj} isActiveTag={index === activeTagIndex} {...tagListProps} />
              ),
            )
          )}
        </div>
      ) : (
        <>
          {draggable ? (
            <SortableList onSortEnd={onSortEnd} className="flex flex-wrap gap-2 list" dropTarget={<DropTarget />}>
              {tags.map((tagObj, index) => (
                <SortableItem key={tagObj.id}>
                  <div
                    onMouseDown={() => handleMouseDown(tagObj.id)}
                    onMouseLeave={handleMouseUp}
                    className={cn(
                      {
                        'border border-solid border-primary rounded-md': draggedTagId === tagObj.id,
                      },
                      'transition-all duration-200 ease-in-out',
                    )}
                  >
                    {customTagRenderer ? (
                      customTagRenderer(tagObj, index === activeTagIndex)
                    ) : (
                      <Tag tagObj={tagObj} isActiveTag={index === activeTagIndex} {...tagListProps} />
                    )}
                  </div>
                </SortableItem>
              ))}
            </SortableList>
          ) : (
            tags.map((tagObj, index) =>
              customTagRenderer ? (
                customTagRenderer(tagObj, index === activeTagIndex)
              ) : (
                <Tag key={tagObj.id} tagObj={tagObj} isActiveTag={index === activeTagIndex} {...tagListProps} />
              ),
            )
          )}
        </>
      )}
    </>
  );
};
