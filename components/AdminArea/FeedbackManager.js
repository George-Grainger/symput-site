import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { firestore, auth } from '@/lib/firebase';
import Link from 'next/link';
import FeedbackForm from '../Form/FeedbackForm';
import DeleteFeedbackButton from './DeleteFeedbackButton';

const FeedbackManager = () => {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts')
    .doc(slug);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <>
      {post && (
        <section className="section-default section-default-padding">
          <div className="w-fs-card bg-white px-3 sm:px-8 sm:pb-4 dark:bg-gray-900 grid md:grid-cols-2 relative rounded-3xl transition-darkmode">
            <div className="md:sticky md:top-20 pt-8 md:mb-6 md:pb-2 bg-white dark:bg-gray-900 z-10">
              <h1 className="prose text-3xl dark:prose-dark font-semibold md:mb-2">
                Title: {post?.title}
              </h1>
              <p className="prose text-xl dark:prose-dark">
                Slug: {post?.slug}
              </p>
            </div>

            <aside className="sticky top-20 pt-8 pb-2 md:pb-0 mb-6 md:my-0 bg-white dark:bg-gray-900 z-10">
              <div className="flex">
                <button
                  className={
                    'btn mr-2 md:mr-8 flex-auto ' +
                    (!preview
                      ? 'btn-black dark:btn-yellow'
                      : ' btn-black-inverted dark:btn-yellow-inverted')
                  }
                  onClick={() => setPreview(false)}
                >
                  Edit
                </button>
                <button
                  className={
                    'btn mr-2 md:mr-8 flex-auto ' +
                    (preview
                      ? 'btn-black dark:btn-yellow'
                      : ' btn-black-inverted dark:btn-yellow-inverted')
                  }
                  onClick={() => setPreview(true)}
                >
                  Preview
                </button>
                <DeleteFeedbackButton postRef={postRef} />
              </div>
            </aside>

            <FeedbackForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </div>
        </section>
      )}
    </>
  );
};
export default FeedbackManager;
