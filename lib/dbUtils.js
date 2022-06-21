import { auth } from '@/lib/authUtils';
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  Timestamp,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import { app } from '@/lib/firebase';

// Firestore exports
export const db = getFirestore(app);
const fromMillis = Timestamp.fromMillis;

const getStartAfterCursor = (last) => {
  if (typeof last?.updatedAt == 'number') {
    return fromMillis(last.updatedAt);
  } else {
    return last.updatedAt;
  }
};

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(db, 'users');
  const querySnapshot = query(
    usersRef,
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(querySnapshot)).docs[0];
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
  return doc(db, 'users', auth.currentUser?.uid, 'posts', slug);
};

const LIMIT = 10;

export const getPosts = async (last = -1) => {
  const ref = collection(db, 'users', auth.currentUser?.uid, 'posts');

  let querySnapshot = query(
    ref,
    where('published', '==', true),
    orderBy('updatedAt', 'desc'),
    limit(LIMIT)
  );

  if (last != -1) {
    querySnapshot = query(querySnapshot, startAfter(getStartAfterCursor(last)));
  }

  const newPosts = (await getDocs(querySnapshot))?.docs.map(postToJSON);

  let isEnd = false;
  if (newPosts.length < LIMIT) {
    isEnd = true;
  }
  return [newPosts, isEnd];
};

export const getMoreUserPublishedPosts = async (userDoc, last = -1) => {
  const ref = collection(userDoc.ref, 'posts');

  let querySnapshot = query(
    ref,
    where('published', '==', true),
    orderBy('updatedAt', 'desc'),
    limit(LIMIT)
  );

  if (last != -1) {
    querySnapshot = query(querySnapshot, startAfter(getStartAfterCursor(last)));
  }

  const newPosts = (await getDocs(querySnapshot))?.docs.map(postToJSON);

  let isEnd = false;
  if (newPosts.length < LIMIT) {
    isEnd = true;
  }
  return [newPosts, isEnd];
};

export const getMorePublishedPosts = async (last = -1) => {
  const ref = collectionGroup(db, 'posts');

  let querySnapshot = query(
    ref,
    where('published', '==', true),
    orderBy('updatedAt', 'desc'),
    limit(LIMIT)
  );

  if (last != -1) {
    querySnapshot = query(querySnapshot, startAfter(getStartAfterCursor(last)));
  }

  const newPosts = (await getDocs(querySnapshot))?.docs.map(postToJSON);
  let isEnd = false;
  if (newPosts.length < LIMIT) {
    isEnd = true;
  }
  return [newPosts, isEnd];
};

export const incrementHeart = (heartRef, postRef, increase) => {
  const batch = writeBatch(db);
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
  username,
  moderatedUsername
) => {
  const uid = auth.currentUser?.uid;
  const postRef = getFeedbackPostRef(feedbackSlug);
  // Tip: give all fields a default value here
  const data = {
    title: feedbackTitle,
    slug: feedbackSlug,
    uid,
    username,
    moderatedUsername,
    photoURL: user.photoURL,
    published: false,
    summary: 'TL;DR',
    content: '# Hello world',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    heartCount: 0
  };

  setDoc(postRef, data);
};

export const updateUsername = async (username) => {
  const user = auth.currentUser;
  const userDoc = doc(db, 'users', user.uid);
  const usernameDoc = doc(db, 'usernames', username);

  // Commit both ocs together as a batch write.
  const batch = writeBatch(db);
  batch.set(userDoc, {
    username,
    moderatedUsername: username,
    photoURL: user.photoURL,
    displayName: user.displayName,
    aboutInfo: '',
    provider: user.providerData[0].providerId,
    email: user.email,
    moderated: false
  });
  batch.set(usernameDoc, { uid: user.uid });
  batch.commit();
};

export const updateAboutInfo = async (newAboutInfo, username) => {
  const userDoc = doc(db, 'users', auth.currentUser?.uid);
  const success = updateDoc(userDoc, {
    uid: auth.currentUser?.uid,
    aboutInfo: newAboutInfo,
    username,
    moderated: false
  })
    .then(() => true)
    .catch(() => false);
  return success;
};

export const getUserRef = () => {
  if (auth.currentUser?.uid) {
    return doc(db, 'users', auth.currentUser.uid);
  }
  return null;
};
