import { getProvider, revalidateUser } from '@/lib/authUtils';
import { ErrorsContext, UserContext } from '@/lib/context';
import { useAsync } from '@/lib/useAsync';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ButtonEllipsis from '../Loading/ButtonEllipsis';
import Input from './Input';

const UpdateEmailForm = ({ closeModal, providerId, setEmail }) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    reset,
    formState: { isSubmitting }
  } = useForm();
  const { signInErrors_i18n, genericErrors_i18n } = useContext(ErrorsContext);
  const { user } = useContext(UserContext);
  const [, doRefresh] = useState(null);

  const handlePasswordReauth = async ({ verifypassword, newemail }) => {
    console.log(verifypassword, newemail);
    let isValid = false;
    if (providerId === 'password') {
      isValid = await revalidateUser(verifypassword);
    } else {
      isValid = true;
    }

    if (isValid) {
      toast
        .promise(user.updateEmail(newemail), {
          loading: 'updating',
          success: 'Email updated',
          error: "Email couldn't be upated, please try again."
        })
        .then(() => {
          setEmail(newemail);
          reset();
          closeModal();
        })
        .catch((e) => {
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
      ) : (
        <ReauthButton providerId={providerId} />
      )}

      <Input
        className="input-bg-toggle mb-4"
        labelclassname="font-semibold text-lg required"
        label="New email"
        errors={errors}
        placeholder="user@email.com"
        name="newemail"
        ref={register({
          required: true,
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: signInErrors_i18n.validEmail_i18n
          }
        })}
      />

      <input
        className="btn btn-yellow"
        disabled={isSubmitting}
        type="submit"
        value="Update email"
      />
    </form>
  );
};

export default UpdateEmailForm;

const ReauthButton = ({ providerId }) => {
  const { user } = useContext(UserContext);
  const { loading, error, result, execute } = useAsync({
    asyncFunction: async () =>
      user?.reauthenticateWithPopup(getProvider(providerId))
  });

  if (result) {
    return (
      <div className="text-center font-bold py-3 px-6 rounded shadow-md cursor-default bg-green-500 text-white mb-4">
        Verified
      </div>
    );
  } else if (loading) {
    return (
      <div className="bg-transparent border border-solid border-gray-900 py-3 px-6 rounded mb-4">
        <ButtonEllipsis />
      </div>
    );
  } else if (error) {
    return (
      <button onClick={execute} className="btn btn-red w-full mb-4">
        An error occured please try again
      </button>
    );
  } else {
    return (
      <button
        onClick={execute}
        className="btn btn-black-inverted dark:btn-yellow-inverted w-full mb-4"
      >
        Verify through auth provider
      </button>
    );
  }
};
