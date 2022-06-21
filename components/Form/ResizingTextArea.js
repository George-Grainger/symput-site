import ErrorMessage from './ErrorMessage';
import { forwardRef, useLayoutEffect, useRef } from 'react';

const ResizingTextArea = forwardRef(
  (
    {
      label,
      className = 'input',
      labelclassname = '',
      parentClassName = '',
      name,
      errors,
      defaultValue,
      value,
      ...register
    },
    ref
  ) => {
    const parentRef = useRef(null);

    useLayoutEffect(() => {
      // Reset height - important to shrink on delete
      parentRef.current.firstChild.style.height = 'inherit';
      // Set height
      parentRef.current.firstChild.style.height = `${parentRef.current.firstChild.scrollHeight}px`;
    }, [value]);

    return (
      <>
        <label htmlFor={name} className={labelclassname}>
          {label}
        </label>
        <div ref={parentRef} className={parentClassName}>
          <textarea
            style={{
              resize: 'none'
            }}
            aria-invalid={errors.name ? 'true' : 'false'}
            defaultValue={defaultValue}
            name={name}
            className={`${className}`}
            errors=""
            {...register}
            ref={ref}
          />
        </div>
        <ErrorMessage error={errors[name]} />
      </>
    );
  }
);

ResizingTextArea.displayName = 'ResizingTextArea';

export default ResizingTextArea;
