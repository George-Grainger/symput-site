import FeedbackFeed from '@/components/Feedback/FeedbackFeed';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import { getMorePublishedPosts } from '@/lib/dbUtils';
import { FeedbackPostsContext } from '@/lib/context';
import { useState } from 'react';

export async function getStaticProps({ locale }) {
  const [initialPosts, initialIsEnd] = await getMorePublishedPosts(-1);
  const pageData = getPageData(locale, 'feedback');
  const itemListData = getPageData(locale, 'feedback-itemlist');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  const lastUpdate = new Date().toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });

  return {
    props: {
      initialPosts,
      initialIsEnd,
      lastUpdate,
      pageData,
      itemListData,
      navbarData,
      footerData
    },
    revalidate: 5
  };
}

export default function FB({
  initialPosts,
  initialIsEnd,
  lastUpdate,
  pageData,
  itemListData,
  navbarData,
  footerData
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [isEnd, setIsEnd] = useState(initialIsEnd);
  return (
    <>
      <Layout navbarData={navbarData} footerData={footerData}>
        <FeedbackPostsContext.Provider
          value={{ posts, setPosts, isEnd, setIsEnd }}
        >
          <FeedbackFeed
            {...pageData}
            lastUpdate={lastUpdate}
            itemListData={itemListData}
          />
        </FeedbackPostsContext.Provider>
      </Layout>
    </>
  );
}
