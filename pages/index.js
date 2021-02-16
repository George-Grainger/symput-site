import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { getSortedPeopleData } from '@/lib/team';
import Head from 'next/head';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import Team from '@/components/Team';
import Layout from 'layout/Layout';

export const getStaticProps = async ({ locale }) => {
  const allPeopleData = getSortedPeopleData(locale);
  return {
    props: {
      allPeopleData
    }
  };
};

const IndexPage = ({ allPeopleData }) => {
  const { user, username } = useContext(UserContext);
  return (
    <Layout>
      <Hero />
      <Overview />
    </Layout>
  );
};
export default IndexPage;
