export default function ErrorMessage({ error }) {
  if (error) {
    switch (error.type) {
      case 'auth/user-not-found':
      case 'auth/auth/wrong-password':
        return (
          <p role="alert" className="form-error">
            Incorrect username or password
          </p>
        );
      case 'auth/account-exists-with-different-credential':
        return (
          <p role="alert" className="form-error">
            This user already exists, sign in or reset your password.
          </p>
        );
      default:
        return (
          <p role="alert" className="form-error">
            {error.message}
          </p>
        );
    }
  }

  return null;
}
