import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const DeleteFeedbackButton = ({ postRef }) => {
  const router = useRouter();

  const deleteFeedback = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await postRef.delete();
      router.push('/admin');
      toast('Feedback annihilated ', { icon: '🗑️' });
    }
  };

  return (
    <button
      className="btn bg-red-500 hover:bg-red-600 text-white"
      onClick={deleteFeedback}
    >
      Delete
    </button>
  );
};
export default DeleteFeedbackButton;
