import { getSortedPeopleData } from '@/lib/team';
import Team from '@/components/Team';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import Layout from 'layout/Layout';

export const getStaticProps = async ({ locale }) => {
  const pageData = getPageData(locale, 'team');
  const allPeopleData = getSortedPeopleData(locale);
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      pageData,
      allPeopleData,
      navbarData,
      footerData
    }
  };
};

const TeamPage = ({ pageData, allPeopleData, navbarData, footerData }) => {
  return (
    <>
      <Layout navbarData={navbarData} footerData={footerData}>
        <Team pageData={pageData} peopleData={allPeopleData} />
      </Layout>
    </>
  );
};
export default TeamPage;
