import ClearCircle from '@assets/images/clear-circle.svg'
import PlusIcon from '@assets/images/plus.svg'
import { Button, Input } from '@bratislava/ui-city-library'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { FormEvent } from 'react'
import { Controller, useFieldArray, useFormContext, useFormState } from 'react-hook-form'

interface Props {
  className?: string
  showLinkInput?: boolean
}

function BookListExtended({ className, showLinkInput = false }: Props) {
  const methods = useFormContext()
  const { errors } = useFormState()
  const { t } = useTranslation('forms')

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'books',
  })

  const handleAddBook = (e: FormEvent) => {
    e.preventDefault()
    append({
      author: '',
      title: '',
      link: '',
      placeOfIssue: '',
      issuer: '',
      packageNumber: '',
      issueDate: '',
      ISBN: '',
    })
  }

  const handleRemoveBook = (e: FormEvent, idx: number) => {
    e.preventDefault()
    remove(idx)
  }

  return (
    <div className={className}>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className={cx('flex flex-col gap-y-6 w-full border p-6 mb-6 relative', {
            'border-input-stroke': !errors?.books?.[index],
            'base-input--with-error': errors?.books?.[index],
          })}
        >
          {fields.length > 1 && (
            <ClearCircle
              onClick={(e: FormEvent) => handleRemoveBook(e, index)}
              className="absolute right-3 top-3 cursor-pointer"
            />
          )}
          {showLinkInput && (
            <Controller
              control={methods.control}
              name={`books[${index}].link` as const}
              render={({ field: { ref, ...field } }) => (
                <Input
                  id={`books[${index}]_link_input` as const}
                  labelContent={t('book_number')}
                  inputClassName="px-3 w-full"
                  {...field}
                />
              )}
            />
          )}
          <Controller
            control={methods.control}
            name={`books[${index}].author` as const}
            render={({ field: { ref, ...field } }) => (
              <Input
                id={`books[${index}]_author_input` as const}
                labelContent={t('author')}
                inputClassName="px-3 w-full"
                required
                hasError={errors.books && !!errors.books[index]?.author}
                errorMessage={(errors.books && errors.books[index]?.author?.message) ?? ''}
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name={`books[${index}].title` as const}
            render={({ field: { ref, ...field } }) => (
              <Input
                id={`books[${index}]_title_input` as const}
                labelContent={t('title')}
                inputClassName="px-3 w-full"
                required
                hasError={errors.books && !!errors.books[index]?.title}
                errorMessage={(errors.books && errors.books[index]?.title?.message)}
                {...field}
              />
            )}
          />
          <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row items-center justify-between">
            <Controller
              control={methods.control}
              name={`books[${index}].placeOfIssue` as const}
              render={({ field: { ref, ...field } }) => (
                <Input
                  id={`books[${index}]_placeOfIssue_input` as const}
                  labelContent={t('place_of_issue')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name={`books[${index}].issuer` as const}
              render={({ field: { ref, ...field } }) => (
                <Input
                  id={`books[${index}]_issuer_input` as const}
                  labelContent={t('issuer')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-y-6 gap-x-6 lg:flex-row items-center justify-between">
            <Controller
              control={methods.control}
              name={`books[${index}].packageNumber` as const}
              render={({ field: { ref, ...field } }) => (
                <Input
                  id={`books[${index}]_package_number_input` as const}
                  labelContent={t('package_number')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name={`books[${index}].issueDate` as const}
              render={({ field: { ref, ...field } }) => (
                <Input
                  id={`books[${index}]_issue_date_input` as const}
                  labelContent={t('issue_date')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  {...field}
                />
              )}
            />
          </div>
          <div className="w-full lg:w-6/12 lg:pr-3">
            <Controller
              control={methods.control}
              name={`books[${index}].ISBN` as const}
              render={({ field: { ref, ...field } }) => (
                <Input
                  id={`books[${index}]_isbn_input` as const}
                  labelContent={t('ISBN')}
                  className="w-full"
                  inputClassName="px-3 w-full"
                  {...field}
                />
              )}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-center lg:block">
        <Button
          icon={<PlusIcon />}
          iconPosition="left"
          variant="plain-primary"
          className="font-medium text-xs mb-4"
          onClick={(e) => handleAddBook(e)}
        >
          {t('add_book')}
        </Button>
      </div>
    </div>
  )
}

export default BookListExtended
