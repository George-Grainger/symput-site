import Image from 'next/image';
import { auth, twitterAuthProvider } from '@/lib/firebase';

// Sign in with Twitter button
const SignInWithTwitterButton = () => {
  const signInWithTwitter = async () => {
    try {
      await auth.signInWithPopup(twitterAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="btn bg-blue-400 text-white flex items-center py-4 md:mb-3"
      onClick={signInWithTwitter}
    >
      <Image src={'/twitter.png'} width="30" height="30" />
      <span className="ml-4">Twitter</span>
    </button>
  );
};
export default SignInWithTwitterButton;
