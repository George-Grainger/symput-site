import AuthCheck from '@/components/AuthCheck';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import AdminCard from '@/components/Cards/AdminCard';
import { FeedbackItemListContext, AdminContext } from '@/lib/context';

export const getStaticProps = async ({ locale }) => {
  const itemsListData = getPageData(locale, 'feedback-itemlist');
  const errorsData = getPageData(locale, 'errors');
  const pageData = getPageData(locale, 'admin');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      navbarData,
      footerData,
      itemsListData,
      errorsData,
      pageData
    }
  };
};

export default function AdminPostsPage({
  navbarData,
  footerData,
  itemsListData,
  errorsData,
  pageData
}) {
  return (
    <>
      <Layout navbarData={navbarData} footerData={footerData}>
        <AuthCheck>
          <AdminContext.Provider value={pageData}>
            <FeedbackItemListContext.Provider value={itemsListData}>
              <AdminCard errorsData={errorsData} />
            </FeedbackItemListContext.Provider>
          </AdminContext.Provider>
        </AuthCheck>
      </Layout>
    </>
  );
}
