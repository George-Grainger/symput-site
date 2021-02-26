import ErrorMessage from './ErrorMessage';

const UsernameMessage = ({ username, isValid, loading, error }) => {
  if (username.length >= 19 && loading) {
    return (
      <p role="alert" className="text-yellow-400 text-center">
        20 characters is the max limit - checking...
      </p>
    );
  } else if (loading) {
    return (
      <p role="alert" className="text-yellow-400 text-center">
        Checking...
      </p>
    );
  }
  if (!isValid && username.length > 2) {
    return (
      <ErrorMessage
        className="text-center"
        error={{
          type: 'already-in-use',
          message: 'Username is already in use'
        }}
      />
    );
  } else if (error) {
    return <ErrorMessage className="text-center" error={error} />;
  } else if (isValid) {
    return (
      <p role="alert" className="text-green-500 text-center">
        {username} is available
      </p>
    );
  } else {
    return <p>&nbsp;</p>;
  }
};

export default UsernameMessage;
