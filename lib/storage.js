import { app } from '@/lib/firebase';
import { deleteObject, getStorage, listAll, ref } from 'firebase/storage';

// Storage exports
export const storage = getStorage(app);

export const deleteUserStorage = async (uid) => {
  const storageRef = ref(storage, `uploads/${uid}`);
  listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        deleteObject(itemRef);
      });
    })
    .catch((e) => console.log(e));
};
