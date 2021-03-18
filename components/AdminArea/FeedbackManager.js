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
    .doc(auth.currentUser.uid)
    .collection('posts')
    .doc(slug);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <>
      {post && (
        <section className="section-default">
          <h1>{post.title}</h1>
          <p>ID: {post.slug}</p>

          <FeedbackForm
            postRef={postRef}
            defaultValues={post}
            preview={preview}
          />

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? 'Edit' : 'Preview'}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <a className="btn-blue">Live view</a>
            </Link>
            <DeleteFeedbackButton postRef={postRef} />
          </aside>
        </section>
      )}
    </>
  );
};
export default FeedbackManager;
