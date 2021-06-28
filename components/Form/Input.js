import { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

const Input = forwardRef((props, ref) => {
  const {
    label,
    className = 'input',
    labelclassname = 'required',
    name,
    errors
  } = props;
  return (
    <div className="grid gap-1">
      <label htmlFor={name} className={labelclassname}>
        {label}
      </label>
      <input {...props} className={`${className}`} errors="" ref={ref} />
      <ErrorMessage error={errors[name]} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
