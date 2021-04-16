import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const baseDirectory = path.join(process.cwd(), 'data/team');

export const getSortedPeopleData = (locale) => {
  const peopleDirectory = path.join(baseDirectory, locale);
  // Get file names under /people
  const fileNames = fs.readdirSync(peopleDirectory);
  const allPeopleData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(peopleDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data
    };
  });
  // Sort people by date
  return allPeopleData.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getAllTeamSlugs = ({ locales }) => {
  const pages = [];
  locales.forEach((locale) => {
    const peopleDirectory = path.join(baseDirectory, locale);
    const fileNames = fs.readdirSync(peopleDirectory);

    fileNames.forEach((fileName) => {
      pages.push({
        params: {
          slug: fileName.replace(/\.md$/, '')
        },
        locale
      });
    });
  });
  return pages;
};

export const getPersonData = (locale, slug) => {
  const fullPath = path.join(baseDirectory, locale, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the slug and contentHtml
  return {
    slug,
    markdownContent: matterResult.content,
    markdownMetadata: matterResult.data
  };
};
