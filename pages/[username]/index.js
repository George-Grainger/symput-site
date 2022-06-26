import Layout from 'layout/Layout';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import UserCard from '@/components/Cards/UserCard';
import { db, getUserWithUsername } from '@/lib/dbUtils';
import { collection, getDocs } from 'firebase/firestore';

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
  const uid = userDoc.id;

  const itemListData = getPageData(locale, 'feedback-itemlist');
  const pageData = getPageData(locale, 'user-profile');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      user,
      username,
      uid,
      pageData,
      itemListData,
      navbarData,
      footerData
    }
  };
}

export async function getStaticPaths({ locales }) {
  const snapshot = await getDocs(collection(db, 'users'));
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
  uid,
  pageData,
  itemListData,
  navbarData,
  footerData
}) {
  return (
    <Layout
      title={`Symput - ${username}`}
      navbarData={navbarData}
      footerData={footerData}
    >
      <UserCard
        user={user}
        uid={uid}
        itemListData={itemListData}
        {...pageData}
      />
    </Layout>
  );
}
