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
  } else if (error) {
    return <ErrorMessage error={error} />;
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
