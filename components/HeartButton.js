import { UserContext } from '@/lib/context';
import { incrementHeart } from '@/lib/dbUtils';
import { sendEmailVerification } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useContext } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';

// Allows user to heart or like a post
export default function Heart({ postRef, hc }) {
  // Listen to heart document for currently logged in user#
  const { user, handleVerification } = useContext(UserContext);
  const heartRef = doc(postRef, 'hearts', user.uid);
  const [heartDoc] = useDocument(heartRef);

  const handleClick = (increase) => {
    if (user.emailVerified) {
      incrementHeart(heartRef, postRef, increase);
    } else {
      let firstClick = true;
      toast(
        (t) => (
          <div className="flex flex-wrap text-center">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute right-4"
            >
              <FaTimes className=" h-6 w-6 link link-light-bg" />
            </button>
            <span className="font-semibold text-xl flex-auto">
              Verification Reminder
            </span>
            <span className="mt-4 mx-auto">
              Verify your account to like posts
            </span>
            <button
              onClick={() => {
                if (firstClick) {
                  firstClick = false;
                  handleVerification(() => {
                    toast.dismiss(t.id);
                    toast.success('Successfully verified');
                  });
                } else {
                  sendEmailVerification(user);
                }
              }}
              className="btn btn-black-inverted mt-4 w-full"
            >
              Resend verification
            </button>
          </div>
        ),
        { duration: Infinity }
      );
    }
  };

  return heartDoc?.exists() ? (
    <button
      className="ml-auto link-standard p-1"
      onClick={() => handleClick(false)}
    >
      <FaHeart className="text-red-500 inline mr-4" />
      <strong>{hc}</strong>
    </button>
  ) : (
    <button
      className="link link-standard p-1 ml-auto"
      onClick={() => handleClick(true)}
    >
      <FaRegHeart className="text-red-500 inline mr-4" />
      <strong>{hc}</strong>
    </button>
  );
}
