export default function ErrorMessage({ error, className = '' }) {
  if (error) {
    return (
      <p role="alert" className={`${className} form-error`}>
        {errorCases(error)}
      </p>
    );
  }

  return null;
}

const errorCases = (error) => {
  switch (error.type) {
    case 'required':
      return 'This is a required field';
    case 'auth/user-not-found':
    case 'auth/auth/wrong-password':
      return 'Incorrect username or password';
    case 'auth/account-exists-with-different-credential':
      return 'This user already exists, sign in or reset your password.';
    default:
      return error.message;
  }
};
