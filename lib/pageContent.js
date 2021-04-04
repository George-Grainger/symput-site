import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export const getPageData = (locale, pageSlug) => {
  const fullPath = path.join(process.cwd(), 'data', pageSlug, `${locale}.json`);
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  return fileContents;
};

export const getNavbarData = (locale) => {
  return getPageData(locale, 'navbar');
};

export const getFooterData = (locale) => {
  return getPageData(locale, 'footer');
};

export const getMarkdownData = (locale, pageSlug) => {
  const fullPath = path.join(process.cwd(), 'data', pageSlug, `${locale}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);
  return {
    markdownContent: content,
    markdownMetadata: data
  };
};
