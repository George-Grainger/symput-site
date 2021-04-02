import { revalidateUser } from '@/lib/authUtils';
import { ErrorsContext, UserContext } from '@/lib/context';
import { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from './Input';

const UpdatePasswordForm = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    watch,
    reset,
    formState: { isSubmitting }
  } = useForm();
  const { signInErrors_i18n, genericErrors_i18n } = useContext(ErrorsContext);
  const { user } = useContext(UserContext);

  const handlePasswordReauth = async ({ verifypassword, newpassword }) => {
    revalidateUser(verifypassword).then((isValid) => {
      if (isValid) {
        toast
          .promise(user.updatePassword(newpassword), {
            loading: 'updating',
            success: 'Password updated',
            error: "Password couldn't be upated, please try again."
          })
          .then(reset())
          .then(closeModal);
      } else {
        setError('verifypassword', {
          type: 'auth/incorrect-details',
          message: genericErrors_i18n.passwordIncorrect_i18n
        });
      }
    });
  };

  const password = useRef({});
  password.current = watch('newpassword', '');

  return (
    <form
      className="grid gap-4 text-left"
      onSubmit={handleSubmit(handlePasswordReauth)}
    >
      <Input
        className="input-bg-toggle mb-4"
        labelclassname="font-semibold text-lg required"
        label="Previous password"
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

      <Input
        className="input-bg-toggle mb-4"
        labelclassname="font-semibold text-lg required"
        label="New password"
        errors={errors}
        name="newpassword"
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
        className="input-bg-toggle mb-4"
        labelclassname="font-semibold text-lg required"
        label="Repeat new password"
        errors={errors}
        name="newpassword_repeat"
        type="password"
        placeholder="••••••••••••"
        ref={register({
          validate: (value) =>
            value === password.current || signInErrors_i18n.passwordMatch_i18n
        })}
      />

      <input
        className="btn btn-yellow"
        disabled={isSubmitting}
        type="submit"
        value="Update password"
      />
    </form>
  );
};

export default UpdatePasswordForm;
