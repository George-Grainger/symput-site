import AuthCheck from '@/components/AuthCheck';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import AdminCard from '@/components/Cards/AdminCard';
import { FeedbackItemListContext } from '@/lib/context';

export const getStaticProps = async ({ locale }) => {
  const itemsListData = getPageData(locale, 'feedback-itemlist');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      navbarData,
      footerData,
      itemsListData
    }
  };
};

export default function AdminPostsPage({
  navbarData,
  footerData,
  itemsListData
}) {
  return (
    <>
      <Layout navbarData={navbarData} footerData={footerData}>
        <AuthCheck>
          <FeedbackItemListContext.Provider value={itemsListData}>
            <AdminCard />
          </FeedbackItemListContext.Provider>
        </AuthCheck>
      </Layout>
    </>
  );
}
