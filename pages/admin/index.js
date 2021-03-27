import AuthCheck from '@/components/AuthCheck';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import AdminCard from '@/components/Cards/AdminCard';

export const getStaticProps = async ({ locale }) => {
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      navbarData,
      footerData
    }
  };
};

export default function AdminPostsPage({ navbarData, footerData }) {
  return (
    <>
      <Layout navbarData={navbarData} footerData={footerData}>
        <AuthCheck>
          <AdminCard />
        </AuthCheck>
      </Layout>
    </>
  );
}
