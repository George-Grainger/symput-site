import { UserContext } from '@/lib/context';
import { firestore } from '@/lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';
import PostContent from '@/components/Feedback/FeedbackContent';
import HeartButton from '@/components/HeartButton';
import AuthCheck from '@/components/AuthCheck';
import Metatags from '@/components/Metatags';
import Link from 'next/link';

const FeedbackCard = (props) => {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);

  return (
    <section className="section-default">
      <Metatags title={post.title} description={post.title} />
      <div className="card card-black md:min-h-fs-card min-w-fs-card">
        <PostContent post={post} />
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <button className="btn-blue">Edit Post</button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default FeedbackCard;
