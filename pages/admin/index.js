import AuthCheck from '@/components/AuthCheck';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import AdminCard from '@/components/Cards/AdminCard';
import { FeedbackItemListContext, AdminContext } from '@/lib/context';
import { NextSeo } from 'next-seo';

export const getStaticProps = async ({ locale }) => {
  const itemsListData = getPageData(locale, 'feedback-itemlist');
  const errorsData = getPageData(locale, 'errors');
  const pageData = getPageData(locale, 'admin');
  const authPageData = getPageData(locale, 'auth');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      navbarData,
      footerData,
      itemsListData,
      errorsData,
      pageData,
      authPageData
    }
  };
};

export default function AdminPostsPage({
  navbarData,
  footerData,
  itemsListData,
  errorsData,
  pageData,
  authPageData
}) {
  return (
    <>
      <NextSeo noindex={true} />
      <Layout navbarData={navbarData} footerData={footerData}>
        <AuthCheck authPageData={authPageData}>
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
