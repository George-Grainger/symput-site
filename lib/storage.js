import firebase from '@/lib/firebase';

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export const deleteUserStorage = async (uid) => {
  storage
    .ref()
    .child(`uploads/${uid}`)
    .listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.delete();
      });
    })
    .catch((e) => console.log(e));
};
