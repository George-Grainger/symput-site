import { UserContext, FeedbackItemContext } from '@/lib/context';
import { firestore } from '@/lib/dbUtils';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';
import PostContent from '@/components/Feedback/FeedbackContent';
import HeartButton from '@/components/HeartButton';
import AuthCheck from '@/components/AuthCheck';
import Link from 'next/link';
import { FaEdit, FaRegHeart } from 'react-icons/fa';

const FeedbackCard = ({ path, passedPost, authPageData }) => {
  const postRef = firestore.doc(path);
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || passedPost;
  const { user: currentUser } = useContext(UserContext);
  const { signUp_i18n } = useContext(FeedbackItemContext);

  return (
    <section className="section-default section-default-padding">
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
            authPageData={authPageData}
            fallback={
              <Link href="/sign-in">
                <a className="link-standard p-1 ml-auto">
                  <FaRegHeart className="text-red-500 inline mr-4" />
                  {post.heartCount || 0}
                  <br />
                  <span>{signUp_i18n}</span>
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
