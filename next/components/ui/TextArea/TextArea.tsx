import cx from 'classnames';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  labelContent?: string;
  helpText?: string;
  hasError?: boolean;
  errorMessage?: string;
  textAreaClassname?: string;
}

export const TextArea = ({
  className,
  children,
  labelContent,
  helpText,
  id,
  hasError = false,
  errorMessage,
  textAreaClassname,
  required,
  ...props
}: TextAreaProps) => {
  return (
    <div className={className}>
      {/* Label */}
      {labelContent && (
        <label
          className={cx('text-xs text-gray-universal-100 mb-0.5 opacity-80')}
          htmlFor={id}
        >
          {labelContent}
          {required && <span className="text-error pl-1">*</span>}
        </label>
      )}
      <div>
        <textarea
          id={id}
          className={cx('base-input resize-none', textAreaClassname, {
            'base-input--with-error': hasError,
          })}
          aria-invalid={hasError}
          aria-required={required}
          aria-errormessage={errorMessage ? id + '_err' : null}
          {...props}
        >
          {children}
        </textarea>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <p
          id={id + '_err'}
          className={cx('text-xs text-error mt-2', { hidden: !hasError })}
          aria-labelledby={id}
        >
          {labelContent} {errorMessage}
        </p>
      )}

      {/* Help Text */}
      {helpText && (
        <p
          className={cx('text-xs mt-0.5 opacity-80', {
            'text-gray-universal-70': !hasError,
            'text-error': hasError,
          })}
        >
          {helpText}
        </p>
      )}
    </div>
  );
};
