import Member from '@/components/Team/Member';
import TeamSocialsLinks from '@/components/Team/TeamSocialsLinks';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import { getAllTeamSlugs, getPersonData } from '@/lib/team';
import ContentPageLayout from 'layout/ContentPageLayout';
import Image from 'next/image';

export const getStaticProps = ({ locale, params }) => {
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  const { markdownContent, markdownMetadata } = getPersonData(
    locale,
    params.slug
  );
  return {
    props: {
      slug: params.slug,
      navbarData,
      footerData,
      markdownContent,
      markdownMetadata
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

const Person = ({
  slug,
  navbarData,
  footerData,
  markdownContent,
  markdownMetadata
}) => {
  const availableSocials =
    markdownMetadata?.socials && Object.keys(markdownMetadata.socials);
  return (
    <ContentPageLayout
      title={`Symput - ${markdownMetadata?.name || 'Team member'}`}
      navbarData={navbarData}
      footerData={footerData}
      markdownContent={markdownContent}
      markdownMetadata={markdownMetadata}
    >
      <div className="mb-4">
        <Image
          alt={markdownMetadata?.name}
          src={markdownMetadata?.image || '/images/hacker.png'}
          className="rounded-full max-w-full cursor-pointer"
          width="128"
          height="128"
        />
      </div>
      {availableSocials && (
        <TeamSocialsLinks availableSocials={availableSocials} />
      )}
    </ContentPageLayout>
  );
};
export default Person;
