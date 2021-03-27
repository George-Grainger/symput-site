import FeedbackFeed from '@/components/Feedback/FeedbackFeed';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import { getMorePublishedPosts } from '@/lib/db-utils';
import { FeedbackContext } from '@/lib/context';
import { useState } from 'react';

export async function getServerSideProps({ locale }) {
  const [initialPosts, initialIsEnd] = await getMorePublishedPosts(-1);

  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: { initialPosts, initialIsEnd, navbarData, footerData }
  };
}

export default function FB({
  initialPosts,
  initialIsEnd,
  navbarData,
  footerData
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [isEnd, setIsEnd] = useState(initialIsEnd);

  return (
    <>
      <Layout navbarData={navbarData} footerData={footerData}>
        <FeedbackContext.Provider value={{ posts, setPosts, isEnd, setIsEnd }}>
          <FeedbackFeed />
        </FeedbackContext.Provider>
      </Layout>
    </>
  );
}
