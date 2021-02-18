import { getFooterData, getNavbarData } from '@/lib/pageContent';
import Layout from 'layout/Layout';

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

const aims = ({ navbarData, footerData }) => {
  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <p>I'm here</p>
    </Layout>
  );
};

export default aims;
