import { getAllTeamSlugs, getPersonData } from '@/lib/team';

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
      <article className="w-full">
        <h1>{personData.name}</h1>
        <div>{personData.summary}</div>
        <div dangerouslySetInnerHTML={{ __html: personData.contentHtml }} />
      </article>
    </>
  );
};
export default Person;
