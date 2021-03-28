import FeedbackFeed from '@/components/Feedback/FeedbackFeed';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import { getMorePublishedPosts } from '@/lib/db-utils';
import { FeedbackPostsContext } from '@/lib/context';
import { useState } from 'react';

export async function getServerSideProps({ locale }) {
  const [initialPosts, initialIsEnd] = await getMorePublishedPosts(-1);
  const pageData = getPageData(locale, 'feedback');
  const itemListData = getPageData(locale, 'feedback-itemlist');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      initialPosts,
      initialIsEnd,
      pageData,
      itemListData,
      navbarData,
      footerData
    }
  };
}

export default function FB({
  initialPosts,
  initialIsEnd,
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
          <FeedbackFeed {...pageData} itemListData={itemListData} />
        </FeedbackPostsContext.Provider>
      </Layout>
    </>
  );
}
