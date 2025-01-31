import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, useFieldArray, useFormContext, useFormState } from 'react-hook-form'

import { CloseCircleIcon, PlusIcon } from '@/assets/icons'
import { Input } from '@/components/ui'
import Button from '@/modules/common/Button'

interface Props {
  className?: string
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
const BookList = ({ className }: Props) => {
  const methods = useFormContext()
  const { errors } = useFormState()
  const { t } = useTranslation(['forms', 'common'])

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'books',
  })

  const handleAddBook = () => {
    append({ bookId: '', author: '', title: '' })
  }

  const handleRemoveBook = (idx: number) => {
    remove(idx)
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cx('relative w-full border p-6', {
              // @ts-ignore
              'border-border-light': !errors?.books?.[index],
              // @ts-ignore
              'base-input--with-error': errors?.books?.[index],
            })}
          >
            {fields.length > 1 && (
              <Button
                variant="unstyled"
                className="absolute right-3 top-3 cursor-pointer"
                aria-label={t('remove_book')}
                onPress={() => handleRemoveBook(index)}
              >
                <CloseCircleIcon />
              </Button>
            )}
            <div className="flex w-full flex-col gap-y-6">
              <Controller
                control={methods.control}
                name={`books[${index}].id` as const}
                defaultValue=""
                render={({ field: { ref, ...rest } }) => (
                  <Input
                    id={`books_number_[${index}]_input` as const}
                    labelContent={t('book_number')}
                    inputClassName="px-3 w-full"
                    required
                    // @ts-ignore
                    hasError={errors.books && !!errors.books[index]?.id}
                    {...rest}
                  />
                )}
              />
              <div className="text-sm text-foreground-body">{t('or')}</div>
              <Controller
                control={methods.control}
                name={`books[${index}].author` as const}
                defaultValue=""
                render={({ field: { ref, ...rest } }) => (
                  <Input
                    id={`author_[${index}]_input` as const}
                    labelContent={t('author')}
                    inputClassName="px-3 w-full"
                    required
                    // @ts-ignore
                    hasError={errors.books && !!errors.books[index]?.author}
                    {...rest}
                  />
                )}
              />
              <Controller
                control={methods.control}
                name={`books[${index}].title` as const}
                defaultValue=""
                render={({ field: { ref, ...rest } }) => (
                  <Input
                    id={`title_[${index}]_input` as const}
                    labelContent={t('title')}
                    inputClassName="px-3 w-full"
                    required
                    // @ts-ignore
                    hasError={errors.books && !!errors.books[index]?.title}
                    {...rest}
                  />
                )}
              />
            </div>

            {/* Error Message */}
            <p
              className={cx('mt-2 text-sm text-error', {
                // @ts-ignore
                hidden: !(errors.books && errors.books[index]) ?? false,
              })}
            >
              {t('validation_error_booklist')}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center lg:block">
        <Button
          startIcon={<PlusIcon />}
          variant="plain-primary"
          className="mt-[33px] mb-[9px]"
          onPress={handleAddBook}
        >
          {t('add_book')}
        </Button>
      </div>
    </div>
  )
}
/* eslint-enable @typescript-eslint/ban-ts-comment */

export default BookList
