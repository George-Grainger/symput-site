import FeedbackFeed from '@/components/Feedback/FeedbackFeed';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import Layout from 'layout/Layout';

export async function getStaticProps({ locale }) {
  const pageData = getPageData(locale, 'feedback');
  const itemListData = getPageData(locale, 'feedback-itemlist');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      pageData,
      itemListData,
      navbarData,
      footerData
    }
  };
}

export default function FB({ pageData, itemListData, navbarData, footerData }) {
  return (
    <>
      <Layout navbarData={navbarData} footerData={footerData}>
        <FeedbackFeed {...pageData} itemListData={itemListData} />
      </Layout>
    </>
  );
}
