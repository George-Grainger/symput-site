import { getMorePublishedPosts } from '@/lib/db-utils';
import { useContext } from 'react';
import { FeedbackContext } from '@/lib/context';
import FeedbackItemList from './FeedbackItemList';

export default function FeedbackFeed() {
  const { posts } = useContext(FeedbackContext);
  if (posts?.length > 0) {
    return (
      <section className="section-default section-default-padding">
        <h1 className="prose dark:prose-dark text-5xl font-semibold text-center mb-12">
          Feedback
        </h1>
        <FeedbackItemList
          getMore={getMorePublishedPosts}
          context={FeedbackContext}
        />
      </section>
    );
  } else {
    return (
      // TODO finish this page
      <section className="section-default section-default-padding">
        <div className=" prose prose-2xl dark:prose-dark text-center">
          <h2 className="text-6xl mb-12">There's no feedback yet</h2>
          <p className="text-xl mb-12">
            You could be the first person to ever leave feedback - head to the
            admin area
          </p>
        </div>
      </section>
    );
  }
}
