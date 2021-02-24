import Image from 'next/image';

const SignInWithButton = ({
  callback,
  title,
  imgSrc,
  className = 'text-black bg-white'
}) => {
  return (
    <button
      aria-label={`Sign in with ${title}`}
      className={`btn ${className} flex items-center py-4 md:mb-3`}
      onClick={callback}
    >
      <Image src={imgSrc} width="30" height="30" />
      <span className="ml-4">{title}</span>
    </button>
  );
};
export default SignInWithButton;
