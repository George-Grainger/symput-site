import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider
} from '@/lib/firebase';

export const signInWithFacebook = async () => {
  return auth.signInWithPopup(facebookAuthProvider);
};

export const signInWithGitHub = async () => {
  return auth.signInWithPopup(githubAuthProvider);
};

export const signInWithGoogle = async () => {
  return auth.signInWithPopup(googleAuthProvider);
};

export const signInWithTwitter = async () => {
  return auth.signInWithPopup(twitterAuthProvider);
};
