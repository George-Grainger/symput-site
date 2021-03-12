import Member from './Member';
import uuid from 'react-uuid';

const Team = ({ data }) => {
  return (
    <section className="section-default pt-20 pb-48">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center mb-16">
          <div className="w-full lg:w-6/12 px-4 prose prose-2xl dark:prose-dark">
            <h2 className="font-semibold">Our team</h2>
            <p className="text-lg leading-relaxed m-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              temporibus non eveniet omnis quibusdam quaerat optio? Similique,
              cupiditate magnam maxime vel perferendis nemo aliquid ratione
              fugiat deserunt? Dolores, porro autem.
            </p>
          </div>
        </div>
        <div className="grid lg:gap-y-32 gap-x-8 lg:grid-cols-4 2xl:grid-cols-6 lg:mt-48 justify-items-center">
          {data.map((member, index) => {
            const { name, socials, slug, summary } = member;
            return (
              <>
                {(index === 0 || index % 5 === 0) && (
                  <div className="hidden 2xl:block"></div>
                )}
                {index % 3 === 0 && (
                  <div className="hidden lg:block 2xl:hidden"></div>
                )}
                <Member
                  className={
                    index % 4 === 1
                      ? 'lg:justify-self-end'
                      : index % 4 === 2
                      ? 'lg:justify-self-start'
                      : ''
                  }
                  key={uuid()}
                  name={name}
                  socials={socials}
                  slug={slug}
                >
                  {summary}
                </Member>
                {index === 1 && <div className="hidden 2xl:block"></div>}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
