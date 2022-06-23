import Member from './Member';
import uuid from 'react-uuid';
import { Fragment } from 'react';

const Team = ({ pageData, peopleData }) => {
  const { title_i18n, overview_i18n } = pageData;
  return (
    <section className="section-default section-default-padding lg:px-4">
      <div className="mx-auto">
        <div className="flex flex-wrap justify-center text-center mb-8">
          <div className="w-full lg:w-6/12 px-4 prose prose-lg dark:prose-dark transition-darkmode">
            <h1 className="font-semibold transition-darkmode">{title_i18n}</h1>
            <p className="text-lg leading-relaxed m-4">{overview_i18n}</p>
          </div>
        </div>
        <div className="grid 2xl:tg-2-3 lg:tg-1-2 gap-8 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 lg:justify-items-center m-auto lg:mb-24 tg-r-offset">
          {peopleData.map((member) => {
            const { name, socials, slug, summary } = member;
            return (
              <Member key={uuid()} name={name} socials={socials} slug={slug}>
                {summary}
              </Member>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
