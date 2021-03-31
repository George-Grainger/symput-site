import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import Link from 'next/link';

export const getStaticProps = ({ locale }) => {
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  const pageData = getPageData(locale, '404');

  return {
    props: {
      navbarData,
      footerData,
      pageData
    }
  };
};

const Custom404 = ({ navbarData, footerData, pageData }) => {
  const { title_i18n, paragraph_i18n, returnHome_i18n } = pageData;
  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <section className="section-default section-default-padding justify-center dark:text-white">
        <h1 className="text-6xl font-semibold mb-8">{title_i18n}</h1>
        <p className="text-2xl mb-8">{paragraph_i18n}</p>
        <Link href="/">
          <a className="btn btn-black-inverted dark:btn-yellow-inverted">
            {returnHome_i18n}
          </a>
        </Link>
      </section>
    </Layout>
  );
};

export default Custom404;
