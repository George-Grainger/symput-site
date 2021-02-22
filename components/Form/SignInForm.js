import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { auth } from '@/lib/firebase';

const SignInForm = ({ handlePasswordReset }) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const email = useRef({});
  email.current = watch('siemail');

  const onSubmit = async (data) => {
    auth
      .signInWithEmailAndPassword(data.siemail, data.sipassword)
      .then(console.log('sucess'))
      .catch((error) => {
        setError('siepassword', { type: error.code, message: error.message });
      });
  };

  return (
    <form className="grid gap-4 text-left" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        errors={errors}
        placeholder="your@email.com"
        name="siemail"
        ref={register({
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        })}
      />
      <Input
        label="Password"
        errors={errors}
        name="sipassword"
        type="password"
        ref={register({
          required: true,
          minLength: 8
        })}
      />

      <input
        className="btn btn-yellow my-4"
        disabled={isSubmitting}
        type="submit"
        value="Sign in"
      />

      <a
        onClick={() => handlePasswordReset(email.current)}
        className="text-white underline text-center cursor-pointer hover:text-yellow-400"
      >
        Forgotton your password?
      </a>
    </form>
  );
};

export default SignInForm;
