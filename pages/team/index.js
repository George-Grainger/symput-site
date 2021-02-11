import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSortedPeopleData } from '@/lib/team';

export const getStaticProps = async ({ locale }) => {
  const allPeopleData = getSortedPeopleData(locale);
  return {
    props: {
      allPeopleData
    }
  };
};

const TeamPage = ({ allPeopleData }) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>Meet the team</title>
      </Head>
      <div>
        <ul>
          {allPeopleData.map(({ slug, name, summary }) => (
            <li key={slug}>
              <Link href={`/team/${slug}`} locale={locale}>
                <a>{name}</a>
              </Link>
              <br />
              <small>{summary}</small>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default TeamPage;
