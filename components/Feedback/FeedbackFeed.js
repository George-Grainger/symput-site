import { getMorePublishedPosts } from '@/lib/dbUtils';
import { FeedbackPostsContext, FeedbackItemListContext } from '@/lib/context';
import FeedbackItemList from './FeedbackItemList';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function FeedbackFeed({
  title_i18n,
  noFeedbackTitle_i18n,
  noFeedbackMessage_i18n,
  lastUpdated_i18n,
  unknown_i18n,
  itemListData
}) {
  const { locale } = useRouter();
  const generateDateNow = () =>
    new Date().toLocaleString(locale, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });

  const [lastUpdate, setLastUpdate] = useState(generateDateNow());
  const [posts, setPosts] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    setLastUpdate(generateDateNow());
  }, [posts, locale]);

  const noPostSection = (
    <section className="section-default section-default-padding justify-center">
      <div className=" prose prose-2xl dark:prose-dark text-center mb-12">
        <h2 className="text-6xl">{noFeedbackTitle_i18n}</h2>
        <p className="text-xl">{noFeedbackMessage_i18n}</p>
      </div>
    </section>
  );

  return (
    <section className="section-default section-default-padding">
      <h1 className="prose dark:prose-dark text-5xl font-semibold text-center mb-12">
        {title_i18n}
      </h1>
      <span className="-mt-10 mb-10 text-sm font-weight-light text-gray-700 dark:text-white lang-switch">
        {`${lastUpdated_i18n} ${lastUpdate || unknown_i18n}`}
      </span>
      <FeedbackPostsContext.Provider
        value={{ posts, setPosts, isEnd, setIsEnd }}
      >
        <FeedbackItemListContext.Provider value={itemListData}>
          <FeedbackItemList
            getMore={getMorePublishedPosts}
            context={FeedbackPostsContext}
            trigger
            placeHolders={4}
            noPostMessage={noPostSection}
          />
        </FeedbackItemListContext.Provider>
      </FeedbackPostsContext.Provider>
    </section>
  );
}
