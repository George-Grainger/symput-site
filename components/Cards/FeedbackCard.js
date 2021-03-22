import { UserContext } from '@/lib/context';
import { firestore } from '@/lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';
import PostContent from '@/components/Feedback/FeedbackContent';
import HeartButton from '@/components/HeartButton';
import AuthCheck from '@/components/AuthCheck';
import Metatags from '@/components/Metatags';
import Link from 'next/link';
import { FaEdit, FaRegHeart } from 'react-icons/fa';

const FeedbackCard = (props) => {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || props.post;
  const { user: currentUser, loading } = useContext(UserContext);

  return (
    <section className="section-default section-default-padding">
      <Metatags title={post.title} description={post.title} />
      <div className="min-w-fs-card p-4 sm:p-8 bg-white dark:bg-gray-900 prose dark:prose-dark flex flex-col items-center rounded-lg relative">
        <div className="flex w-full sm:sticky top-28">
          {currentUser?.uid === post.uid && (
            <Link href={`/admin/${post.slug}`}>
              <a className="link-standard mr-auto">
                <FaEdit className="h-8 w-8 p-1" />
              </a>
            </Link>
          )}
          <AuthCheck
            fallback={
              <Link href="/enter">
                <a className="link-standard p-1 ml-auto">
                  <FaRegHeart className="text-red-500 inline mr-4" />
                  {post.heartCount || 0}
                  <br />
                  <span>Sign Up</span>
                </a>
              </Link>
            }
          >
            <HeartButton postRef={postRef} hc={post.heartCount} />
          </AuthCheck>
        </div>
        <PostContent post={post} />
      </div>
    </section>
  );
};

export default FeedbackCard;
