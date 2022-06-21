import { getFeedbackPostRef } from '@/lib/dbUtils';
import { deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const DeleteFeedbackButton = () => {
  const router = useRouter();
  const { slug } = router.query;

  const postRef = getFeedbackPostRef(slug);

  const deleteFeedback = async () => {
    toast(
      (t) => (
        <div className="grid grid-cols-2 gap-4">
          <span className="text-center text-xl font-semibold col-span-2">
            Are you sure?
          </span>
          <button
            onClick={async () => {
              await deleteDoc(postRef);
              toast.dismiss(t.id);
              router.push('/admin');
              toast('Feedback annihilated ', { icon: '🗑️' });
            }}
            className="btn btn-black-inverted"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-black-inverted"
          >
            No
          </button>
        </div>
      ),
      { duration: 4000000 }
    );
  };

  return (
    <button className="btn btn-red" onClick={deleteFeedback}>
      Delete
    </button>
  );
};
export default DeleteFeedbackButton;
