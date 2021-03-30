import { incrementHeart } from '@/lib/dbUtils';
import { auth } from '@/lib/authUtils';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// Allows user to heart or like a post
export default function Heart({ postRef, hc }) {
  // Listen to heart document for currently logged in user
  const heartRef = postRef.collection('hearts').doc(auth.currentUser?.uid);
  const [heartDoc] = useDocument(heartRef);

  return heartDoc?.exists ? (
    <button
      className="ml-auto link-standard p-1"
      onClick={() => incrementHeart(heartRef, postRef, false)}
    >
      <FaHeart className="text-red-500 inline mr-4" />
      <strong>{hc}</strong>
    </button>
  ) : (
    <button
      className="link link-standard p-1 ml-auto"
      onClick={() => incrementHeart(heartRef, postRef, true)}
    >
      <FaRegHeart className="text-red-500 inline mr-4" />
      <strong>{hc}</strong>
    </button>
  );
}
