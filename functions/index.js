const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const capitalizeSentence = require('capitalize-sentence');
const Filter = require('bad-words');

const badWordsFilter = new Filter();

exports.moderateFeedback = functions.firestore
  .document('/users/{userId}/posts/{postId}')
  .onWrite((change, context) => {
    const postData = change.after.data();
    if (postData) {
      const title = postData.title;
      const moderatedTitle = moderateMessage(title);
      const summary = postData.summary;
      const moderatedSummary = moderateMessage(summary);
      const content = postData.content;
      const moderatedConent = moderateMessage(content);
      if (
        title === moderatedTitle &&
        content === moderatedConent &&
        summary === moderatedSummary
      ) {
        console.log('nothing left to do');
        return null;
      }
      return change.after.ref.update({
        title: moderatedTitle,
        summary: moderatedSummary,
        content: moderatedConent,
        moderated: title !== moderatedTitle || content !== moderatedConent
      });
    } else {
      return null;
    }
  });

// Moderates the given message if appropriate.
function moderateMessage(message) {
  // Re-capitalize if the user is Shouting.
  if (isShouting(message)) {
    console.log('User is shouting. Fixing sentence case...');
    message = stopShouting(message);
  }

  // Moderate if the user uses SwearWords.
  if (containsSwearwords(message)) {
    console.log('User is swearing. moderating...');
    message = moderateSwearwords(message);
  }

  return message;
}

// Returns true if the string contains swearwords.
function containsSwearwords(message) {
  return message !== badWordsFilter.clean(message);
}

// Hide all swearwords. e.g: Crap => ****.
function moderateSwearwords(message) {
  return badWordsFilter.clean(message);
}

// Detect if the current message is shouting. i.e. there are too many Uppercase
// characters or exclamation points.
function isShouting(message) {
  return (
    message.replace(/[^A-Z]/g, '').length > message.length / 2 ||
    message.replace(/[^!]/g, '').length >= 3
  );
}

// Correctly capitalize the string as a sentence (e.g. uppercase after dots)
// and remove exclamation points.
function stopShouting(message) {
  return capitalizeSentence(message.toLowerCase()).replace(/!+/g, '.');
}

exports.deletedUserFeedback = functions.auth.user().onDelete((user) => {
  const uid = user.uid;
  const firestore = admin.firestore();
  const userDoc = firestore.collection('users').doc(uid);
  const usernameDoc = firestore
    .collection('usernames')
    .where('uid', '==', uid)
    .limit(1);

  return Promise.all([
    deleteSubcollections(firestore, `/users/${uid}/posts`, 'hearts', 32),
    deleteCollection(firestore, `/users/${uid}/posts`, 32),
    userDoc.delete(),
    deleteUsername(usernameDoc)
  ]);
});

async function deleteUsername(usernameDoc) {
  const usernameAsList = (await usernameDoc.get()).docs;
  if (usernameAsList && usernameAsList.length > 0) {
    const username = usernameAsList[0];
    console.log('deleted username');
    return username.ref.delete();
  }
  return null;
}

async function deleteSubcollections(db, collectionPath, subpath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);
  const snapshot = await query.get();

  if (snapshot.size == 0) {
    return null;
  }

  return Promise.all(
    snapshot.docs.map((doc) =>
      deleteCollection(db, `/${doc.ref.path}/${subpath}`, batchSize)
    )
  );
}

async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}
