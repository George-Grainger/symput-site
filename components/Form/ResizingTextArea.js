import { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';
import { useRef, useEffect, useState } from 'react';

const ResizingTextArea = forwardRef(
  (
    {
      label,
      className = 'input',
      labelclassname = '',
      parentClassName = '',
      name,
      errors,
      defaultValue
    },
    ref
  ) => {
    const parentRef = useRef(null);
    const [parentHeight, setParentHeight] = useState('auto');
    const [textAreaHeight, setTextAreaHeight] = useState('auto');

    useEffect(() => {
      setParentHeight(`${parentRef.current.firstChild.scrollHeight}px`);
      setTextAreaHeight(`${parentRef.current.firstChild.scrollHeight}px`);
    }, [textAreaHeight]);

    return (
      <>
        <label htmlFor={name} className={labelclassname}>
          {label}
        </label>
        <div
          ref={parentRef}
          style={{ minHeight: parentHeight }}
          className={parentClassName}
        >
          <textarea
            style={{
              height: textAreaHeight,
              resize: 'none'
            }}
            aria-invalid={errors.name ? 'true' : 'false'}
            defaultValue={defaultValue}
            name={name}
            className={`${className}`}
            errors=""
            ref={ref}
            onChange={() => setTextAreaHeight('auto')}
          />
        </div>
        <ErrorMessage error={errors[name]} />
      </>
    );
  }
);

ResizingTextArea.displayName = 'ResizingTextArea';

export default ResizingTextArea;
