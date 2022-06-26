import { db, getSinglePostAndPath } from '@/lib/dbUtils';
import { getUserWithUsername, postToJSON } from '@/lib/dbUtils';
import Layout from 'layout/Layout';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import FeedbackCard from '@/components/Cards/FeedbackCard';
import { FeedbackItemContext } from '@/lib/context';
import { collectionGroup, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useState } from 'react';

export async function getStaticProps({ params, locale }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  const uid = userDoc.id;

  let post;
  let path;

  if (userDoc) {
    let { post: postDoc, path: pathRef } = await getSinglePostAndPath(
      userDoc.id,
      slug
    );
    // Feedback on that url doesn't exist
    if (!postDoc.exists()) {
      return { notFound: true };
    }

    post = postToJSON(postDoc);
    path = pathRef;
  }

  const pageData = getPageData(locale, 'feedback-post');
  const authPageData = getPageData(locale, 'auth');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      initPost: post,
      path,
      uid,
      navbarData,
      footerData,
      pageData,
      authPageData
    },
    revalidate: 5
  };
}

export async function getStaticPaths({ locales }) {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await getDocs(collectionGroup(db, 'posts'));
  const paths = [];

  snapshot.docs.forEach((doc) => {
    const { slug, username } = doc.data();
    locales.forEach((locale) => {
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

export default function Post({
  initPost,
  path,
  uid,
  navbarData,
  footerData,
  pageData,
  authPageData
}) {
  const { query } = useRouter();
  const [post, setPost] = useState(initPost);
  const { loading_i18n, updated_i18n, noUpdate_i18n, error_i18n } = pageData;

  useEffect(() => {
    toast.promise(getSinglePostAndPath(uid, query.slug), {
      loading: loading_i18n,
      success: (data) => {
        const newPost = postToJSON(data.post);
        if (post.updatedAt < newPost.updatedAt) {
          setPost(newPost);
          return updated_i18n;
        } else {
          return noUpdate_i18n;
        }
      },
      error: error_i18n
    });
  }, []);

  return (
    <Layout
      title={`Feedback - ${post?.title || initPost?.title}`}
      navbarData={navbarData}
      footerData={footerData}
    >
      <FeedbackItemContext.Provider value={pageData}>
        <FeedbackCard
          passedPost={post}
          path={path}
          authPageData={authPageData}
        />
      </FeedbackItemContext.Provider>
    </Layout>
  );
}
