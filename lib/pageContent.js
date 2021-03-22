import path from 'path';
import fs from 'fs';

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
