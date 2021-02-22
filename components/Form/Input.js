import { forwardRef } from 'react';
import ErrorMessage from './errorMessage';

const Input = forwardRef((props, ref) => {
  const { label, className = '', name, errors, required } = props;
  return (
    <div className="grid gap-1">
      <label className={required ? 'required' : 'required'}>{label}</label>
      <input className={`${className} input`} {...props} errors="" ref={ref} />
      <ErrorMessage error={errors[name]} />
    </div>
  );
});

export default Input;
