import { app } from '@/lib/firebase';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';

// Auth exports
export const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();

export const signInWithFacebook = async () => {
  return signInWithPopup(auth, facebookAuthProvider);
};

export const signInWithGitHub = async () => {
  return signInWithPopup(auth, githubAuthProvider);
};

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleAuthProvider);
};

export const signInWithTwitter = async () => {
  return signInWithPopup(auth, twitterAuthProvider);
};

export const getProvider = (providerId) => {
  switch (providerId) {
    case 'google.com':
      return googleAuthProvider;
    case 'github.com':
      return githubAuthProvider;
    case 'facebook.com':
      return facebookAuthProvider;
    case 'twitter.com':
      return twitterAuthProvider;
    default:
      return false;
  }
};

export const revalidateUser = async (password) => {
  const credential = EmailAuthProvider.credential(
    auth?.currentUser?.email,
    password
  );
  const isValid = reauthenticateWithCredential(auth.currentUser, credential)
    .then(function () {
      return true;
    })
    .catch(function (e) {
      console.log(e);
      return false;
    });
  return isValid;
};
