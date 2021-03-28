import {
  firestore,
  auth,
  increment,
  serverTimestamp,
  fromMillis,
  postToJSON
} from '@/lib/firebase';

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
    content: '# hello world!',
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
    provider: user.providerData[0].providerId,
    email: user.email
  });
  batch.set(usernameDoc, { uid: user.uid });
  batch.commit();
};
