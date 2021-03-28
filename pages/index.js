import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import Layout from 'layout/Layout';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import { LandingConext } from '@/lib/context';

export const getStaticProps = async ({ locale }) => {
  const pageData = getPageData(locale, 'landing');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      pageData,
      navbarData,
      footerData
    }
  };
};

const IndexPage = ({ pageData, navbarData, footerData }) => {
  return (
    <Layout
      title="Symput"
      transparent
      navbarData={navbarData}
      footerData={footerData}
    >
      <LandingConext.Provider value={pageData}>
        <Hero />
        <Overview />
      </LandingConext.Provider>
    </Layout>
  );
};
export default IndexPage;
