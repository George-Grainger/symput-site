import { useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { auth } from '@/lib/authUtils';
import toast from 'react-hot-toast';
import { SignInContext, ErrorsContext } from '@/lib/context';

const SignUpForm = () => {
  const { loginPage_i18n } = useContext(SignInContext);
  const {
    email_i18n,
    emailEG_i18n,
    password_i18n,
    signUp_i18n,
    repeatPassword_i18n,
    signUpSuccess_i18n
  } = loginPage_i18n;
  const { signInErrors_i18n } = useContext(ErrorsContext);

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
      .then(() => {
        toast.success(signUpSuccess_i18n);
      })
      .catch((error) => {
        setError('suemail', { type: error.code, message: error.message });
      });
  };

  return (
    <form className="grid gap-4 text-left" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={email_i18n}
        errors={errors}
        placeholder={emailEG_i18n}
        name="suemail"
        ref={register({
          required: true,
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: signInErrors_i18n.validEmail_i18n
          }
        })}
      />
      <Input
        label={password_i18n}
        errors={errors}
        name="supassword"
        type="password"
        placeholder="••••••••••••"
        ref={register({
          required: true,
          minLength: {
            value: 8,
            message: signInErrors_i18n.minLength_i18n
          },
          maxLength: {
            value: 40,
            message: signInErrors_i18n.maxLength_i18n
          }
        })}
      />
      <Input
        label={repeatPassword_i18n}
        errors={errors}
        name="supassword_repeat"
        type="password"
        placeholder="••••••••••••"
        ref={register({
          validate: (value) =>
            value === password.current || signInErrors_i18n.passwordMatch_i18n
        })}
      />

      <input
        className="btn btn-yellow mt-4"
        disabled={isSubmitting}
        type="submit"
        value={signUp_i18n}
      />
    </form>
  );
};

export default SignUpForm;
