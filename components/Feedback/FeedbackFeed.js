import { getMorePublishedPosts } from '@/lib/dbUtils';
import { useContext } from 'react';
import { FeedbackPostsContext, FeedbackItemListContext } from '@/lib/context';
import FeedbackItemList from './FeedbackItemList';

export default function FeedbackFeed({
  title_i18n,
  noFeedbackTitle_i18n,
  noFeedbackMessage_i18n,
  itemListData
}) {
  const { posts } = useContext(FeedbackPostsContext);
  if (posts?.length > 0) {
    return (
      <section className="section-default section-default-padding">
        <h1 className="prose dark:prose-dark text-5xl font-semibold text-center mb-12">
          {title_i18n}
        </h1>
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
      // TODO finish this page
      <section className="section-default section-default-padding justify-center">
        <div className=" prose prose-2xl dark:prose-dark text-center mb-12">
          <h2 className="text-6xl">{noFeedbackTitle_i18n}</h2>
          <p className="text-xl">{noFeedbackMessage_i18n}</p>
        </div>
      </section>
    );
  }
}
