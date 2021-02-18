import path from 'path';
import fs from 'fs';

export const getPageData = (locale, pageSlug) => {
  const fullPath = path.join(process.cwd(), 'data', pageSlug, `${locale}.json`);
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  return fileContents;
};

export const getNavbarData = (locale) => {
  const fullPath = path.join(process.cwd(), 'data/navbar.json');
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const localisedContents = Object.entries(fileContents).reduce(
    (result, [key, value]) => {
      if (!value.hasOwnProperty(locale)) {
        let values;
        if (key === 'links') {
          values = value.map((items) => {
            return { link: items.link, text: items[locale] };
          });
        } else {
          values = Object.entries(value).reduce(
            (innerResult, [innerKey, innerObj]) => {
              innerResult[innerKey] = innerObj[locale];
              return innerResult;
            },
            {}
          );
        }
        result[key] = values;
      } else {
        result[key] = value[locale];
      }
      return result;
    },
    {}
  );
  return localisedContents;
};

export const getFooterData = (locale) => {
  const fullPath = path.join(process.cwd(), 'data/footer.json');
  const fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const data = {
    socialsTitle: fileContents.socialsTitle[locale],
    socialsSubtitle: fileContents.socialsSubtitle[locale]
  };
  const mappedColumns = fileContents.columns.map(({ title, links }) => {
    const mappedLinks = links.map((items) => {
      return { link: items.link, text: items[locale] };
    });
    const mappedTitle = { title: title[locale] };
    return { ...mappedTitle, links: mappedLinks };
  });
  return { ...data, columns: mappedColumns };
};
