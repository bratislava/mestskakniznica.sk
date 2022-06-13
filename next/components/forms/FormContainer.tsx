import React, { ReactNode, useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/images/close.svg';
import FormSubmittedComponent from './FormSubmittedComponent';
import useLockedBodyScroll from '../../hooks/useLockedBodyScroll';
import useWindowSize from '../../hooks/useWindowSize';
import { useTranslation } from 'next-i18next';
import cx from 'classnames';

export const phoneRegex = /(^(\+[\d]{1,3}|0) ?[0-9]{3} ?[0-9]{3} ?[0-9]{3}$)/;
export const phoneRegexOrEmpty =
  /(^(\+[\d]{1,3}|0) ?[0-9]{3} ?[0-9]{3} ?[0-9]{3}$)|^$/;
export const postalCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
export const IBANRegex = /^[A-Z]{2}(?:[ ]?[0-9]){13,30}$/;

interface FormContainerProps {
  children: ReactNode;
  buttonText: string;
  title: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitted: boolean;
  onReset?: () => void;
  successTitle?: string;
  successMessage?: string;
  errorMessage?: string;
  wrapperClass?: string;
}

const FormContainer = ({
  children,
  buttonText,
  title,
  onSubmit,
  isSubmitted,
  onReset,
  successTitle,
  successMessage,
  errorMessage,
  wrapperClass,
}: FormContainerProps) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const { t } = useTranslation('forms');

  const { width }: any = useWindowSize();

  const [lockedBodyScroll, setLockedBodyScroll] = useLockedBodyScroll();

  useEffect(() => {
    setFormOpen(isFormOpen && width > 767);
  }, [width]);

  useEffect(() => {
    setLockedBodyScroll(!isSubmitted && isFormOpen && width <= 768);
  }, [isFormOpen, setLockedBodyScroll, width, isSubmitted]);

  const listener = (event: any) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      // onSubmit(event);
    }
  };

  return (
    <div
      className={cx('flex flex-col border border-gray-900 p-4', wrapperClass)}
    >
      {!isSubmitted ? (
        <>
          <div
            className="text-md mb-4 md:text-lg md:px-4 md:pt-4"
            id="form-title"
          >
            {title}
          </div>
          <button
            onClick={() => setFormOpen(true)}
            className={cx(
              'flex items-center justify-center text-center py-2 px-4 bg-gray-900 text-white uppercase text-sm md:mx-4 md:mb-4',
              { hidden: isFormOpen }
            )}
            aria-labelledby="form-title"
          >
            {buttonText}
          </button>
          {isFormOpen && (
            <form
              onSubmit={onSubmit}
              className="fixed flex flex-col top-0 right-0 bottom-0 left-0 bg-white z-40 md:z-0 md:relative"
              onKeyDown={listener}
              tabIndex={0}
            >
              {/* HEADER */}
              <div className="flex border-b border-gray-900 justify-between items-center md:hidden">
                <span className="pl-4">{title}</span>
                <button className="p-4" onClick={() => setFormOpen(false)}>
                  <CloseIcon />
                </button>
              </div>
              {/* BODY */}

              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pt-0">
                <div className="text-xs text-gray-universal-70 pt-4 md:pt-0">
                  {t('required_fields')} (<span className="text-error">*</span>
                  ).
                </div>
                {children}
              </div>
            </form>
          )}
        </>
      ) : (
        <FormSubmittedComponent
          successTitle={successTitle}
          successMessage={successMessage}
          errorMessage={errorMessage}
          onBackToFormClick={onReset}
        />
      )}
    </div>
  );
};

export default FormContainer;
