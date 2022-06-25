import { getMorePublishedPosts } from '@/lib/dbUtils';
import { useContext } from 'react';
import { FeedbackPostsContext, FeedbackItemListContext } from '@/lib/context';
import FeedbackItemList from './FeedbackItemList';

export default function FeedbackFeed({
  title_i18n,
  noFeedbackTitle_i18n,
  noFeedbackMessage_i18n,
  lastUpdate,
  itemListData
}) {
  const { posts } = useContext(FeedbackPostsContext);
  if (posts?.length > 0) {
    return (
      <section className="section-default section-default-padding">
        <h1 className="prose dark:prose-dark text-5xl font-semibold text-center mb-12">
          {title_i18n}
        </h1>
        <span className="-mt-10 mb-10 text-sm font-weight-light text-gray-700">
          Last updated: {lastUpdate || 'unknown'}
        </span>
        <FeedbackItemListContext.Provider value={itemListData}>
          <FeedbackItemList
            getMore={getMorePublishedPosts}
            context={FeedbackPostsContext}
          />
        </FeedbackItemListContext.Provider>
      </section>
    );
  } else {
    return (
      <section className="section-default section-default-padding justify-center">
        <div className=" prose prose-2xl dark:prose-dark text-center mb-12">
          <h2 className="text-6xl">{noFeedbackTitle_i18n}</h2>
          <p className="text-xl">{noFeedbackMessage_i18n}</p>
        </div>
      </section>
    );
  }
}
