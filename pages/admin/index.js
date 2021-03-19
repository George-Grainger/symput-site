import AuthCheck from '@/components/AuthCheck';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import Head from 'next/head';
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
      <Head>
        // TODO fix titles
        <title>Symput Admin Area</title>
      </Head>
      <Layout navbarData={navbarData} footerData={footerData}>
        <AuthCheck>
          <AdminCard />
        </AuthCheck>
      </Layout>
    </>
  );
}
