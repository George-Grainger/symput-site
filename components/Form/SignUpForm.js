import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from './Input';
import { auth } from '@/lib/firebase';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const password = useRef({});
  password.current = watch('supassword', '');

  const onSubmit = async (data) => {
    auth
      .createUserWithEmailAndPassword(data.suemail, data.supassword)
      .then(console.log('sucess'))
      .catch((error) => {
        setError('sueemail', { type: error.code, message: error.message });
      });
  };

  return (
    <form className="grid gap-4 text-left" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label="Email"
        errors={errors}
        placeholder="your@email.com"
        name="suemail"
        required
        ref={register({
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        })}
      />
      <CustomInput
        label="Password"
        errors={errors}
        name="supassword"
        type="password"
        required
        ref={register({
          required: true,
          minLength: 8
        })}
      />
      <CustomInput
        label="Repeat password"
        errors={errors}
        name="supassword_repeat"
        type="password"
        required
        ref={register({
          validate: (value) =>
            value === password.current || 'The passwords do not match'
        })}
      />

      <input
        className="btn btn-yellow mt-4"
        disabled={isSubmitting}
        type="submit"
        value="Sign up"
      />
    </form>
  );
};

export default SignInForm;
