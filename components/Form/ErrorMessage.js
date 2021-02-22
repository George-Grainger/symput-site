export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case 'required':
        return (
          <p role="alert" className="form-error">
            This is required
          </p>
        );
      case 'minLength':
        return (
          <p role="alert" className="form-error">
            Your password need minmium 8 charcaters
          </p>
        );
      case 'pattern':
        return (
          <p role="alert" className="form-error">
            Enter a valid email address
          </p>
        );
      case 'auth/user-not-found':
        return (
          <p role="alert" className="form-error">
            No account using that email exists
          </p>
        );
      case 'auth/user-not-found':
        return (
          <p role="alert" className="form-error">
            No account using that email exists
          </p>
        );
      case 'auth/auth/wrong-password':
        return (
          <p role="alert" className="form-error">
            Incorrect password
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
