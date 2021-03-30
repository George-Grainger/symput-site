import Layout from 'layout/Layout';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import UserCard from '@/components/Cards/UserCard';
import { getMoreUserPublishedPosts, getUserWithUsername } from '@/lib/dbUtils';
import { useState } from 'react';
import { UserPostsContext } from '@/lib/context';

export async function getServerSideProps({ query, locale }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true
    };
  }

  // JSON serializable data
  const user = userDoc.data();
  const [initialPosts, initialIsEnd] = await getMoreUserPublishedPosts(userDoc);

  const itemListData = getPageData(locale, 'feedback-itemlist');
  const pageData = getPageData(locale, 'user-profile');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      user,
      username,
      pageData,
      initialPosts,
      initialIsEnd,
      itemListData,
      navbarData,
      footerData
    } // will be passed to the page component as props
  };
}

export default function UserProfilePage({
  user,
  username,
  pageData,
  initialPosts,
  initialIsEnd,
  itemListData,
  navbarData,
  footerData
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [isEnd, setIsEnd] = useState(initialIsEnd);
  return (
    <Layout
      title={`Symput - ${username}`}
      navbarData={navbarData}
      footerData={footerData}
    >
      <UserPostsContext.Provider value={{ posts, setPosts, isEnd, setIsEnd }}>
        <UserCard user={user} itemListData={itemListData} {...pageData} />
      </UserPostsContext.Provider>
    </Layout>
  );
}
