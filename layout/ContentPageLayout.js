import ReactMarkdown from 'react-markdown';
import Layout from './Layout';

const ContentPageLayout = ({
  title,
  navbarData,
  footerData,
  transparent,
  markdownContent,
  markdownMetadata,
  children
}) => {
  return (
    <>
      <Layout
        title={title}
        navbarData={navbarData}
        footerData={footerData}
        transparent={transparent}
      >
        <section className="section-default section-default-padding">
          <div className="text-center px-4 prose prose-lg dark:prose-dark transition-darkmode mb-12">
            {(markdownMetadata?.title || markdownMetadata?.name) && (
              <h1 className="font-semibold transition-darkmode">
                {markdownMetadata?.title || markdownMetadata?.name}
              </h1>
            )}
            {markdownMetadata?.summary && (
              <p className="text-lg leading-relaxed m-4">
                {markdownMetadata.summary}
              </p>
            )}
          </div>
          <div className="w-fs-card p-4 sm:p-8 bg-white dark:bg-gray-900 flex flex-col items-center rounded-lg relative transition-darkmode">
            {children}
            <ReactMarkdown className="w-full py-4 sm:py-8 prose prose-lg dark:prose-dark">
              {markdownContent}
            </ReactMarkdown>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ContentPageLayout;
