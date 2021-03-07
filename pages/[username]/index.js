import { getUserWithUsername, postToJSON } from '@/lib/firebase';
import Layout from 'layout/Layout';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import UserCard from '@/components/Cards/UserCard';

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
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      user,
      posts,
      navbarData,
      footerData
    } // will be passed to the page component as props
  };
}

export default function UserProfilePage({
  user,
  posts,
  navbarData,
  footerData
}) {
  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <UserCard user={user} posts={posts} />
    </Layout>
  );
}
