import { firestore, auth } from '@/lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import FeedbackItem from '@/components/Feedback/FeedbackItem';

const AdminFeedbackList = () => {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  //TODO add abilitiy to delete posts
  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      {posts &&
        posts.map((post) => (
          <FeedbackItem key={uuid()} post={post} key={post.slug} admin={true} />
        ))}
    </>
  );
};

export default AdminFeedbackList;
