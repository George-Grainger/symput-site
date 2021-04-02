import { useContext } from 'react';
import { ErrorsContext } from '@/lib/context';

export default function ErrorMessage({ error, className = '' }) {
  const { genericErrors_i18n } = useContext(ErrorsContext);
  const {
    required_i18n,
    signInFailure_i18n,
    alreadyExists_i18n
  } = genericErrors_i18n;

  const errorCases = (error) => {
    switch (error.type) {
      case 'required':
        return required_i18n;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return signInFailure_i18n;
      case 'auth/account-exists-with-different-credential':
        return alreadyExists_i18n;
      case 'auth/requires-recent-login':
        return 'You must reauthenticate before this operation can be done.';
      default:
        return error.message;
    }
  };

  if (error) {
    return (
      <p role="alert" className={`${className} form-error`}>
        {errorCases(error)}
      </p>
    );
  }

  return null;
}
