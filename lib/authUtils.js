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

export const getProvider = (providerData) => {
  console.log(providerData[0]?.providerId);
  switch (providerData[0]?.providerId) {
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
  const credential = emailAuthProvider.credential(
    auth?.currentUser?.email,
    password
  );
  const isValid = await auth?.currentUser
    ?.reauthenticateWithCredential(credential)
    .then(function () {
      return true;
    })
    .catch(function () {
      return false;
    });
  return isValid;
};
