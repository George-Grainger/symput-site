import { useState } from 'react';
import SignInWithGoogleButton from './SignInWithGoogle';
import SignInWithGitHubButton from './SignInWithGithub';
import SignInForm from '@/components/Form/SignInForm';
import SignUpForm from '@/components/Form/SignUpForm';
import PasswordReset from '../Form/PasswordReset';
import SignInWithFacebookButton from './SignInWithFacebook';
import SignInWithTwitterButton from './SignInWithTwitter';

const Login = () => {
  const [openTab, setOpenTab] = useState(1);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handlePasswordReset = (passedInEmail) => {
    setEmail(passedInEmail);
    setResettingPassword(true);
  };

  const handleTabChange = (tab) => {
    if (resettingPassword) {
      setResettingPassword(false);
    }
    setOpenTab(tab);
  };
  return (
    <section className="py-24 px-8 w-full flex justify-center items-center bg-yellow-400 dark:bg-gray-600 transition-colors duration-300">
      <div className="grid md:grid-cols-2 gap-x-10 z-10 card bg-gray-900 text-white">
        <h1 className="md:col-span-2 text-3xl font-semibold w-full">Welcome</h1>
        <hr className="md:col-span-2 my-6 border-b-1 border-gray-200" />
        <div className="grid grid-cols-1 gap-4 justify-center content-start">
          <h2 className="col-span-1 font-bold">Sign in with</h2>
          <SignInWithGoogleButton />
          <SignInWithTwitterButton />
          <SignInWithFacebookButton />
          <SignInWithGitHubButton />
        </div>
        <div>
          <hr className="my-6 border-b-1 border-gray-200  md:border-0 md:my-0" />
          <div className="flex flex-wrap">
            <h2 className="w-full col-span-2 font-bold">
              Or through credentials
            </h2>
            <ul className="flex w-full py-4" role="tablist">
              <li className="flex-auto pr-6">
                <button
                  className={
                    'btn w-full ' +
                    (openTab === 1 ? 'btn-yellow' : 'btn-yellow-inverted')
                  }
                  onClick={() => {
                    handleTabChange(1);
                  }}
                  data-toggle="tab"
                  role="tablist"
                >
                  Sign in
                </button>
              </li>
              <li className="flex-auto">
                <button
                  className={
                    'btn w-full ' +
                    (openTab === 2 ? 'btn-yellow' : 'btn-yellow-inverted')
                  }
                  onClick={() => {
                    handleTabChange(2);
                  }}
                  data-toggle="tab"
                  role="tablist"
                >
                  Sign up
                </button>
              </li>
            </ul>
          </div>

          <div className={resettingPassword ? 'block' : 'hidden'}>
            <PasswordReset email={email} />
          </div>
          <div
            className={openTab === 1 && !resettingPassword ? 'block' : 'hidden'}
          >
            <SignInForm handlePasswordReset={handlePasswordReset} />
          </div>
          <div
            className={openTab === 2 && !resettingPassword ? 'block' : 'hidden'}
          >
            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
