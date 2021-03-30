import { getFeedbackPostRef } from '@/lib/dbUtils';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const DeleteFeedbackButton = () => {
  const router = useRouter();
  const { slug } = router.query;

  const postRef = getFeedbackPostRef(slug);

  const deleteFeedback = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await postRef.delete();
      router.push('/admin');
      toast('Feedback annihilated ', { icon: '🗑️' });
    }
  };

  return (
    <button className="btn btn-red" onClick={deleteFeedback}>
      Delete
    </button>
  );
};
export default DeleteFeedbackButton;
