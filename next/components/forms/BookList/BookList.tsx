import ClearCircle from '@assets/images/clear-circle.svg'
import PlusIcon from '@assets/images/plus.svg'
import { Button, Input } from '@bratislava/ui-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { FormEvent } from 'react'
import { Controller, useFieldArray, useFormContext, useFormState } from 'react-hook-form'

interface Props {
  className?: string
}

const BookList = ({ className }: Props) => {
  const methods = useFormContext()
  const { errors } = useFormState()
  const { t } = useTranslation(['forms', 'common'])

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'books',
  })

  const handleAddBook = (e: FormEvent) => {
    e.preventDefault()
    append({ bookId: '', author: '', title: '' })
  }

  const handleRemoveBook = (e: FormEvent, idx: number) => {
    e.preventDefault()
    remove(idx)
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cx('relative w-full border p-6', {
              'border-border-light': !errors?.books?.[index],
              'base-input--with-error': errors?.books?.[index],
            })}
          >
            {fields.length > 1 && (
              <ClearCircle
                onClick={(e: FormEvent) => handleRemoveBook(e, index)}
                className="absolute right-3 top-3 cursor-pointer"
              />
            )}
            <div className="flex w-full flex-col gap-y-6">
              <Controller
                control={methods.control}
                name={`books[${index}].id` as const}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id={`books_number_[${index}]_input` as const}
                    labelContent={t('book_number')}
                    inputClassName="px-3 w-full"
                    required
                    hasError={errors.books && !!errors.books[index]?.id}
                    {...field}
                  />
                )}
              />
              <div className="text-sm text-foreground-body">{t('common:or')}</div>
              <Controller
                control={methods.control}
                name={`books[${index}].author` as const}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id={`author_[${index}]_input` as const}
                    labelContent={t('author')}
                    inputClassName="px-3 w-full"
                    required
                    hasError={errors.books && !!errors.books[index]?.author}
                    {...field}
                  />
                )}
              />
              <Controller
                control={methods.control}
                name={`books[${index}].title` as const}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <Input
                    id={`title_[${index}]_input` as const}
                    labelContent={t('title')}
                    inputClassName="px-3 w-full"
                    required
                    hasError={errors.books && !!errors.books[index]?.title}
                    {...field}
                  />
                )}
              />
            </div>

            {/* Error Message */}
            <p
              className={cx('mt-2 text-sm text-error', {
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
          icon={<PlusIcon/>}
          iconPosition="left"
          variant="plain-primary"
          className="mt-[33px] mb-[9px] text-sm font-medium"
          onClick={(e) => handleAddBook(e)}
        >
          {t('add_book')}
        </Button>
      </div>
    </div>
  )
}

export default BookList
