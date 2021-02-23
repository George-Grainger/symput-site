import Image from 'next/image';
import { auth, facebookAuthProvider } from '@/lib/firebase';

// Sign in with Facebook button
const SignInWithFacebookButton = () => {
  const signInWithFacebook = async () => {
    auth
      .signInWithPopup(facebookAuthProvider)
      .then((authUser) => {
        console.log(authUser.user.emailVerified);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      className="btn bg-blue-600 text-white flex items-center py-4 md:mb-3"
      onClick={signInWithFacebook}
    >
      <Image src={'/facebook.png'} width="30" height="30" />
      <span className="ml-4">Facebook</span>
    </button>
  );
};
export default SignInWithFacebookButton;
