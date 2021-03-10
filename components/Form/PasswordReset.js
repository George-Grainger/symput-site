import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { auth } from '@/lib/firebase';
import Ellipsis from '../Loading/Ellipsis';

const PasswordReset = ({ email, handleReturn }) => {
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
        <div>Success</div>
      ) : (
        <form
          className="grid gap-4 text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Email"
            errors={errors}
            defaultValue={email}
            name="resetemail"
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
          />

          {sending ? (
            <Ellipsis />
          ) : (
            <input
              className="btn btn-yellow my-4"
              disabled={isSubmitting}
              type="submit"
              value="Send reset link"
            />
          )}

          <a
            onClick={handleReturn}
            className="link-dark-bg justify-self-center p-2 underline"
          >
            Go back
          </a>
        </form>
      )}
    </>
  );
};

export default PasswordReset;
