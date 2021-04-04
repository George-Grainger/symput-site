import {
  getFooterData,
  getMarkdownData,
  getNavbarData
} from '@/lib/pageContent';
import ContentPageLayout from 'layout/ContentPageLayout';

export const getStaticProps = async ({ locale }) => {
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  const { markdownContent, markdownMetadata } = getMarkdownData(
    locale,
    'release'
  );
  return {
    props: {
      navbarData,
      footerData,
      markdownContent,
      markdownMetadata
    }
  };
};

const release = ({
  navbarData,
  footerData,
  markdownContent,
  markdownMetadata
}) => {
  return (
    <ContentPageLayout
      navbarData={navbarData}
      footerData={footerData}
      markdownContent={markdownContent}
      markdownMetadata={markdownMetadata}
    />
  );
};

export default release;
