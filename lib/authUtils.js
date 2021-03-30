import firebase from '@/lib/firebase';

// Auth exports
export const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const emailAuthProvider = firebase.auth.EmailAuthProvider;

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
