import Member from './member';
import uuid from 'react-uuid';

const Team = ({ data }) => {
  return (
    <section className="pt-20 pb-48">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center mb-24">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold">Our team</h2>
            <p className="text-lg leading-relaxed m-4 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              temporibus non eveniet omnis quibusdam quaerat optio? Similique,
              cupiditate magnam maxime vel perferendis nemo aliquid ratione
              fugiat deserunt? Dolores, porro autem.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-10">
          {data.map((member) => {
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
