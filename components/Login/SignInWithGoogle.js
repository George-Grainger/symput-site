import Image from 'next/image';
import { auth, googleAuthProvider } from '@/lib/firebase';

// Sign in with Google button
const SignInWithGoogleButton = () => {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch {}
  };

  return (
    <button
      className="btn bg-white text-black flex items-center py-4 md:mb-3"
      onClick={signInWithGoogle}
    >
      <Image src={'/google.png'} width="30" height="30" />
      <span className="ml-4">Google</span>
    </button>
  );
};
export default SignInWithGoogleButton;
