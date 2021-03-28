import { useForm } from 'react-hook-form';
import Input from './Input';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { SignInContext, ErrorsContext } from '@/lib/context';
import { useContext } from 'react';

const SignInForm = ({ handlePasswordReset }) => {
  const { loginPage_i18n } = useContext(SignInContext);
  const {
    email_i18n,
    emailEG_i18n,
    password_i18n,
    reminder_i18n,
    signIn_i18n,
    signInSuccess_i18n
  } = loginPage_i18n;
  const { usernameErrors_i18n } = useContext(ErrorsContext);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    auth
      .signInWithEmailAndPassword(data.siemail, data.sipassword)
      .then(() => {
        toast.success(signInSuccess_i18n);
      })
      .catch((error) => {
        setError('sipassword', { type: error.code, message: error.message });
      });
  };

  return (
    <form className="grid gap-4 text-left" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={email_i18n}
        errors={errors}
        placeholder={emailEG_i18n}
        name="siemail"
        isrequried="true"
        ref={register({
          required: true,
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: usernameErrors_i18n.validEmail_i18n
          }
        })}
      />
      <Input
        label={password_i18n}
        errors={errors}
        name="sipassword"
        type="password"
        isrequried="true"
        ref={register({
          required: true,
          minLength: {
            value: 8,
            message: usernameErrors_i18n.minLength_i18n
          },
          maxLength: {
            value: 40,
            message: usernameErrors_i18n.maxLength_i18n
          }
        })}
      />

      <input
        className="btn btn-yellow my-4"
        disabled={isSubmitting}
        type="submit"
        value={signIn_i18n}
      />

      <a
        onClick={() => handlePasswordReset(getValues('siemail'))}
        className="link link-dark-bg justify-self-center p-2 underline"
      >
        {reminder_i18n}
      </a>
    </form>
  );
};

export default SignInForm;
