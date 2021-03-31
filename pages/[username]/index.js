import Layout from 'layout/Layout';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import UserCard from '@/components/Cards/UserCard';
import {
  firestore,
  getMoreUserPublishedPosts,
  getUserWithUsername
} from '@/lib/dbUtils';
import { useState, useEffect } from 'react';
import { UserPostsContext } from '@/lib/context';

export async function getStaticProps({ params, locale }) {
  const { username } = params;
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
    },
    revalidate: 120
  };
}

export async function getStaticPaths({ locales }) {
  const snapshot = await firestore.collection('users').get();
  const paths = [];

  snapshot.docs.forEach((doc) => {
    const { username } = doc.data();
    locales.forEach((locale) => {
      paths.push({
        params: { username },
        locale
      });
    });
  });

  return {
    paths,
    fallback: 'blocking'
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

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, []);

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
