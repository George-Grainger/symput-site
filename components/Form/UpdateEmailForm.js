import { getProvider, revalidateUser } from '@/lib/authUtils';
import { AdminContext, ErrorsContext, UserContext } from '@/lib/context';
import { useAsync } from '@/lib/useAsync';
import { reauthenticateWithPopup, updateEmail } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ButtonEllipsis from '../Loading/ButtonEllipsis';
import Input from './Input';

const UpdateEmailForm = ({ closeModal, providerId, setEmail }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,

    formState: { isSubmitting, errors }
  } = useForm();
  const { signInErrors_i18n, genericErrors_i18n } = useContext(ErrorsContext);
  const { accountPopups_i18n } = useContext(AdminContext);
  const { user } = useContext(UserContext);
  const [, doRefresh] = useState(null);

  const handlePasswordReauth = async ({ verifypassword, newemail }) => {
    let isValid = false;
    if (providerId === 'password') {
      isValid = await revalidateUser(verifypassword);
    } else {
      isValid = true;
    }

    if (isValid) {
      toast
        .promise(updateEmail(user, newemail), {
          loading: accountPopups_i18n.emailUpdating_i18n,
          success: accountPopups_i18n.emailUpdated_i18n,
          error: accountPopups_i18n.error_i18n
        })
        .then(() => {
          setEmail(newemail);
          reset();
          closeModal();
        })
        .catch((e) => {
          console.log(e);
          setError('newemail', {
            type: e.code,
            message: e.message
          });
          doRefresh({});
        });
    } else {
      setError('verifypassword', {
        type: 'auth/incorrect-details',
        message: genericErrors_i18n.passwordIncorrect_i18n
      });
      doRefresh({});
    }
  };

  return (
    <form
      className="grid gap-4 text-left"
      onSubmit={handleSubmit(handlePasswordReauth)}
    >
      {providerId === 'password' ? (
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
      ) : (
        <ReauthButton providerId={providerId} />
      )}

      <Input
        className="input-bg-toggle mb-4"
        labelclassname="font-semibold text-lg required"
        label={accountPopups_i18n.newEmail_i18n}
        errors={errors}
        placeholder="user@email.com"
        {...register('newemail', {
          required: true,
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: signInErrors_i18n.validEmail_i18n
          }
        })}
      />

      <input
        className="btn btn-yellow"
        disabled={isSubmitting}
        type="submit"
        value={accountPopups_i18n.updateEmail_i18n}
      />
    </form>
  );
};

export default UpdateEmailForm;

const ReauthButton = ({ providerId }) => {
  const { user } = useContext(UserContext);
  const { accountSettings_i18n, accountPopups_i18n } = useContext(AdminContext);
  const { loading, error, result, execute } = useAsync({
    asyncFunction: async () =>
      reauthenticateWithPopup(user, getProvider(providerId))
  });

  if (result) {
    return (
      <div className="text-center font-bold py-3 px-6 rounded shadow-md cursor-default bg-green-500 text-white mb-4">
        {accountSettings_i18n.verfied_i18n}
      </div>
    );
  } else if (loading) {
    return (
      <div className="bg-transparent border border-solid border-gray-900 dark:border-white py-3 px-6 rounded mb-4">
        <ButtonEllipsis color="bg-gray-900 dark:bg-white" />
      </div>
    );
  } else if (error) {
    return (
      <button onClick={execute} className="btn btn-red w-full mb-4">
        {accountPopups_i18n.error_i18n}
      </button>
    );
  } else {
    return (
      <button
        onClick={execute}
        className="btn btn-black-inverted dark:btn-yellow-inverted w-full mb-4"
      >
        {accountPopups_i18n.verifyThroughAuth_i18n}
      </button>
    );
  }
};
