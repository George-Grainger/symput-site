import { getAllTeamSlugs, getPersonData } from '@/lib/team';
import Head from 'next/head';

export const getStaticProps = async ({ locale, params }) => {
  const personData = await getPersonData(locale, params.slug);
  return {
    props: {
      personData
    }
  };
};

export const getStaticPaths = ({ locales }) => {
  const paths = getAllTeamSlugs({ locales });
  return {
    paths,
    fallback: false
  };
};

const Person = ({ personData }) => {
  return (
    <>
      <Head>
        <title>{personData.name}</title>
      </Head>
      <article>
        <h1>{personData.name}</h1>
        <div>{personData.summary}</div>
        <div dangerouslySetInnerHTML={{ __html: personData.contentHtml }} />
      </article>
    </>
  );
};
export default Person;
