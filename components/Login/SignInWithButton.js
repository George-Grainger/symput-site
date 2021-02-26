import Image from 'next/image';
import toast from 'react-hot-toast';

const SignInWithButton = ({
  callback,
  title,
  imgSrc,
  className = 'text-black bg-white'
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
      className={`btn ${className} flex items-center py-4 md:mb-3`}
      onClick={handleCallback}
    >
      <Image src={imgSrc} width="30" height="30" />
      <span className="ml-4">{title}</span>
    </button>
  );
};
export default SignInWithButton;
