import { firestore, auth, increment } from '@/lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// Allows user to heart or like a post
export default function Heart({ postRef, hc }) {
  // Listen to heart document for currently logged in user
  const heartRef = postRef.collection('hearts').doc(auth.currentUser?.uid);
  const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser?.uid;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists ? (
    <button className="ml-auto link-standard p-1" onClick={removeHeart}>
      <FaHeart className="text-red-500 inline mr-4" />
      <strong>{hc}</strong>
    </button>
  ) : (
    <button className="link link-standard p-1 ml-auto" onClick={addHeart}>
      <FaRegHeart className="text-red-500 inline mr-4" />
      <strong>{hc}</strong>
    </button>
  );
}
