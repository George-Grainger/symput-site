import Member from './Member';
import uuid from 'react-uuid';

const Team = ({ data }) => {
  return (
    <section className="section-default section-default-padding lg:px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center text-center mb-16">
          <div className="w-full lg:w-6/12 px-4 prose prose-lg dark:prose-dark transition-darkmode">
            <h1 className="font-semibold transition-darkmode">Our team</h1>
            <p className="text-lg leading-relaxed m-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              temporibus non eveniet omnis quibusdam quaerat optio? Similique,
              cupiditate magnam maxime vel perferendis nemo aliquid ratione
              fugiat deserunt? Dolores, porro autem.
            </p>
          </div>
        </div>
        <div className="grid lg:gap-y-32 gap-x-8 lg:grid-cols-4 2xl:grid-cols-6 lg:mt-48 lg:mb-32 lg:justify-items-center">
          {data.map((member, index) => {
            const { name, socials, slug, summary } = member;
            return (
              <>
                {(index === 0 || index % 5 === 0) && (
                  <div key={uuid()} className="hidden 2xl:block"></div>
                )}
                {index % 3 === 0 && (
                  <div
                    key={uuid()}
                    className="hidden lg:block 2xl:hidden"
                  ></div>
                )}
                <Member
                  key={uuid()}
                  className={
                    index % 3 === 1
                      ? 'lg:justify-self-end'
                      : index % 3 === 2
                      ? 'lg:justify-self-start'
                      : ''
                  }
                  name={name}
                  socials={socials}
                  slug={slug}
                >
                  {summary}
                </Member>
                {index === 1 && (
                  <div key={uuid()} className="hidden 2xl:block"></div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
