import { firestore, getUserWithUsername, postToJSON } from '@/lib/firebase';
import Layout from 'layout/Layout';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import FeedbackCard from '@/components/Cards/FeedbackCard';
import { FeedbackItemContext } from '@/lib/context';

export async function getStaticProps({ params, locale }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  const pageData = getPageData(locale, 'feedback-post');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: { post, path, navbarData, footerData, pageData },
    revalidate: 100
  };
}

export async function getStaticPaths({ locales }) {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();
  const paths = [];

  snapshot.docs.forEach((doc) => {
    locales.forEach((locale) => {
      const { slug, username } = doc.data();
      paths.push({
        params: { username, slug },
        locale
      });
    });
  });

  return {
    paths,
    fallback: 'blocking'
  };
}

export default function Post({ post, path, navbarData, footerData, pageData }) {
  return (
    <Layout
      title={`Feedback - ${post.title}`}
      navbarData={navbarData}
      footerData={footerData}
    >
      <FeedbackItemContext.Provider value={pageData}>
        <FeedbackCard passedPost={post} path={path} />
      </FeedbackItemContext.Provider>
    </Layout>
  );
}
