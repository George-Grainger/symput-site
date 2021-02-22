import Image from 'next/image';
import { auth, githubAuthProvider } from '@/lib/firebase';

// Sign in with Github button
const SignInWithGitHubButton = () => {
  const signInWithGitHub = async () => {
    try {
      await auth.signInWithPopup(githubAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="btn bg-white text-black flex items-center py-4 md:mb-3"
      onClick={signInWithGitHub}
    >
      <Image src={'/github.png'} width="30" height="30" />
      <span className="ml-4">GitHub</span>
    </button>
  );
};
export default SignInWithGitHubButton;
