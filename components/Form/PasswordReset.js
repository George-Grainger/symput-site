import { useForm } from 'react-hook-form';
import Input from './Input';
import { auth } from '@/lib/firebase';

const PasswordReset = ({ email }) => {
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    auth
      .sendPasswordResetEmail(data.resetemail)
      .then(console.log('sucess'))
      .catch((error) => {
        setError('resetemail', { type: error.code, message: error.message });
      });
  };

  return (
    <form className="grid gap-4 text-left" onSubmit={handleSubmit(onSubmit)}>
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

      <input
        className="btn btn-yellow my-4"
        disabled={isSubmitting}
        type="submit"
        value="Send reset link"
      />
    </form>
  );
};

export default PasswordReset;
