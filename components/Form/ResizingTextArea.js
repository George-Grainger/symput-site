import { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';
import { useRef, useEffect, useState } from 'react';

const ResizingTextArea = forwardRef((props, ref) => {
  const {
    label,
    className = 'input',
    labelclassname = '',
    parentClassName = '',
    name,
    errors
  } = props;

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
});

export default ResizingTextArea;
