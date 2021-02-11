import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { getSortedPeopleData } from '@/lib/team';
import Head from 'next/head';

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
    <>
      <Head>
        <title>Symput</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="title">Symput</h1>

      <p className="description">
        Current user: <code>{username}</code>
      </p>
    </>
  );
};
export default IndexPage;
