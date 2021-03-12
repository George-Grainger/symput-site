import { firestore, postToJSON } from '@/lib/firebase';
import FeedbackFeed from '@/components/Feedback/FeedbackFeed';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import Layout from 'layout/Layout';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps({ locale }) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: { posts, navbarData, footerData }
  };
}

export default function FB({ posts, navbarData, footerData }) {
  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <FeedbackFeed initialPosts={posts} />
    </Layout>
  );
}
