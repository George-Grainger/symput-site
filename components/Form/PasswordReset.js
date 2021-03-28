import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { auth } from '@/lib/firebase';
import ButtonEllipsis from '../Loading/ButtonEllipsis';
import { SignInContext } from '@/lib/context';

const PasswordReset = ({ email, handleReturn }) => {
  const { loginPage_i18n } = useContext(SignInContext);
  const { email_i18n, resetLink_i18n, goBack_i18n } = loginPage_i18n;
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    setSending(true);
    auth
      .sendPasswordResetEmail(data.resetemail)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setError('resetemail', { type: error.code, message: error.message });
        setSending(false);
      });
  };

  return (
    <>
      {success ? (
        // TODO change this page
        <div>Success</div>
      ) : (
        <form
          className="grid gap-4 text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label={email_i18n}
            errors={errors}
            defaultValue={email}
            name="resetemail"
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
          />

          <button
            type="submit"
            className="btn btn-yellow my-4"
            disabled={isSubmitting}
          >
            {sending ? <ButtonEllipsis /> : resetLink_i18n}
          </button>

          <a
            onClick={handleReturn}
            className="link link-dark-bg justify-self-center p-2 underline"
          >
            {goBack_i18n}
          </a>
        </form>
      )}
    </>
  );
};

export default PasswordReset;
