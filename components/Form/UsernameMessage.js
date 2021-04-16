import ErrorMessage from './ErrorMessage';
import { useContext } from 'react';
import { ErrorsContext } from '@/lib/context';

const UsernameMessage = ({ username, isValid, loading, error }) => {
  const { usernameErrors_i18n } = useContext(ErrorsContext);
  if (username.length >= 19 && loading) {
    return (
      <p role="alert" className="text-yellow-400 text-center">
        {usernameErrors_i18n.nearLim_i18n}
      </p>
    );
  } else if (loading) {
    return (
      <p role="alert" className="text-yellow-400 text-center">
        {usernameErrors_i18n.checking_i18n}
      </p>
    );
  }
  if (!isValid && username.length > 2) {
    return (
      <ErrorMessage
        className="text-center"
        error={{
          type: 'already-in-use',
          message: usernameErrors_i18n.inUse_i18n
        }}
      />
    );
  } else if (isValid) {
    return (
      <p role="alert" className="text-green-500 text-center">
        {username} {usernameErrors_i18n.isAvailable_i18n}
      </p>
    );
  } else if (error) {
    return <ErrorMessage className="text-center" error={error} />;
  } else {
    return <p>&nbsp;</p>;
  }
};

export default UsernameMessage;
