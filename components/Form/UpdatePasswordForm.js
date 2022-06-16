import { revalidateUser } from '@/lib/authUtils';
import { AdminContext, ErrorsContext, UserContext } from '@/lib/context';
import { updatePassword } from 'firebase/auth';
import { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from './Input';

const UpdatePasswordForm = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,

    formState: { isSubmitting, errors }
  } = useForm({
    reValidateMode: 'onSubmit'
  });
  const { signInErrors_i18n, genericErrors_i18n } = useContext(ErrorsContext);
  const { accountPopups_i18n } = useContext(AdminContext);
  const { user } = useContext(UserContext);

  const handlePasswordReauth = async ({ verifypassword, newpassword }) => {
    revalidateUser(verifypassword).then((isValid) => {
      if (isValid) {
        toast
          .promise(updatePassword(user, newpassword), {
            loading: accountPopups_i18n.passwordUpdating_i18n,
            success: accountPopups_i18n.passwordUpdated_i18n,
            error: accountPopups_i18n.error
          })
          .then(reset())
          .then(closeModal)
          .catch((e) => console.log(e));
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
        label={accountPopups_i18n.previousPassword_i18n}
        errors={errors}
        {...register('verifypassword', {
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
        type="password"
        placeholder="••••••••••••"
      />

      <Input
        className="input-bg-toggle mb-4"
        labelclassname="font-semibold text-lg required"
        label={accountPopups_i18n.newPassword_i18n}
        errors={errors}
        {...register('newpassword', {
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
        type="password"
        placeholder="••••••••••••"
      />

      <Input
        className="input-bg-toggle mb-4"
        labelclassname="font-semibold text-lg required"
        label={accountPopups_i18n.repeatPassword_i18n}
        errors={errors}
        {...register('newpassword_repeat', {
          validate: (value) =>
            value === password.current || signInErrors_i18n.passwordMatch_i18n
        })}
        type="password"
        placeholder="••••••••••••"
      />

      <input
        className="btn btn-yellow"
        disabled={isSubmitting}
        type="submit"
        value={accountPopups_i18n.updatePassword_i18n}
      />
    </form>
  );
};

export default UpdatePasswordForm;
