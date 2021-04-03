import firebase from '@/lib/firebase';
import { auth } from '@/lib/authUtils';

// Firestore exports
export const firestore = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment;
const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0
  };
}

export const getFeedbackPostRef = (slug) => {
  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts')
    .doc(slug);
  return postRef;
};

const LIMIT = 10;

export const getPosts = async (last = -1) => {
  let ref = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts')
    .orderBy('updatedAt', 'desc');

  if (last != -1) {
    const cursor =
      typeof last?.updatedAt === 'number'
        ? fromMillis(last.updatedAt)
        : last?.updatedAt;
    ref = ref.startAfter(cursor);
  }
  const query = ref.limit(LIMIT);

  const newPosts = (await query.get())?.docs.map(postToJSON);
  let isEnd = false;
  if (newPosts.length < LIMIT) {
    isEnd = true;
  }
  return [newPosts, isEnd];
};

export const getMoreUserPublishedPosts = async (userDoc, last = -1) => {
  let ref = userDoc.ref
    .collection('posts')
    .where('published', '==', true)
    .orderBy('updatedAt', 'desc')
    .limit(LIMIT);

  if (last != -1) {
    const cursor =
      typeof last?.updatedAt === 'number'
        ? fromMillis(last.updatedAt)
        : last?.updatedAt;
    ref = ref.startAfter(cursor);
  }
  const query = ref.limit(LIMIT);

  const newPosts = (await query.get())?.docs.map(postToJSON);
  let isEnd = false;
  if (newPosts.length < LIMIT) {
    isEnd = true;
  }
  return [newPosts, isEnd];
};

export const getMorePublishedPosts = async (last = -1) => {
  let ref = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('updatedAt', 'desc');

  if (last != -1) {
    const cursor =
      typeof last?.updatedAt === 'number'
        ? fromMillis(last.updatedAt)
        : last?.updatedAt;
    ref = ref.startAfter(cursor);
  }
  const query = ref.limit(LIMIT);

  const newPosts = (await query.get())?.docs.map(postToJSON);
  let isEnd = false;
  if (newPosts.length < LIMIT) {
    isEnd = true;
  }
  return [newPosts, isEnd];
};

export const incrementHeart = (heartRef, postRef, increase) => {
  const batch = firestore.batch();
  if (increase) {
    const uid = auth.currentUser?.uid;
    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });
  } else {
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);
  }
  batch.commit();
};

export const createFeedback = async (
  feedbackTitle,
  feedbackSlug,
  user,
  username
) => {
  const uid = auth.currentUser?.uid;
  const ref = await getFeedbackPostRef(feedbackSlug);

  // Tip: give all fields a default value here
  const data = {
    title: feedbackTitle,
    slug: feedbackSlug,
    uid,
    username,
    photoURL: user.photoURL,
    published: false,
    summary: 'TL;DR',
    content: '# Hello world',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    heartCount: 0
  };

  ref.set(data);
};

export const updateUsername = async (username) => {
  const user = auth.currentUser;
  const userDoc = firestore.doc(`users/${user.uid}`);
  const usernameDoc = firestore.doc(`usernames/${username}`);

  // Commit both ocs together as a batch write.
  const batch = firestore.batch();
  batch.set(userDoc, {
    username,
    photoURL: user.photoURL,
    displayName: user.displayName,
    aboutInfo: 'Nothing set',
    provider: user.providerData[0].providerId,
    email: user.email,
    moderated: false
  });
  batch.set(usernameDoc, { uid: user.uid });
  batch.commit();
};

export const updateAboutInfo = async (newAboutInfo, username) => {
  const success = await firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .update({ uid: auth.currentUser?.uid, aboutInfo: newAboutInfo, username })
    .then(() => true)
    .catch(() => false);
  return success;
};

export const getUserRef = () => {
  const postRef = firestore.collection('users').doc(auth.currentUser?.uid);
  return postRef;
};
