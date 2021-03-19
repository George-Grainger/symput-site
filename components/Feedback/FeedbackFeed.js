import FeedbackItem from './FeedbackItem';
import ButtonEllipsis from '@/components/Loading/ButtonEllipsis';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { firestore, fromMillis } from '@/lib/firebase';
import uuid from 'react-uuid';

const LIMIT = 10;

export default function FeedbackFeed({ initialPosts, admin }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  if (posts?.length > 0) {
    return (
      <section className="section-default section-default-padding">
        <h1 className="prose dark:prose-dark text-5xl font-semibold text-center mb-12">
          Feedback
        </h1>
        {posts.map((post) => (
          <FeedbackItem
            key={uuid()}
            post={post}
            key={post.slug}
            admin={admin}
          />
        ))}
        {!postsEnd && (
          <button
            onClick={getMorePosts}
            className="btn-lg btn-black dark:btn-yellow my-4"
          >
            {loading ? <ButtonEllipsis color="bg-white" /> : 'Load more'}
          </button>
        )}
        <Loader show={loading} />
        {postsEnd && (
          <div className="font-bold py-3 px-6 rounded shadow-md cursor-default bg-green-500 text-white my-4">
            You have reached the end!
          </div>
        )}
      </section>
    );
  } else {
    return (
      // TODO finish this page
      <section className="section-default section-default-padding">
        <h2 className="text-6xl mb-12">There's no feedback yet</h2>
        <p className="text-xl mb-12">
          You could be the first person to ever leave feedback - head to the
          admin area
        </p>
      </section>
    );
  }
}
