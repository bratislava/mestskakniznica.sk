import { CloseCircleIcon, PlusIcon } from '@assets/icons'
import { Input } from '@bratislava/ui-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, useFieldArray, useFormContext, useFormState } from 'react-hook-form'

import Button from '@/modules/common/Button'

interface Props {
  className?: string
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
const BookListNotInLibrary = ({ className }: Props) => {
  const methods = useFormContext()
  const { errors } = useFormState()
  const { t } = useTranslation('forms')

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'books',
  })

  const handleAddBook = () => {
    append({
      author: '',
      title: '',
      issuer: '',
      issueDate: '',
    })
  }

  const handleRemoveBook = (idx: number) => {
    remove(idx)
  }

  return (
    <div className={className}>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className={cx('relative mb-6 flex w-full flex-col gap-y-6 border p-6', {
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
              onPress={() => handleRemoveBook(index)}
              aria-label={t('remove_book')}
            >
              <CloseCircleIcon />
            </Button>
          )}
          <Controller
            control={methods.control}
            name={`books[${index}].author` as const}
            render={({ field: { ref, ...rest } }) => (
              <Input
                id={`books[${index}]_author_input` as const}
                labelContent={t('author')}
                inputClassName="px-3 w-full"
                required
                // @ts-ignore
                hasError={errors.books && !!errors.books[index]?.author}
                errorMessage={t('validation_error_required')}
                {...rest}
              />
            )}
          />
          <Controller
            control={methods.control}
            name={`books[${index}].title` as const}
            render={({ field: { ref, ...rest } }) => (
              <Input
                id={`books[${index}]_title_input` as const}
                labelContent={t('title')}
                inputClassName="px-3 w-full"
                required
                // @ts-ignore
                hasError={errors.books && !!errors.books[index]?.title}
                errorMessage={t('validation_error_required')}
                {...rest}
              />
            )}
          />
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <Controller
              control={methods.control}
              name={`books[${index}].issueDate` as const}
              render={({ field: { ref, ...rest } }) => (
                <Input
                  id={`books[${index}]_issue_date_input` as const}
                  labelContent={t('issue_date')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  {...rest}
                />
              )}
            />
            <Controller
              control={methods.control}
              name={`books[${index}].issuer` as const}
              render={({ field: { ref, ...rest } }) => (
                <Input
                  id={`books[${index}]_issuer_input` as const}
                  labelContent={t('issuer')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  {...rest}
                />
              )}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-center lg:block">
        <Button
          startIcon={<PlusIcon />}
          variant="plain-primary"
          className="mb-4"
          onPress={handleAddBook}
        >
          {t('add_book')}
        </Button>
      </div>
    </div>
  )
}
/* eslint-enable @typescript-eslint/ban-ts-comment */

export default BookListNotInLibrary
