import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider
} from '@/lib/firebase';

export const signInWithFacebook = async () => {
  auth
    .signInWithPopup(facebookAuthProvider)
    .then((authUser) => {
      console.log(authUser.user.emailVerified);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signInWithGitHub = async () => {
  auth
    .signInWithPopup(githubAuthProvider)
    .then((authUser) => {
      console.log(authUser.user.emailVerified);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signInWithGoogle = async () => {
  auth
    .signInWithPopup(googleAuthProvider)
    .then((authUser) => {
      console.log(authUser.user.emailVerified);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signInWithTwitter = async () => {
  try {
    await auth.signInWithPopup(twitterAuthProvider);
  } catch (err) {
    console.log(err);
  }
};
