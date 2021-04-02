import { revalidateUser } from '@/lib/authUtils';
import { ErrorsContext, UserContext } from '@/lib/context';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';

const PasswordAccountDeleteForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState: { isSubmitting }
  } = useForm();
  const { signInErrors_i18n, genericErrors_i18n } = useContext(ErrorsContext);
  const { user } = useContext(UserContext);

  const handlePasswordReauth = async ({ verifypassword }) => {
    revalidateUser(verifypassword).then((isValid) => {
      if (isValid) {
        user?.delete();
      } else {
        setError('verifypassword', {
          type: 'auth/incorrect-details',
          message: genericErrors_i18n.passwordIncorrect_i18n
        });
      }
    });
  };

  return (
    <form
      className="grid gap-4 text-left"
      onSubmit={handleSubmit(handlePasswordReauth)}
    >
      <Input
        className="input-bg-toggle mb-4"
        labelclassname="font-semibold text-lg required"
        label="Password"
        errors={errors}
        name="verifypassword"
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

      <input
        className="btn btn-red"
        disabled={isSubmitting}
        type="submit"
        value="Delete my account"
      />
    </form>
  );
};

export default PasswordAccountDeleteForm;
