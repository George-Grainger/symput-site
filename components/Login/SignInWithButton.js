import toast from 'react-hot-toast';
import Icon from '../Icons/Icon';

const SignInWithButton = ({
  callback,
  title,
  icon,
  className = 'text-black bg-white hover:opacity-90'
}) => {
  const handleCallback = () =>
    toast.promise(callback(), {
      loading: 'Spinning cogs...',
      success: 'Account registered!',
      error: 'Uh oh, please try again.'
    });

  return (
    <button
      aria-label={`Sign in with ${title}`}
      className={`btn ${className} flex items-center h-14`}
      onClick={handleCallback}
    >
      {<Icon icon={icon} />}
      <span className="ml-4">{title}</span>
    </button>
  );
};
export default SignInWithButton;
