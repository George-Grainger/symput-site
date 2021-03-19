import { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

const Input = forwardRef((props, ref) => {
  const {
    label,
    className = 'input',
    labelclassname = '',
    name,
    errors,
    isrequried = 'false'
  } = props;
  return (
    <div className="grid gap-1">
      <label className={`${isrequried ? 'required' : ''} ${labelclassname}`}>
        {label}
      </label>
      <input {...props} className={`${className}`} errors="" ref={ref} />
      <ErrorMessage error={errors[name]} />
    </div>
  );
});

export default Input;
