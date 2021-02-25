import { firestore } from '@/lib/firebase';

export const usernameExists = async (username) => {
  const ref = firestore.doc(`usernames/${username}`);
  return await ref.get().exists;
};

export const uploadUserDataPostLogin = async (user, formValue) => {
  // Create refs for both documents
  const userDoc = firestore.doc(`users/${user.uid}`);
  const usernameDoc = firestore.doc(`usernames/${formValue}`);

  // Commit both docs together as a batch write.
  const batch = firestore.batch();
  batch.set(userDoc, {
    username: formValue,
    photoURL: user.photoURL,
    displayName: user.displayName,
    provider: user.providerData[0].providerId,
    email: user.email
  });
  batch.set(usernameDoc, { uid: user.uid });

  return await batch.commit();
};
