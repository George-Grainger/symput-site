import { useState, useContext } from 'react';
import { UserContext, SignInContext } from '@/lib/context';
import SignInForm from '@/components/Form/SignInForm';
import SignUpForm from '@/components/Form/SignUpForm';
import PasswordReset from '../Form/PasswordReset';
import SignInWithButton from './SignInWithButton';
import {
  signInWithFacebook,
  signInWithGitHub,
  signInWithGoogle,
  signInWithTwitter
} from '@/lib/authUtils';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import GoogleIcon from '../Icons/GoogleIcon';
import TwitterCircle from '../Icons/TwitterCircle';

const Login = () => {
  const { loginPage } = useContext(SignInContext);
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
    <div className="grid md:grid-cols-4 gap-x-10 z-10">
      <h1 className="md:col-span-4 text-3xl font-semibold w-full">Welcome</h1>
      <hr className="md:col-span-4 my-6 border-b-1 border-gray-200" />
      <div className="grid grid-cols-1 md:col-span-2 gap-1 justify-center content-start">
        <h2 className="col-span-1 font-bold mb-3">Sign in with</h2>
        <SignInWithButton
          callback={signInWithGoogle}
          title="Google"
          icon={<GoogleIcon className="h-8 w-8" />}
        />
        <SignInWithButton
          callback={signInWithTwitter}
          title="Twitter"
          icon={<TwitterCircle className="h-8 w-8" />}
          className="bg-blue-400 text-white hover:opacity-90"
        />
        <SignInWithButton
          callback={signInWithFacebook}
          title="Facebook"
          icon={<FaFacebook className="h-8 w-8" />}
          className="bg-blue-600 text-white hover:opacity-90"
        />
        <SignInWithButton
          callback={signInWithGitHub}
          title="GitHub"
          icon={<FaGithub className="h-8 w-8" />}
        />
      </div>
      <div className="md:col-span-2">
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
          <PasswordReset
            email={email}
            handleReturn={() => handleTabChange(1)}
          />
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
  );
};

export default Login;
