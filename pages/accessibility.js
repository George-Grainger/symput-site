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

const accessibility = ({ navbarData, footerData }) => {
  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <p>Accessibility to be completed</p>
    </Layout>
  );
};

export default accessibility;
